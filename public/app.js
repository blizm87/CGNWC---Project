(function(){
  'use strict';
  console.log('I am cgnwc module');
  angular
    .module('cgnwcApp', [])
    .controller('imageCycle', ['$scope', cycleImage])

    function cycleImage($scope){
      let vm = this;
      let $slideDiv = $('.imgContainer');
      let $slides = $('.imgContent');
      let counter = 0;
      setInterval(function() {
        // console.log($slides[counter])
        $slideDiv.eq(counter).css({
          'display': 'none'
        })

        counter += 1;
        if (counter === 4) {
          counter = 0;
        }
        console.log('testing: ' + counter)
      }, 1000);



    }
})();
