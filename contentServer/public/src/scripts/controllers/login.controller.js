
angular.module('loginApp').controller('loginController', ["$scope", "$log", "$window", "auth",function($scope, $log, $window, auth) {

  $scope.user= {"login": "", "pwd":""};


  $scope.auth = function(user) {
    auth.local(user).then(function(data) {
      if(data.admin) {
        $window.open("/admin", "_self");
      } else {
        $window.open("/watch", "_self");
      }
    }, function(reason) {
      $log.warn("[Warning] "+ reason);
      $log.info('list of valid users: ' +auth.list())

    }, function(update) {
      $log.info("[Notification] "+update);
    });
  };

}]);
