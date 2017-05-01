(function(){
  'use strict';
  console.log('I am cgnwc module');
  angular
    .module('cgnwcApp', ['ngRoute'])
    .config(routes)
    .controller('imageCycle', cycleImage)
    .controller('boardMembers', boardMembers)

    boardMembers.$inject = ['$http']
    function boardMembers($http){
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

    function cycleImage(){
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
          controller: 'imageCycle'
        })
        .when('/mission', {
          templateUrl: '../partials/mission.html'
        })
        .when('/programs', {
          templateUrl: '../partials/programs.html'
        })
        .when('/events', {
          templateUrl: '../partials/events.html'
        })
        .when('/contactUs', {
          templateUrl: '../partials/contactUs.html',
          controller: 'boardMembers'
        })
        .otherwise({
          rediretTo: '/'
        })
    }

})();
