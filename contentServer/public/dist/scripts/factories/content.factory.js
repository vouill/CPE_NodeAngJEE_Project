angular.module('contentFactory', []).factory('Content', ['$q', function($q) {
  var factory = {
    create : function(id, title, src, type) {
      console.log("create");
    },
    all: function() {
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
        deferred.resolve(response);
      }, 2000);
      return deferred.promise;
    }
  };
  return factory;
}]);
