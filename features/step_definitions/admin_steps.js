const {
  expect,
  By,
  until,
  wait,
  logger
} = require('../support/utils');

module.exports = function () {
  this.Given('I am on the Administration page', function () {
    return this.login()
      .then(() => this.elevate())
      .then(() => this.driver.findElement(By.linkText('Administration')).click());
  });

};
