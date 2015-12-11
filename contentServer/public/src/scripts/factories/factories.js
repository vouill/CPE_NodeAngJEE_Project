
angular.module('socketFactory', []).factory('Socket',  function ($rootScope) {
  var socket = io.connect('http://localhost:1337');
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});

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
            text : array[i].text,
            title : array[i].title,
            content: contents[contentId]
          }
          slides[slide.id] = slide;
        }
        return slides;
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
