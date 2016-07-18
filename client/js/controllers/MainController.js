app.controller('MainController', ['$scope', 'auth', '$http', 'md5', function($scope, auth, $http, md5){
  /**
   * Object with user data form backend
   * @type {Object}
   */
  $scope.user = {};


  /**
   * Flag to verify if user successfully auth
   * @type {Boolean}
   */
  $scope.authStatus = false;


  /**
   * Array with fetched videos
   * @type {Array}
   */
  $scope.videos = [];


  /**
   * @description
   * It takes object with users data and save it to localStorage
   * @param data {Object} - fetched data with usre credentials
   */
  $scope.saveCredentials = function(data){
    window.localStorage.setItem('creds', JSON.stringify(data));
    window.localStorage.setItem('auth', JSON.stringify(status));
  };


  /**
   * @description
   * Main render function. It shows videos container if $http query response was successful
   */
  $scope.render = function(){
    $('.main__login').addClass('hidden');
    $('.videos').removeClass('hidden');
    $http({
      method: 'GET',
      url: 'videos?limit=10&sessionId=' + $scope.user.sessionId
    }).success(function(response){
      $scope.videos = response.data;
    })
      .error(function(err){
        console.log(err);
      });
  };


  /**
   * @description
   * Render login form after click on login button (logout)
   */
  $scope.renderLoginForm = function(){
    $('.main__login').removeClass('hidden');
    $('.videos').addClass('hidden');
  };


  /**
   * @description
   * If login process takes error it can show error UI. For now it just console notification to be sure that it works
   */
  $scope.showLoginError = function(){
    console.log('Login error!');
  };


  /**
   * @description
   * Main login method. Looks after user parameters that was typed in form. Than - fetch data from server.
   * Case true - it saves credentials to localStorage, set authStatus to true. Than it check case response status was
   * true. If it is - call $scope.render, if no - set authStatus to false and show loginError.
   */
  $scope.login = function(){
    var params = {
      "username": $scope.user.username,
      "password": md5.createHash($scope.user.password)
    };
    $http({
      method: 'POST',
      url: '/user/auth',
      data: params
    }).success(function(response){
      $scope.user = response;
      $scope.saveCredentials(response);
      if (response.status === 'success') {
        $scope.authStatus = true;
        $scope.render();
      } else {
        $scope.authStatus = false;
        $scope.showLoginError();
      }
    }).error(function(err){
      return err;
    });
  };


  /**
   * @description
   * Logout method. Send GET $http to backend with user session Id. If query takes success status - render login form
   * on the main page
   */
  $scope.logout = function(){
    $scope.authStatus = false;
    console.log($scope.user);
    $http({
      method: 'GET',
      url: 'http://localhost:3000/user/logout?sessionId=' + $scope.user.sessionId
    }).success(function(response){
      $scope.renderLoginForm();
    }).error(function(err){
      return err;
    });
  };


  /**
   * @description
   * Watch on the app load event. Get credentials from storage. Than it can look on status and render page if user
   * was already logged in
   */
  $scope.$watch('$viewContentLoaded', function(){
    var user = JSON.parse(window.localStorage.getItem('creds'));
    if (!user) {
      return;
    }
    if (user.status === 'success') {
      //$scope.authStatus = true;
      //$scope.user = user;
      //$scope.render();
    }
  });

}]);