angular.module('slideFactory', []).factory('Slide', function() {
  var factory = {
    create : function(id, title, text, content) {
      console.log("create slide");
    }
  };
  return factory;
});
