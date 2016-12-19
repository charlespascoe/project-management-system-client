const { expect, By, until, wait } = require('../support/utils');

module.exports = function () {
  this.Then(/^I should be on the "([^"]+)" page$/, function (pageName) {
    return expect(this.driver.findElement(By.css('h1')).getText()).to.eventually.equal(pageName);
  });

  this.When(/^I wait (\d+) second[s]{0,1}$/, function (duration) {
    return wait(parseInt(duration) * 1000);
  });

  this.When(/^I wait (\d+\.\d+) second[s]{0,1}$/, function (duration) {
    return wait(parseFloat(duration) * 1000);
  });

  this.When(/^I click on "([^"]+)"$/, function (text) {
    return this.findElementByText(text).click();
  });

  this.Then(/^I should see a "([^"]+)" with the text "([^"]+)"$/, function (element, text) {
    return expect(this.driver.findElement(By.css(element)).getText()).to.eventually.equal(text);
  });

  this.Then(/^I should see the "([^"]+)" dialogue$/, function (dialogueTitle) {
    return expect(this.driver.findElement(By.css('.modal-dialog h4.modal-title')).getText()).to.eventually.equal(dialogueTitle);
  });

  this.Then(/^I should see "([^"]+)"$/, function (text) {
    return expect(this.findElementByText(text).getText()).to.eventually.equal(text);
  });

  this.Then(/^I should see an alert saying "([^"]+)"$/, function (message) {
    return expect(this.driver.findElement(By.css('.alert')).getText()).to.eventually.contain(message);
  });

  this.Then(/^I should see a notification saying "([^"]+)"$/, function (message) {
    return expect(this.driver.findElement(By.css('.notification .alert')).getText()).to.eventually.contain(message);
  });

  this.When(/^I enter "([^"]+)" into the "([^"]+)" field$/, function (text, fieldLabel) {
    return this.findInputForLabel(fieldLabel)
      .then(input => input.sendKeys(text));
  });

  this.Then(/^the "([^"]+)" input field should be invalid$/, function (fieldLabel) {
    return expect(this.findInputForLabel(fieldLabel).then(input => input.getAttribute('class'))).to.eventually.contain('invalid');
  });

  this.Then(/^the "([^"]+)" input field should be valid$/, function (fieldLabel) {
    return expect(this.findInputForLabel(fieldLabel).then(input => input.getAttribute('class'))).to.eventually.not.contain('invalid');
  });

  this.Then(/^I click on the "([^"]+)" button$/, function (buttonText) {
    return this.findElementWithText('button', buttonText)
      .then(button => button.click());
  });
};
