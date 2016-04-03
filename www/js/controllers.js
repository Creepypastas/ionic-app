/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
})

.controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
})

.controller('FriendsCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');

    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('ProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('CreepypastasCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, Creepypastas) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab('right');
    $scope.filterHelpTextNeeded = true;
    $scope.randomCreepypasta = {
      post_title: 'El Violinista en el Tejado'
    };

    $scope.creepypastas = {
      all : [],
      filtered : []
    };

    $scope.input = {
      search: 'Slenderman'
    };

    $scope.creepypastas.all = Creepypastas.preloaded();
    $scope.publishedCreepypastas = Creepypastas.published();
    $scope.publishedCreepypastas.then(function (items) {
        $scope.creepypastas.all = items;
        setRandomCreepypasta();
    }, function (status) {
        //console.error(status);
    });

    $scope.filterHelpText = {
      first: function() {
        if ($scope.input.search.length > 2 && $scope.fClength === 0){
          return 'Sin resultados.';
        }
        switch ($scope.input.search.length) {
          default:
            return 'Escribe algo';
        }
      },
      second: function() {
        if ($scope.input.search.length > 2 && $scope.fClength === 0){
          return '¿probamos otra búsqueda?';
        }
        return 'para buscar.';
      }
    };


    $scope.filterCreepypastas = function() {
      var fC = [];
      if($scope.input.search.length < 3) {
        $scope.filterHelpTextNeeded = true;
        $scope.creepypastas.filtered = [];
      }

      var currentCreepypastaTitle = '';
      var query = $scope.input.search.replace(/[_\W]/g, '').toLowerCase();

      for (var i = 0; i < $scope.creepypastas.all.length; i++) {
        currentCreepypastaTitle = $scope.creepypastas.all[i].post_title.replace(/[_\W]/g, '').toLowerCase();
        if (currentCreepypastaTitle.indexOf(query) !== -1 ){
          fC.push($scope.creepypastas.all[i]);
        }
      }

      if (fC.length === 0){
        $scope.filterHelpTextNeeded = true;
      }else{
        $scope.filterHelpTextNeeded = false;
      }
      $scope.fClength = fC.length;
      $scope.creepypastas.filtered = fC;
    };

    var setRandomCreepypasta = function() {
      $scope.randomCreepypasta = $scope.creepypastas.all[Math.floor(Math.random() * $scope.creepypastas.all.length)];
      $scope.input.search = $scope.randomCreepypasta.post_title.trim().substring(0, 5);
      $scope.filterCreepypastas();
    };

    ionicMaterialInk.displayEffect();
})

.controller('SinglePostCtrl', function($scope, $sce, $stateParams, $timeout, $ionicLoading, ionicMaterialMotion, ionicMaterialInk, Creepypastas) {
  $scope.$parent.showHeader();
  $scope.$parent.clearFabs();
  $scope.isExpanded = false;
  $scope.$parent.setExpanded(false);
  $scope.creepypasta = Creepypastas.get($stateParams.creepypastaID);

  $ionicLoading.show({
      template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
  });

  Creepypastas.getSinglePost($stateParams.creepypastaID)
      .then(function (response) {
          var post_content_br = nl2br(response.data.post_content);
          post_content_br = post_content_br.replace(/<a\b[^>]*>/gi,"").replace(/<\/a>/gi, "");
          response.data.post_content = $sce.trustAsHtml(post_content_br);
          $scope.creepypasta = response.data;
          $ionicLoading.hide();
      }, function (error) {
          $scope.status = 'Unable to load customer data: ' + error.message;
      });

  ionicMaterialInk.displayEffect();
})

.controller('ActivityCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})

.controller('GalleryCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

})

;
