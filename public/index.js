// eslint-disable-next-line no-undef
const socket = io();

const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');

// https://gomakethings.com/preventing-cross-site-scripting-attacks-when-using-innerhtml-in-vanilla-javascript/
const sanitizeHTML = (str) => {
  const temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
};

function clearList() {
  while (messages.firstChild) {
    messages.removeChild(messages.firstChild);
  }
}

$(this).bind('keyup', (event) => {
  if (event.keyCode === 46 || event.keyCode === 8) {
    if (input.value) {
      socket.emit('typingInput', input.value);
    } else {
      clearList();
    }
  }
});

$(document).keyup('keypress', () => {
  if (input.value) {
    socket.emit('typingInput', input.value);
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if ('clear'.localeCompare(e.submitter.id) === 0) {
    socket.emit('clear');
    clearList();
  } else if ('del'.localeCompare(e.submitter.id) === 0) {
    socket.emit('del', input.value);
    clearList();
  } else if (input.value) {
    socket.emit('Input', input.value);
    while (messages.firstChild) {
      messages.removeChild(messages.firstChild);
    }
  }
  input.value = '';
});

socket.on('typingInput', (str) => {
  clearList();
  str.forEach((element) => {
    const item = document.createElement('li');
    item.textContent = sanitizeHTML(element.Name);
    messages.appendChild(item);
  });
});
