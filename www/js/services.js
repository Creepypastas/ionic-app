angular.module('starter.services', [])

.factory('Creepypastas', function($http, $q) {
  // Some preloaded data
  var creepypastas = [{
    ID: 110457,
    post_title: "Lo que necesitas saber sobre envíos (2016)",
    url: "https://creepypastas.com/lo-que-necesitas-saber-sobre-envios-2016.html",
    post_status: "publish",
    face: 'img/ben.png'
  },
  {post_title: 'El suicidio de Calamardo'},
  {post_title: 'Jeff the killer'},
  {post_title: 'Tails doll'},
  {post_title: 'Luna pálida'},
  {post_title: 'El usuario g00gle_240394'},
  {post_title: 'Querida Abby'},
  {post_title: 'El violinista en el tejado'},
  {post_title: 'El hombre que canta y baila'},
  {post_title: 'Ciudad sin luz'},
  {post_title: 'Psicosis'}
  ];

  var baseURL = 'https://creepypastas.com/wdgts/mrddrs.creepypastas.com/';
  var singlePostsBaseURL = 'https://cli.creepypastas.com/single-post.cgi?post_id=';


  return {
    published: function(){
      var deferred = $q.defer();
      $http({ method: "GET", url: baseURL + 'publish.json' })
          .success(function (data, status, headers, config) {
              creepypastas = data;
              deferred.resolve(data);
          }).error(function (data, status, headers, config) {
              deferred.reject(status);
          });
      return deferred.promise;
    },
    preloaded: function() {
      return creepypastas;
    },
    remove: function(creepypasta) {
      creepypastas.splice(creepypastas.indexOf(creepypasta), 1);
    },
    get: function(creepypastaId) {
      for (var i = 0; i < creepypastas.length; i++) {
        if (creepypastas[i].ID === parseInt(creepypastaId)) {
          return creepypastas[i];
        }
      }
      return null;
    },
    getSinglePost: function(postID) {
      return $http.get(singlePostsBaseURL + postID );
    }
  };
});
