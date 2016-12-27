const { expect, By, until, wait } = require('../support/utils');

module.exports = function () {
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

  this.When(/^I select "([^"]+)" from the "([^"]+)" dropdown$/, function (optionText, dropdownLabel) {
    return this.findInputForLabel(dropdownLabel)
      .then(select => select.click())
      .then(select => select.findElement(By.css(`option[title='${optionText}']`)))
      .then(option => option.click());
  });
};
