# Node_Socket_Autofill ![Actions Status](https://github.com/ArthurVardevanyan/Node_Socket_Autofill/workflows/nodeJS/badge.svg)![Actions Status](https://github.com/ArthurVardevanyan/Node_Socket_Autofill/workflows/CodeQL/badge.svg)[![Coverage Status](https://coveralls.io/repos/github/ArthurVardevanyan/Node_Socket_Autofill/badge.svg?branch=master)](https://coveralls.io/github/ArthurVardevanyan/Node_Socket_Autofill?branch=master)

Build a functioning "auto-complete" application that suggests entities to a user that currently exist in a database, while the user is typing a new entry to potentially store in that database.

Write a web server with a front-end that Utilizes Websockets to pass messages back and forth with the back-end.

```javascript
# backend socket.js
# backend server.js

const io = require('socket.io')(http);

# frontend public/index.js

const socket = io();
```

Your GUI should have a single text box labeled "Name" which allows a user to type arbitrary text, and a button below the text box that is labeled "Submit".

If the user begins typing the same string immediately after submitting one, they should see their recently-created name in the list of auto-complete results.

- Delete Word added to delete inputted word if exists.
- Clear AutoFill added to Clear AutoFill History

![Alt text](img/Sample_Image.png?raw=true "Sample Output")

While the user types arbitrary text into the text box, every keystroke will trigger a Websocket message to be sent to the back-end containing the entire text of the text box.

```javascript
# public/index.js

$(document).keyup('keypress', () => {
  if (input.value) {
    socket.emit('typingInput', input.value);
  }
});
```

Use regular expressions to query MongoDB efficiently .

The back-end will query the database to find any existing record that contains the typed text **anywhere** in the "Name" property.

```javascript
# services/service.js

exports.getStartsWith = async (query) => {
  const escaped = escapeStringRegexp(query);
  const Regex = new RegExp(`^.*${escaped}`);
  return Model.find({ Name: Regex }).select('-_id -__v');
};
```

Any matches to the text typed by the user should be sent back to the browser via Websocket message.

Displayed in a bullet-point list on the page.

- Opted to alternate row colors instead of bullet points.

```css
/* public/main.css*/

#messages > li:nth-child(even) {
  background: #e6e6e6;
}
```

If the user clicks the "Submit" button, a new record should be created in the database with a "Name" property corresponding to the string the user specified, and should clear out the text box

```javascript
# services/service.js

exports.submit = async (str) => {
  const sanitized = sanitize(str);
  return new Model({ Name: sanitized }).save();
};
```

XSS vulnerability

```javascript
# frontend public/index.js

// https://gomakethings.com/preventing-cross-site-scripting-attacks-when-using-innerhtml-in-vanilla-javascript/
const sanitizeHTML = (str) => {
  const temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
};

# backend socket.js

const xss = require('xss');

# backend services/service.js

const escapeStringRegexp = require('escape-string-regexp');
const sanitize = require('mongo-sanitize');
```
