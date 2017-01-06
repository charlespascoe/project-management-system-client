const selenium = require('selenium-webdriver'),
      By = selenium.By,
      until = selenium.until,
      chai = require('chai'),
      expect = chai.expect,
      bunyan = require('bunyan');

chai.use(require('chai-as-promised'));

const logger = bunyan.createLogger({
  name: 'log',
  level: 'DEBUG',
  src: true,
  streams: [
    {
      path: 'tests.log'
    }
  ]
});

const serverLogger = bunyan.createLogger({
  name: 'server',
  level: 'DEBUG',
  src: true,
  streams: [
    {
      path: 'tests.log'
    }
  ]
});


module.exports = {
  expect: expect,
  By: By,
  until: until,
  wait: (delay) => new Promise((fulfill) => setTimeout(() => fulfill(), delay)),
  logger: logger,
  serverLogger: serverLogger
};
