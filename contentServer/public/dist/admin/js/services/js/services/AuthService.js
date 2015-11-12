angular.module('authService', []).service('auth',[ '$q', function($q) {

  var users= [];

  users['jdoe']= {"pwd": "jdoe", "admin": false};
  users['chazz']={"pwd": "chazz", "admin": true};

  return {
    check : function(user) {
        return users[user.login] && users[user.login].pwd == user.pwd;
    },
    list : function() {
      return Object.keys(users);
    },
    local : function (user) {
      var deferred = $q.defer();
      var interval = setInterval( function(user) {
        deferred.notify("about to authenticate user: "+ user.login);
        if(users[user.login] && users[user.login].pwd == user.pwd){
          deferred.resolve(users[user.login]);
        } else {
          deferred.reject("user "+user.login+" does not exist");
        }
        clearInterval(interval);
      }, 3000, user);

      return deferred.promise;
    }

  };
}]);
