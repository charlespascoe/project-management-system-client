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
      .then(select => select.click().then(() => select.getAttribute('id')))
      .then(id => this.driver.findElement(By.xpath(`//select[@id='${id}']/option[contains(text(), '${optionText}')]`)))
      .then(option => option.click());
  });

  this.When(/^I select "([^"]+)" from the "([^"]+)" dropdown for the first entry in the "([^"]+)" list$/, function (optionText, columnName, panelTitle) {
    var table, columnIndex;
    return this.findPanel(panelTitle)
      .then(panel => panel.findElement(By.css('table')))
      .then(tableElm => {
        table = tableElm;
        return table.findElements(By.css('thead th'));
      })
      .then(columns => Promise.all(columns.map(col => col.getText())))
      .then(columnHeadings => {
        columnIndex = columnHeadings.indexOf(columnName);
        if (columnIndex < 0) throw new Error(`Column not found in ${panelTitle} table: ${columnName}`);
        return table.findElement(By.xpath(`//tbody/tr[1]/td[${columnIndex + 1}]//select`));
      })
      .then(select => select.click().then(() => select.findElement(By.xpath(`//option[contains(text(), '${optionText}')]`))))
      .then(option => option.click());
  });
};
