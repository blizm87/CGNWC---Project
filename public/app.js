(function(){
  'use strict';
  console.log('I am cgnwc module');
  angular
    .module('cgnwcApp', [])
    .controller('imageCycle', cycleImage)

    function cycleImage(){
      let slideIndex = 0;
      let $indSlideContainer = $('.indSlideContainer');
      let $tempSlide = $('.tempSlide');

      setInterval(function(){
        for(var i = 0; i < $indSlideContainer.length; i++){
          $indSlideContainer[i].style.display = 'none';
        }

        slideIndex++;
        if(slideIndex > $indSlideContainer.length) {
          slideIndex = 1;
        }
        $tempSlide[0].style.display = 'none';
        // angular.element($indSlideContainer[slideIndex-1]).addClass('slideOut');
        // angular.element($indSlideContainer[slideIndex-1]).addClass('slideIn');
        $indSlideContainer[slideIndex-1].style.display = 'block';
        console.log($indSlideContainer[slideIndex]);
      }, 3000);

    }
})();
