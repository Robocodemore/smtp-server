const send = require('gmail-send')

const express = require('express');
const config = require('../config')


var router = express.Router();

router.post('/smtp/send', function({body: {
  name,
  lastName,
  email,
  message,
  user
}}, res) {
  send({
    user: config[user].email,
    pass: config[user].password,
    to:   'selena2304@gmail.com',
    subject: 'test subject',
    text:    'gmail-send example 1',
  })({
    subject: 'Форма обратной связи',
    html: getEmailTemplate({
      name,
      lastName,
      email,
      message
    }),
  }, function (err, resp, full) {
    if (err) {
      res.send({err});
    } else {
      res.send({resp});
    }
  })
});

module.exports = router;

function getEmailTemplate({
  name,
  lastName,
  email,
  message
}) {
  return `<span>
    <ul>
      <li>
        <p><b>Имя</b>: ${name}</p>
      </li>
      <li>
        <p><b>Фамилия</b>: ${lastName}</p>          
      </li>
      <li>
        <p><b>E-mail</b>: ${email}</p>                    
      </li>
      <li>
        <p><b>Сообщение</b>:</p>
        <p>${message}</p>                              
      </li>
    </ul>
</span>`
}