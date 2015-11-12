angular.module('slideFactory', []).factory('Slide', ['$q', function($q){
  var slides = {};

  var factory = {
      create : function(id, title, text, content) {
        var deferred = $q.defer();
        deferred.notify("about to create slide: "+title);
        var interval = setInterval(function(id, title, text, slides) {
          slides[id] = {id: id, title: title, text: text, content : content};
          console.log(slides);
          deferred.resolve(slides[id]);
          clearInterval(interval);
        }, 2000, id, title, text, content);
        return deferred.promise;
      },
      all: function (){
        return slides;
      }

  };
  return factory;
}]);
