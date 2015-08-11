describe('FlatAngle', function() {

  it('should redirect to #posts', function() {
    browser.get('/');
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/posts');
      });
  });

});