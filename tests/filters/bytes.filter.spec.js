describe('Bytes Filter:', function() {
  beforeEach(module('app'));

  var $filter,
    bytes;

  beforeEach(inject(function(_$filter_) {
    $filter = _$filter_;
    bytes = $filter('convertBytes');

  }));

  it('should output bytes if input less than 1024', function() {
    expect(bytes('1023')).toEqual('1023 Bytes');
  });

  it('should output TB if input less than 1024 * 1024 * 1024 * 1024 * 1024', function() {
    expect(bytes(1024 * 1024 * 1024 * 1024 * 1020)).toEqual(1020 + ' TB');
  });
});