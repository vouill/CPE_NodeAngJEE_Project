angular.module('presentationFactory', []).factory('Presentation',  ['$q', function($q) {
  var presentations = {};

  var factory = {

    create : function(id, title, description, slides) {
      var deferred = $q.defer();
      var interval = setInterval(function(id, title, description, slides) {
        deferred.notify("about to create presentation: "+title);
        presentations[id] = {id: id, title: title, description: description, slides : slides};
        deferred.resolve(presentations[id]);
        clearInterval(interval);
      }, 2000, id, title, description, slides);
      return deferred.promise;
    },

    all : function(){
      return presentations;
    }
  };

  return factory;
}]);
