const {
  expect,
  By,
  until
} = require('../support/utils');

module.exports = function () {
  this.Given('I am on the login page', function () {
    return this.driver.get('localhost:8081/public/index.html')
  });

  this.When('I enter incorrect login details', function () {
    return this.enterText(By.id('inputUsername'), 'incorrect@mail.com')
      .then(() => this.enterText(By.id('inputPassword'), 'incorrect'));
  });

  this.When('I enter correct login details', function () {
    return this.enterText(By.id('inputUsername'), 'bob@mail.com')
      .then(() => this.enterText(By.id('inputPassword'), 'pass1234'));
  });

  this.When('I press the login button', function () {
    return this.driver.findElement(By.id('log-in')).click();
  });
};
