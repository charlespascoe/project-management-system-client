const { expect, By } = require('../support/utils');

module.exports = function () {
  this.Then(/^I should see a panel called "([^"]+)"$/, function (panelTitle) {
    return expect(this.findPanel(panelTitle)).to.eventually.not.equal(null);
  });

  this.Then(/^I should see a "([^"]+)" in the "([^"]+)" panel$/, function (css, panelTitle) {
    return expect(this.findPanel(panelTitle).findElement(By.css(css))).to.eventually.not.equal(null);
  });

  this.Then(/^I should see "([^"]+)" in the "([^"]+)" panel$/, function (text, panelTitle) {
    return expect(this.findPanel(panelTitle).findElement(By.xpath(`//*[contains(text(), '${text}']`)).getText()).to.eventually.equal(text);
  });
};
