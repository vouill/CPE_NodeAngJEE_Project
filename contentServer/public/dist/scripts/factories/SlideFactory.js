angular.module('slideFactory', []).factory('Slide', ['$q', '$http', function($q, $http){

  var factory = {
      create : function(id, title, text, content) {
        var deferred = $q.defer();
        deferred.notify("about to create slide: "+title);
        var interval = setInterval(function(id, title, text) {
          var slide = {id: id, title: title, text: text, content : content};
          deferred.resolve(slide);
          clearInterval(interval);
        }, 2000, id, title, text, content);
        return deferred.promise;
      },
      all: function (){
        var promise = $http({method:'GET', url:'/loadPres'});
        return promise;
      }

  };
  return factory;
}]);
