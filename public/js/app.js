(function(){
  'use strict';
  console.log('I am cgnwc module');
  angular
    .module('cgnwcApp', ['ngRoute'])
    .config(routes)
    .controller('indexCtrl', indexCtrl)
    .controller('contactCtrl', ['$http', contactCtrl])
    .controller('eventCtrl', ['$scope', '$http', eventCtrl])


    function eventCtrl($scope, $http) {
      $http
        .get('/events')
        .then(function(response){
          $scope.eventArr = response.data.results;
        }, function(err){
          console.log(err)
        })

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

    function contactCtrl($http){
      var vm = this;
      vm.board = [];
      const $brdMemCont = $('.boardMembersContainer')
      const $getMemb = $('.getMemb');
      let html;
      let htmlTemp;
      let conCat = [];
      $http
        .get('/members?president=President&vicePresident=Vice-President')
        .then(function(response){
          let result = response.data.results;
          result.forEach(function(obj){
            // vm.board.push(obj);
            htmlTemp = `<div class="pure-u-1-3 indBoardMembersContainer">
                      <!-- <img> -->
                      <p>${obj.title}</p>
                      <p>${obj.fullName}</p>
                      <p>Brief Description</p>
                      </div>`;
            conCat.push(htmlTemp)
          });
          html = conCat[0] + conCat[1] + conCat[2];
          $brdMemCont.append(html);
        }, function(err){
          console.log(err);
        })
    }

    function indexCtrl(){
      let slideIndex = 0;
      let $indSlideContainer = $('.indSlideContainer');
      let $tempSlide = $('.tempSlide');

      setInterval(function(){
        // if(slideIndex === 0){
        //   $indSlideContainer[slideIndex].style.display = 'block';
        //   $tempSlide[0].style.display = 'none';
        //   // angular.element($indSlideContainer[slideIndex]).addClass('slideOut');
        // }
        for(var i = 0; i < $indSlideContainer.length; i++){
          $indSlideContainer[i].style.display = 'none';
        }

        slideIndex++;
        if(slideIndex >= $indSlideContainer.length) {
          slideIndex = 0;
        }

        // if(slideIndex-1 === 0){
        //   $indSlideContainer[slideIndex-1].style.display = 'none';
        //   $indSlideContainer[slideIndex+2].style.display = 'none';
        // } else {
        //     $indSlideContainer[slideIndex-2].style.display = 'none';
        //   }
        // angular.element($indSlideContainer[slideIndex-1]).removeClass('slideIn')

        $tempSlide[0].style.display = 'none';
        $indSlideContainer[slideIndex].style.display = 'block';

      }, 15005);

    }

    function routes($routeProvider){
      $routeProvider
        .when('/', {
          templateUrl: '../partials/index.html',
          controller: 'indexCtrl'
        })
        .when('/governance', {
          templateUrl: '../partials/governance.html'
        })
        .when('/membership', {
          templateUrl: '../partials/membership.html'
        })
        .when('/mission', {
          templateUrl: '../partials/mission.html'
        })
        .when('/programs', {
          templateUrl: '../partials/programs.html'
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
          templateUrl: '../partials/donate.html'
        })
        .otherwise({
          rediretTo: '/'
        })
    }

})();
