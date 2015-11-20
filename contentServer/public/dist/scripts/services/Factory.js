var contentType = {};
contentType.IMG_URL = "IMG URL";
contentType.IMG_B64 = "IMG B64";


angular.module('factoryServices', []).factory('factory', function() {
  var factory = {
    generateUUID : generateUUID,
    contentCreation : contentCreation,
    slideCreation : slideCreation,
    presentationCreation: presentationCreation,
    mapToArray: mapToArray
  };

  function generateUUID(){
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
         var r = (d + Math.random()*16)%16 | 0;
         d = Math.floor(d/16);
         return (c=='x' ? r : (r&0x3|0x8)).toString(16);
     });
    return uuid;
  };

  function contentCreation(title, type, src) {
    console.log("coucou");
    //TODO
  };

  function slideCreation(slide) {
    console.log(slide);
  };

  function presentationCreation(title, description) {
    //TODO
  };

  function mapToArray(map){
    contentArray = [];
    for(key in map) {
      contentArray.push(map[key]);
    }
    return contentArray;
  };

  return factory;

});
