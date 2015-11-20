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
        //var promise = $http({method:'GET', url:'/slids'});
        var deferred = $q.defer();
        deferred.notify('about to receive slides');
        var interval = setInterval(function(){
          var slides = {};
          var response = {};
          // test
          slides["1234abcd"] = {
            id: "1234abcd",
            title: "Slide n°1",
            txt:"Lorem ipsum dolor sit amet, consectetur adipisicing elit",
            map: {
              "37ba76b1-5c5d-47ef-8350-f4ea9407276d": {
                type:"IMG_B64",
                id:"37ba76b1-5c5d-47ef-8350-f4ea9407276d",
                title:"NAO",
                fileName:"37ba76b1-5c5d-47ef-8350-f4ea9407276d.png"
              }
            }
          };

          // test
          slides["abcd1234"] = {
            id: "abcd1234",
            title: "Slide n°2",
            txt:"",
            map: {
              "5095753f-14ca-4c1d-9236-52686ce9af4d": {
                type:"IMG_B64",
                id:"5095753f-14ca-4c1d-9236-52686ce9af4d",
                title:"no title",
                fileName:"5095753f-14ca-4c1d-9236-52686ce9af4d.png"
              }
            }
          };

          response.data = slides;
          deferred.resolve(response);
        }, 2000);
        return deferred.promise;
      }

  };
  return factory;
}]);
