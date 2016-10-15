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

  describe('collection view:', () => {
    beforeEach(() => {
      browser.get('http://admin:pass@localhost:8081/#/db/sails/user');
    });

    it('should be able to create a document', () => {
      element(by.css('[ng-click="vm.addDocument()"]')).click();
      element(by.css('.modal-footer button[type="submit"]')).click();

      element(by.css('.alert-success span.ng-scope')).getText().then(text => {
        expect(text).toEqual('Document added!');
      });
    });

    it('should be able to delete a document', () => {
      element.all(by.css('[ng-click="vm.deleteDocument(value);$event.stopPropagation()"]')).get(1).click();
      element(by.css('.alert-success span.ng-scope')).getText().then(text => {
        expect(text).toContain('Document deleted!');
      });
    });
  });

  describe('document view', () => {
    beforeEach(() => {
      browser.get('http://admin:pass@localhost:8081/#/db/sails/user');
      element(by.css('[ng-click="vm.addDocument()"]')).click();
      element(by.css('.modal-footer button[type="submit"]')).click();
      element(by.css('[ng-click="close({$event: $event})"]')).click();
      element.all(by.css('tr[ng-click="vm.loadDocument(doc._id)"]')).get(0).click();
    });

    it('should be able to delete a document', () => {
      element(by.css('.btn-danger')).click();
      element(by.css('.alert-success span.ng-scope')).getText().then(text => {
        expect(text).toContain('Document deleted!');
      });
    });

    it('should be able to navigate back to the collection view', () => {
      element(by.css('[ng-click="vm.back()"]')).click();
      browser.switchTo().alert().accept();
      expect(browser.getCurrentUrl()).toEqual('http://admin:pass@localhost:8081/#/db/sails/user');
    });
  });
});