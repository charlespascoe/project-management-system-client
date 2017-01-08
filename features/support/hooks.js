const fakeData = require('./fake-data');

module.exports = function () {
  this.Before(function () {
    fakeData.reset();
  });

  this.After(function (scenario) {
    this.driver.quit();
  });
};
