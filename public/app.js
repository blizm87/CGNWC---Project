(function(){
  'use strict';
  console.log('I am cgnwc module');
  angular
    .module('cgnwcApp', [])
    .controller('imageCycle', cycleImage)

    function cycleImage(){
      // let $slideDiv = $('.imgContainer');
      // let $slides = $('.imgContent');
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
        $indSlideContainer[slideIndex-1].style.display = 'block';
      }, 5000);

    }
})();
