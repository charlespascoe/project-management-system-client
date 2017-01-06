const { expect, By, until, wait } = require('../support/utils');

module.exports = function () {
  this.Given('I am logged in', function () {
    return this.login();
  });

  this.Given('I am a user with no projects', function () {
    this.fakeData.clearProjects();
  });

  this.Given('I am a user with projects', function () {
    // Do nothing - defaults to having projects
  });

  this.Given(/^([A-Z]{1,16})-(\d+) is "([^"]+)"$/, function (projectId, taskId, state) {
    this.fakeData.findProject(projectId).findTask(taskId).changeState(state);
  });

  this.Then(/^I should be on the "([^"]+)" page$/, function (pageName) {
    return expect(this.driver.findElement(By.css('h1')).getText()).to.eventually.equal(pageName);
  });

  this.When(/^I wait (\d+) second[s]{0,1}$/, function (duration) {
    return wait(parseInt(duration) * 1000);
  });

  this.When(/^I wait (\d+\.\d+) second[s]{0,1}$/, function (duration) {
    return wait(parseFloat(duration) * 1000);
  });

  this.When('I wait a bit', function () {
    return wait(250);
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

  this.Then('I should not see a dialogue', function () {
    return expect(this.driver.findElement(By.css('.modal-dialog'))).to.eventually.equal(null);
  });

  this.Then('I should see a loading animation', function () {
    return expect(this.driver.findElement(By.css('.glyphicon .glyphicon-cog rotating'))).to.eventually.not.equal(null);
  });

  this.Then(/^I should see "([^"]+)"$/, function (text) {
    return expect(this.findElementByText(text).getText()).to.eventually.equal(text);
  });

  this.Then(/^I should see an alert saying "([^"]+)"$/, function (message) {
    return expect(this.driver.findElement(By.xpath(`//div[contains(@class, 'alert ')]/div[contains(text(), '${message}')]`)).getText()).to.eventually.contain(message);
  });

  this.Then(/^I should see a notification saying "([^"]+)"$/, function (message) {
    return expect(this.driver.findElement(By.css('.notification .alert')).getText()).to.eventually.contain(message);
  });

  this.When(/^I click the "([^"]+)" button$/, function (buttonText) {
    return this.findElementWithText('button', buttonText)
      .then(button => button.click());
  });

  this.When('I click the delete icon', function () {
    return this.driver.findElement(By.css('td.delete.button')).click();
  });

  this.When('I click the remove icon', function () {
    return this.driver.findElement(By.css('td.remove.button')).click();
  });
};
