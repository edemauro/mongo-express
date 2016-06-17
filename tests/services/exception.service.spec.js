describe('ExceptionService', function() {
  beforeEach(module('app'));

  it('should catch an exception', inject(function($injector) {
    var ExceptionService = $injector.get('exception');
    spyOn(console, 'log');
    ExceptionService.catcher('message')('reason');
    expect(console.log).toHaveBeenCalled();
  }));
});