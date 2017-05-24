(function(){
  'use strict';
  console.log('I am cgnwc module');
  angular
    .module('cgnwcApp', ['ngRoute'])
    .config(routes)
    .controller('mainCtrl', ['$scope', '$http', '$timeout', mainCtrl])
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

    } //  END DONTATECTRL - CONTROLLER

    function contactCtrl($http){

    } //  END CONTACTCTRL - CONTROLLER

    function eventCtrl($scope, $http) {
      //  FUNCTION EXECUTING AFTER NGREPEAT FINISHES RENDEREING
      $scope.$on('LastRepeaterElement', function(){
        tHeadWidthFix();
        //  EVENTCONTENTMOBILE SECTION DECORATOR
        let $mobileSec = $('.eventsContentMobile>section');
        for(var i = 0; i < $mobileSec.length; i++){
          if(i%2 !== 0 ) {
            $mobileSec.eq(i).css({
              'background-color': 'rgba(54, 139, 193,.5)'
            })
          }
        }
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

      $addEventBtn.on('click', function(){
          $eventCreateForm.slideToggle();
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
            // console.log($(this)[0])
            // console.log($(this).outerWidth())
            // console.log($(this)[0].offsetWidth)
            return $(this).outerWidth();
        }).get();

        // Set the width of thead columns
        $table.find('thead tr').children().each(function(i, v) {
          // console.log(v)
          // console.log('width equals: ' + colWidth[i])
            // $(v).width(colWidth[i]);
            $(v).css({
              'width': colWidth[i] + 'px'
              // 'border': '1px solid yellow'
            })
        });
      }

    }  // END EVENTCTRL - CONTROLLER

    function programCtrl() {
      console.log('program Controller')
    } //  END PROGRAMCTRL - CONTROLLER

    function govCtrl() {
      console.log('governance Controller')

    } //  END GOVCTRL - CONTROLLER

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

    } //  END INDEXCTRL - CONTROLLER

    function mainCtrl($scope, $http, $timeout){
      //  MOBILE MAINCONTENTBODY HEIGHT FIX
      const $mainContainer = $('#mainContainer');
      const $headerCont = $('#headerContainer');
      const $mainBodyCont = $('#mainBodyContainer');
      let headContHeightNum = $headerCont.outerHeight();
      let headContHeightString = headContHeightNum.toString();

      if($mainContainer.outerWidth() <= 768){

        $mainBodyCont.css({
          'margin-top': headContHeightString + 'px'
        })

        //  NAVIGATION DROPDOWN FEATURE FOR MOBILE
        $(document).on('touchstart', '#menuBtn, #navbar>div>li>a, #navbar>div>li>ul>li>a, #navbar>div>li>ul>li>ul>li>a', function(event){
          if(event.target.textContent == 'CGNWC'){
            //  DO NOTHING
          } else if(event.target.textContent == 'GOVERNANCE'){
              //  DO NOTHING
            } else if(event.target.textContent == 'PROGRAMS'){
                //  DO NOTHING
              } else {
                  $timeout(function(){
                    $('#navbar').slideToggle();
                    $('#openMenuBtn').slideToggle();
                    $('#closeMenuBtn').slideToggle();
                  }, 500)
                }
        });

        //  NAVIGATION SCROLLING FEATURE FOR MOBILE
        const $root = $('html, body');
        $(document).on('touchstart', '#navbar>div>li>ul>li>a, #navbar>div>li>ul>li>ul>li>a, #upScroll>a' , function(event){
          // event.preventDefault();
          if($(this).attr('id') == 'upScrollTag'){
            $timeout(function(){
              $root.animate({
                  scrollTop: 0
              }, 500);
            }, 1000)
          } else if(event.target.textContent !== 'GOVERNANCE'){

                let aClassName = $(this).attr('class').split(' ')[1];
                $timeout(function(){
                  let tagTarget = $('#' + aClassName)
                  $root.animate({
                      scrollTop: tagTarget[0].offsetTop - headContHeightNum
                  }, 1000);
                }, 500)
            }
        });

      } else {
          //  NAVIGATION SCROLLING FEATURE
          const $root = $('html, body');
          $(document).on('click', '#navbar>div>li>ul>li>a, #navbar>div>li>ul>li>ul>li>a, #upScroll' , function(event){
            event.preventDefault();
            if($(this).attr('id') == 'upScrollTag'){
              $timeout(function(){
                $root.animate({
                    scrollTop: 0
                }, 500);
              }, 1000)
            } else if(event.target.textContent !== 'GOVERNANCE'){

                if($mainContainer.outerWidth() <= 768){
                  let aClassName = $(this).attr('class').split(' ')[1];
                  $timeout(function(){
                    let tagTarget = $('#' + aClassName)
                    $root.animate({
                        scrollTop: tagTarget[0].offsetTop - headContHeightNum
                    }, 1000);
                  }, 500)
                } else {
                    let aClassName = $(this).attr('class').split(' ')[1];
                    $timeout(function(){
                      let tagTarget = $('#' + aClassName)
                      $root.animate({
                          scrollTop: tagTarget[0].offsetTop
                      }, 1000);
                    }, 500)
                  }

              }
          });
        }

    } //  END MAINCTRL -  CONTROLLER

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
