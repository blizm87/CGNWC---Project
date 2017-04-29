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
        if(slideIndex === 0){
          $indSlideContainer[slideIndex].style.display = 'block';
          $tempSlide[0].style.display = 'none';
          // angular.element($indSlideContainer[slideIndex]).addClass('slideOut');
        }

        slideIndex++;
        if(slideIndex > $indSlideContainer.length) {
          slideIndex = 1;
        }

        for(var i = 0; i < $indSlideContainer.length; i++){
          $indSlideContainer[i].style.display = 'none';
        }
        // if(slideIndex-1 === 0){
        //   $indSlideContainer[slideIndex-1].style.display = 'none';
        //   $indSlideContainer[slideIndex+2].style.display = 'none';
        // } else {
        //     $indSlideContainer[slideIndex-2].style.display = 'none';
        //   }
        // angular.element($indSlideContainer[slideIndex-1]).removeClass('slideIn')
        $indSlideContainer[slideIndex-1].style.display = 'block';

      }, 8000);

    }
})();
