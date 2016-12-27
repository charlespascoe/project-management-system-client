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

  this.Given('I have been elevated to sysadmin', function () {
    return this.elevate();
  });

  this.When('I click on the View Project icon', function () {
    return this.driver.findElement(By.css('.td.manage.button')).click();
  });
};
