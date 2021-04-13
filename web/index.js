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

$(this).bind('keyup', (event) => {
  if (event.keyCode === 46 || event.keyCode === 8) {
    if (input.value) {
      socket.emit('typingInput', input.value);
    } else {
      while (messages.firstChild) {
        messages.removeChild(messages.firstChild);
      }
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
  if (input.value) {
    socket.emit('Input', input.value);
    input.value = '';
    while (messages.firstChild) {
      messages.removeChild(messages.firstChild);
    }
  }
});

socket.on('typingInput', (msg) => {
  while (messages.firstChild) {
    messages.removeChild(messages.firstChild);
  }
  msg.forEach((element) => {
    const item = document.createElement('li');
    item.textContent = sanitizeHTML(element.text);
    messages.appendChild(item);
  });
  window.scrollTo(0, document.body.scrollHeight);
});
