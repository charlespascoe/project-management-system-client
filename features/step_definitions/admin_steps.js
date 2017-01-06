const {
  expect,
  By,
  until,
  wait,
  logger
} = require('../support/utils');

module.exports = function () {
  this.Given('I am on the Administration page', function () {
    return this.driver.findElement(By.linkText('Administration')).click();
  });

  this.Given('I have been elevated to sysadmin', {timeout: 10 * 1000}, function () {
    return this.elevate().then(() => wait(5000));
  });

  this.When('I click on the View Project icon', function () {
    return this.driver.findElement(By.css('.td.manage.button')).click();
  });
};
