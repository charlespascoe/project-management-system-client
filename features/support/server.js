const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('./utils').serverLogger;
const app = express();
const fakeData = require('./fake-data');

app.use(bodyParser.json());

app.use(cors());

app.use(function (req, res, next) {
  logger.info(`${req.method} ${req.path}`);
  next();
});

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

app.route('/users/:idOrEmail')
  .get(function (req, res) {
    res.status(200).json({
      id: 1,
      firstName: 'Bob',
      otherNames: 'Smith',
      email: 'bob@mail.com',
      sysadmin: true
    });
  })
  .delete(function (req, res) {
    setTimeout(() => res.status(200).end(), 400);
  });

app.get('/users/:idOrEmail/assignments', function (req, res) {
  res.status(200).json(fakeData.assignments.map(assignment => assignment.serialise()));
});

app.get('/users', function (req, res) {
  res.status(200).json([
    {
      id: 1,
      firstName: 'Bob',
      otherNames: 'Smith',
      email: 'bob@mail.com',
      sysadmin: true
    },
    {
      id: 2,
      firstName: 'Jane',
      otherNames: 'Dough',
      email: 'jane.dough@mail.com',
      sysadmin: false
    }
  ]);
});

app.route('/projects')
  .get(function (req, res) {
    res.status(200).json([
      {
        id: 'EXAMPLE',
        name: 'Example Project',
        iconUrl: '/test.png'
      }
    ]);
  })
  .post(function (req, res) {
    setTimeout(() => res.status(200).end(), 400);
  });

app.get('/roles', function (req, res) {
  res.status(200).json([
    {
      id: 1,
      name: 'Project Administrator',
      permissions: []
    },
    {
      id: 2,
      name: 'Worker',
      permissions: []
    },
    {
      id: 3,
      name: 'Observer',
      permissions: []
    }
  ]);
});

app.route('/projects/:projectId/members')
  .get(function (req, res) {
    res.status(200).json([
      {
        user: {id: 1},
        role: {id: 1},
        project: {id: req.params.projectId}
      }
    ]);
  })
  .post(function (req, res) {
    setTimeout(() => res.status(200).end(), 400);
  });

app.get('/projects/:projectId/non-members', function (req, res) {
  res.status(200).json([
    {
      id: 2,
      firstName: 'Jane',
      otherNames: 'Dough'
    }
  ]);
});

app.route('/projects/:projectId/members/:userId')
  .put(function (req, res) {
    setTimeout(() => res.status(200).end(), 400);
  })
  .delete(function (req, res) {
    setTimeout(() => res.status(200).end(), 400);
  });

app.post('/users', function (req, res) {
  logger.info('POST /users');
  setTimeout(() => res.status(201).end(), 400);
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
  logger.error(`Path not found: ${req.method} ${req.path}`);
  res.status(404).end();
});

app.use(function (err, req, res, next) {
  logger.error(err);
  res.status(500).end();
});

app.listen(8080, () => logger.info('Listening!'));
