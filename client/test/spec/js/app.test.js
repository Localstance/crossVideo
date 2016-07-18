describe('Videoportal app test', function(){
  beforeEach(module('VideoApp'));
  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('$scope', function() {
    var $scope, controller;

    beforeEach(function() {
      $scope = {};
      $scope.$watch = function(){};
      controller = $controller('MainController', { $scope: $scope });
    });

    it('AuthStatus on load mast be false', function() {
      expect($scope.authStatus).toEqual(false);
    });
    it('saveCredentials', function(){
      spyOn($scope, 'saveCredentials');
      $scope.saveCredentials({});
      expect($scope.saveCredentials).toBeDefined();
      expect($scope.saveCredentials).toHaveBeenCalled();
    });

  });
});