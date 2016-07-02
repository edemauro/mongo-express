describe('E2E:', function() {
  it('should see the homepage', function() {
    browser.get('http://admin:pass@localhost:8081');

    element(by.id('pageTitle')).getText().then(function(text) {
        expect(text).toEqual('Mongo Express');
    });
  });

  describe('Home view:', function() {
    beforeEach(function() {
      browser.get('http://admin:pass@localhost:8081');
    });

    it('should be able to create a database', function() {
      element(by.model('vm.database')).sendKeys('a_database');
      element(by.css('.pull-right')).click();

      element(by.css('.alert-success span.ng-scope')).getText().then(function (text) {
        expect(text).toEqual('database created.');
      });
    });

    it('should be able to delete a database', function() {
      element.all(by.css('[ng-click="vm.deleteDb(db)"]')).get(0).click();

      element(by.css('#confirmationInput')).isDisplayed().then(function(result) {
        if(result) {
          element(by.css('#confirmationInput')).sendKeys('a_database');
          element(by.css('[ng-click="vm.deleteDb()"]')).click();
        }
      });

      browser.sleep(6000);
    
      element(by.css('.alert-success span.ng-scope')).getText().then(function (text) {
        expect(text).toEqual('database dropped.');
      });
    });
  });
});