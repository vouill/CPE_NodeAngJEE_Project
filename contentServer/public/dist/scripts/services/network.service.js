angular.module('networkService', []).service('network',[ '$q', '$http', function($q, $http) {


  return {
    getPresentations : function () {
      var deferred = $q.defer();

      $http({'method': 'GET', 'url': '/LoadPres'}).then(
        function(response) {
          deferred.resolve(response.data);
        },
        function(error) {
          deferred.reject('can not get presentations');
        },
        function(update) {
          //TODO
        });
        return deferred.promise;
    },
    getContents : function() {
      var deferred = $q.defer();

      $http({'method': 'GET', 'url': '/slids'}).then(
        function(response) {
          deferred.resolve(response.data);
        },
        function(error) {
          deferred.reject('can not get contents');
        },
        function(update) {
          //TODO
        });
        return deferred.promise;
    },
    uploadContent: function(file) {
      var deferred = $q.defer();
      var data = new FormData();
      data.append('file', file);

    }
  };
}]);
