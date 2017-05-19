(function(){
  'use strict';
  console.log('I am cgnwc module');
  angular
    .module('cgnwcApp', ['ngRoute'])
    .config(routes)
    .controller('indexCtrl', indexCtrl)
    .controller('govCtrl', govCtrl)
    .controller('programCtrl', programCtrl)
    .controller('eventCtrl', ['$scope', '$http', eventCtrl])
    .controller('contactCtrl', ['$http', contactCtrl])
    .controller('donateCtrl', donateCtrl)
    //  DIRECTIVE SENDS NOTICE THAT NGREPEAT HAS FINISHED EXECUTING
    .directive('emitLastRepeaterElement', function(){
      return function(scope) {
        if (scope.$last){
          scope.$emit('LastRepeaterElement');
        }
      };
    })

    //  CONTROLLER FUNCTION HANDLER SECTION

    function donateCtrl(){

    }

    function contactCtrl($http){

    }

    function eventCtrl($scope, $http) {
      //  FUNCTION EXECUTING AFTER NGREPEAT FINISHES RENDEREING
      $scope.$on('LastRepeaterElement', function(){
        console.log('good to go');
        tHeadWidthFix();
      });

      //  POPULATE TABLE DATA
      $http
        .get('/events')
        .then(function(response){
          $scope.eventArr = response.data.results;
        }, function(err){
          console.log(err)
        })

      //  DELETE TD DATA INSTANCE
      $('table').on('click', '.eventDeleteBtn', function(evt){
        $http
          .delete(`/events/${evt.target.name}`)
          .then(function(response){
            console.log(response)
          }, function(err){
            console.log(err)
          })
        $http
          .get('/events')
          .then(function(response){
            console.log(response.data.results)
            $scope.eventArr = response.data.results;
          }, function(err){
            console.log(err)
          })
      })

      const $addEventBtn = $('#addEventBtn')
      const $eventCreateForm = $('#eventCreateForm')
      const $date = $('#createEventDate')
      const $time = $('#createEventTime')
      const $location = $('#createEventLocation')
      const $address = $('#createEventAddress')
      const $description = $('#createEventDescription')
      let num = 0

      $addEventBtn.on('click', function(){
        num++
        if(num%2 == true){
          $eventCreateForm.slideDown();
        } else {
            $eventCreateForm.slideUp();
        }
      })

      //  CREATES A NEW EVENT ENTRY IN DATABASE
      $eventCreateForm.on('click', '.eventCreateBtn', function(){
        var submission = {
          'date': $date[0].value,
          'time': $time[0].value,
          'location': $location[0].value,
          'address': $address[0].value,
          'description': $description[0].value
        }
        $http
          .post('/events', submission)

      // CLEARS INPUT VALUE
        $http
          .get('/events')
          .then(function(response){
            $scope.eventArr = response.data.results;
            $date[0].value = ' ';
            $time[0].value = ' ';
            $location[0].value = ' ';
            $address[0].value = ' ';
            $description[0].value = ' ';
          }, function(err){
            console.log(err)
          })
      })

      // FIXES TABLE THEAD WIDTH ISSUE
      function tHeadWidthFix(){
        // Change the selector if needed
        var $table = $('table');
        var $bodyCells = $table.find('tbody tr:last').children();

        // Get the tbody columns width array
        var colWidth = $bodyCells.map(function() {
            console.log($(this)[0])
            console.log($(this).outerWidth())
            console.log($(this)[0].offsetWidth)
            return $(this).outerWidth();
        }).get();

        // Set the width of thead columns
        $table.find('thead tr').children().each(function(i, v) {
          console.log(v)
          console.log('width equals: ' + colWidth[i])
            // $(v).width(colWidth[i]);
            $(v).css({
              'width': colWidth[i] + 'px',
              'border': '1px solid yellow'
            })
        });
      }

    }

    function programCtrl() {
      console.log('program Controller')
    }

    function govCtrl() {
      console.log('governance Controller')

    }

    function indexCtrl(){
      let slideIndex = 0;
      let $indSlideContainer = $('.indSlideContainer');
      let $tempSlide = $('.tempSlide');
      let $led = $('.ledInd')
      if($tempSlide.eq(0).css('display') == 'block'){
        $led.eq(0).css({
          'background-color': 'black'
        })
      }
      setInterval(function(){
        for(var i = 0; i < $indSlideContainer.length; i++){
          $indSlideContainer[i].style.display = 'none';
          $led.eq(i).css({
          'background-color': ''
          })
        }

        slideIndex++;
        if(slideIndex == $indSlideContainer.length) {
          slideIndex = 0;
        }

        $indSlideContainer[slideIndex].style.display = 'inline-block';
        $led.eq(slideIndex).css({
          'background-color': 'black'
        })
        $tempSlide[0].style.display = 'none';

      }, 15005);

    }

    //  ANGULAR ROUTE HANDLER SECTION
    function routes($routeProvider){
      $routeProvider
        .when('/', {
          templateUrl: '../partials/index.html',
          controller: 'indexCtrl'
        })
        .when('/governance', {
          templateUrl: '../partials/governance.html',
          controller: 'govCtrl'
        })
        .when('/membership', {
          templateUrl: '../partials/membership.html'
        })
        .when('/mission', {
          templateUrl: '../partials/mission.html'
        })
        .when('/programs', {
          templateUrl: '../partials/programs.html',
          controller: 'programCtrl'
        })
        .when('/events', {
          templateUrl: '../partials/events.html',
          controller: 'eventCtrl'
        })
        .when('/contactUs', {
          templateUrl: '../partials/contactUs.html',
          controller: 'contactCtrl'
        })
        .when('/donate', {
          templateUrl: '../partials/donate.html',
          controller: 'donateCtrl'
        })
        .otherwise({
          rediretTo: '/'
        })
    }

})();
