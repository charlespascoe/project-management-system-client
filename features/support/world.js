const server = require('./server');
const selenium = require('selenium-webdriver');
const fakeData = require('./fake-data');

const {
  By,
  wait,
  logger
} = require('./utils');

class World {
  constructor() {
    this.driver = new selenium.Builder()
      .withCapabilities(selenium.Capabilities.chrome())
      .build();
    this.driver.getWindowHandle();
    this.fakeData = fakeData;
    this.fakeData.reset();
  }

  enterText(element, text) {
    var elm = this.driver.findElement(element);
    return elm.clear().then(() => elm.sendKeys(text));
  }

  login() {
    return this.driver.get('localhost:8081/public/index.html')
      .then(() => this.enterText(By.id('inputUsername'), 'bob@mail.com'))
      .then(() => this.enterText(By.id('inputPassword'), 'pass1234'))
      .then(() => this.driver.findElement(By.id('log-in')).click())
      .then(() => wait(600));
  }

  elevate() {
    logger.debug('ELEVATE');
    return this.driver.findElement(By.linkText('Elevate to Admin')).click()
      .then(() => wait(500))
      .then(() => this.enterText(By.id('inputPassword'), 'pass1234'))
      .then(() => this.driver.findElement(By.id('elevate')).click())
      .then(() => wait(1000));
  }

  findElementWithText(type, text) {
    return this.driver.findElement(By.xpath(`//${type}[contains(text(), '${text}')]`));
  }

  findElementByText(text) {
    return this.findElementWithText('*', text);
  }

  findInputForLabel(label) {
    return this.findElementWithText('label', label)
      .then(elm => {
        if (elm != null) { return elm.getAttribute('for'); }
        throw new Error(`Label with text not found: ${label}`)
      })
      .then(forId => { logger.debug('forId:', forId); return this.driver.findElement(By.id(forId))});
  }
}

module.exports = function () {
  this.World = World;
};
