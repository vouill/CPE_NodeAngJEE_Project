
angular.module('presentationFactory', []).factory('Presentation',  ['$q', '$http', 'network', function($q, $http, network) {
  var presentations = {};

  var factory = {


    save: function(presentation) {
      var deferred = $q.defer();
      network.postPresentation(presentation).then(
        function(response) {
          deferred.resolve(response);
        },
        function(error) {
          deferred.reject(response);
        },
        function(update){
          deferred.notify(update);
        }
      );
      return deferred.promise;
    },

    all: function() {
      var deferred = $q.defer();
      network.getPresentations().then(
        function(presentations) {
          deferred.resolve(presentations);
        }, function (error) {
          deferred.reject('can not load presentations');
        }
      );
      return deferred.promise;
    },

    single: function(uuid) {
      var deferred = $q.defer();
      network.getPresentations().then(
        function(presentations) {
          console.dir(presentations);
           deferred.resolve(presentations[uuid]);
        }, function (error) {
          deferred.reject('can not load presentation '+uuid);
        }
      );
      return deferred.promise;
    },

  };

  return factory;
}]);


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

      all: function(presentation, contents) {

        var array = presentation.slidArray;
        var slides = {};
        for(i in array){
          var contentId = array[i].content.id;
        //  array[i].contentMap[1]
          var slide = {
            id : array[i].id,
            text : array[i].txt,
            title : array[i].title,
            content: contents[contentId]
          }
          slides[slide.id] = slide;
        }
        return slides;
      },

      locale: function (){
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
      },

      model: function() { return  {
        title: '',
        id: '',
        text: '',
        content: {
          id:'',
          title: '',
          fileName: '',
          type: ''
        }
      };
    }
  };
  return factory;
}]);

angular.module('contentFactory', []).factory('Content', ['$q', 'network', function($q, network) {
  var factory = {

    create : function(file) {
      var deferred = $q.defer();
      deferred.notify('about to send content');
      network.postContent(file).then( function(contents) {
        deferred.resolve(contents);
      }, function(error){
        deferred.reject(error);
      }, function(info){
        deferred.notify(info);
      });
      return deferred.promise;

    },

    all: function() {
      var deferred = $q.defer();
      deferred.notify('about to receive contents');
      network.getContents().then( function(contents) {
        deferred.resolve(contents);
      }, function(error){
        deferred.reject(error);
      }, function(info){
        deferred.notify(info);
      });
      return deferred.promise;

    },

    locale: function() {
      var deferred = $q.defer();
      deferred.notify('about to receive content');
      var interval = setInterval(function(){
        var content = {};
        content["37ba76b1-5c5d-47ef-8350-f4ea9407276d"] = {
            "type": "IMG_B64",
            "id": "37ba76b1-5c5d-47ef-8350-f4ea9407276d",
            "title": "NAO",
            "fileName": "37ba76b1-5c5d-47ef-8350-f4ea9407276d.png"
        };
        content["5095753f-14ca-4c1d-9236-52686ce9af4d"] = {
            "type": "IMG_B64",
            "id": "5095753f-14ca-4c1d-9236-52686ce9af4d",
            "title": "no title",
            "fileName": "5095753f-14ca-4c1d-9236-52686ce9af4d.png"
        };
        content["b4f0d8a7-aeaa-4f9b-abae-8f3187969b09"] = {
            "type": "IMG_B64",
            "id": "b4f0d8a7-aeaa-4f9b-abae-8f3187969b09",
            "title": "no title",
            "fileName": "b4f0d8a7-aeaa-4f9b-abae-8f3187969b09.png"
        };
        content["d6aad8cd-b3dc-4794-9e2e-efee903a3f5e"] = {
            "type": "IMG_B64",
            "id": "d6aad8cd-b3dc-4794-9e2e-efee903a3f5e",
            "title": "no title",
            "fileName": "d6aad8cd-b3dc-4794-9e2e-efee903a3f5e.png"
        };
        var response = {};
        response.data = content;
        deferred.resolve(response.data);
      }, 2000);
      return deferred.promise;
    },

    model: function() {
      return {
        id:'',
        title: '',
        fileName: '',
        type: ''
      };
    }

  };
  return factory;
}]);
