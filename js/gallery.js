/**
 * Created by Nikita on 09.09.2017.
 */
var Gallery = (function(){

  return {
    init: function(){
      Picture.init();
      Picture.printImages();

      Preview.init();
    }
  }
})();
