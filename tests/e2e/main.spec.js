describe('E2E:', () => {
  describe('Home view:', () => {
    beforeEach(() => {
      browser.get('http://admin:pass@localhost:8081');
    });

    it('should see the homepage', () => {
      element(by.id('pageTitle')).getText().then(text => {
        expect(text).toEqual('Mongo Express');
      });
    });

    it('should be able to create a database', () => {
      element(by.model('vm.database')).sendKeys('a_database');
      element(by.css('.pull-right')).click();

      element(by.css('.alert-success span.ng-scope')).getText().then(text => {
        expect(text).toEqual('database created.');
      });
    });

    it('should be able to delete a database', () => {
      element.all(by.css('[ng-click="vm.deleteDb(db)"]')).get(0).click();

      element(by.css('#confirmationInput')).isDisplayed().then(result => {
        if(result) {
          element(by.css('#confirmationInput')).sendKeys('a_database');
          element(by.css('[ng-click="vm.deleteDb()"]')).click();
        }
      });

      element(by.css('.alert-success span.ng-scope')).getText().then(text => {
        expect(text).toEqual('database dropped.');
      });
    });
  });

  describe('database view:', () => {
    beforeEach(() => {
      browser.get('http://admin:pass@localhost:8081/#/db/local');
    });

    it('should be able to create a collection', () => {
      element(by.model('vm.collection')).sendKeys('a_collection');
      element(by.css('.pull-right')).click();

      element(by.css('.alert-success span.ng-scope')).getText().then(text => {
        expect(text).toEqual('Collection created!');
      });
    });

    it('should be able to delete a collection', () => {
      element.all(by.css('[ng-click="vm.deleteCollection(c)"]')).get(0).click();

      element(by.css('#confirmationInput')).isDisplayed().then(result => {
        if(result) {
          element(by.css('#confirmationInput')).sendKeys('a_collection');
          element(by.css('[ng-click="vm.deleteCollection()"]')).click();
        }
      });

      element(by.css('.alert-success span.ng-scope')).getText().then(text => {
        expect(text).toEqual('Collection "a_collection" deleted!');
      });
    });
  });
});