app.factory('auth', ['$http', function($http){
  return $http({
    method: 'POST',
    url: '/user/auth',
    data: {"username": "ali", "password": "5f4dcc3b5aa765d61d8327deb882cf99"}
  }).success(function(response){
    return response;
  }).error(function(err){
    return err;
  });
}]);