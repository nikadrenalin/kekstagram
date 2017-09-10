/**
 * Created by Nikita on 07.09.2017.
 */
var App = (function(){

  return {
    // Constants
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,

    checkSupportTemplateTag: false,

    init: function(){
      this.checkSupportTemplateTag = 'content' in document.createElement('template');
      Data.init();
      Gallery.init();
      Form.init();
    },

    // Return random on range
    getRandomNumber: function (min, max) {
      if (!min) {
        min = 15;
      }
      if (!max) {
        max = 200;
      }

      return Math.round(Math.random() * (max - min) + min);
    },

    // Check has parent
    isParent: function (parentClass, child) {
    var node = child.parentNode;
    while (node !== null) {
      if (node.classList && node.classList.contains(parentClass)) {
        return node;
      }
      node = node.parentNode;
    }
    return false;
  }
  }
})();

App.init();
