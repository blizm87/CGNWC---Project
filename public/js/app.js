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

    //  CONTROLLER FUNCTION HANDLER SECTION

    function donateCtrl(){

    }

    function contactCtrl($http){

    }

    function eventCtrl($scope, $http) {

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
    }

    function programCtrl() {
      console.log('program Controller')
    }

    function govCtrl() {
      console.log('governance Controller')
    }

    function indexCtrl(){
      let slideIndex = 0;
      let $slideContainer = $('.slideContainer');
      let $indSlideContainer = $('.indSlideContainer');
      let $tempSlide = $('.tempSlide');

      let imgArr = [
        '../assets/scholarshipPics/pic5.png',
        '../assets/scholarshipPics/pic4.png',
        '../assets/scholarshipPics/pic1.png',
        '../assets/mentoringPics/pic1.jpg'
      ]

      setInterval(function(){
        for(var i = 0; i < $indSlideContainer.length; i++){
          $indSlideContainer[i].style.display = 'none';
        }

        slideIndex++;
        if(slideIndex == imgArr.length) {
          slideIndex = 0;
        }

        $indSlideContainer[slideIndex].style.display = 'inline-block';
        $tempSlide[0].style.display = 'none';

        // $slideContainer.css({
        //   'background-image': 'url(' + imgArr[slideIndex] + ')',
        //   'background-size': 'cover'
        // })

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
