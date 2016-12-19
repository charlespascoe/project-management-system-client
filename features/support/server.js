const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { logger } = require('./utils');
const app = express();

app.use(bodyParser.json());

app.use(cors());

app.get('/auth/auth-token', function (req, res) {
  logger.info('GET /auth/auth-token', req.headers);
  var pass, auth = req.headers.authorization;

  if (auth) {
    var match = auth.match(/^Basic ([^\s]+)$/);

    logger.debug(match);

    if (match) {
      pass = Buffer.from(match[1], 'base64').toString().split(':')[1];
    } else if ((match = auth.match(/^Bearer ([^\s]+)$/)) != null) {
      pass = match[1];
    }

  }

  logger.debug(`pass: ${pass}`);

  setTimeout(() => {
    if (pass == 'pass1234' || pass == 'refresh') {
      res.status(200).json({
        id: 1,
        userId: 1,
        accessToken: '0123',
        refreshToken: 'refresh'
      });
    } else {
      res.status(401).end();
    }
  }, 400);
});

app.get('/users/:idOrEmail', function (req, res) {
  logger.info('GET /user');
  res.status(200).json({
    id: 1,
    firstName: 'Bob',
    otherNames: 'Smith',
    email: 'bob@mail.com',
    sysadmin: true
  });
});

app.get('/auth/elevation', function (req, res) {
  logger.info('GET /auth/elevation', {headers: req.headers});
  var pass, auth = req.headers['x-additional-auth'];

  if (auth) {
    pass = Buffer.from(auth, 'base64').toString();
  }

  logger.debug(`pass: ${pass}`);

  setTimeout(() => {
    if (pass == 'pass1234') {
      res.status(200).json({
        expires: new Date(Date.now() + 60*60*1000)
      });
    } else {
      res.status(401).end();
    }
  }, 400);
});

app.use(function (req, res) {
  logger.error(`Path not found: ${req.path}`);
  res.status(404).end();
});

app.use(function (err, req, res, next) {
  logger.error(err);
  res.status(500).end();
});

app.listen(8080, () => logger.info('Listening!'));
