/**
 * Created by Nikita on 10.09.2017.
 */
var InitializeFilters = (function(){
  var options = {
    uploadEffectLabel: 'upload-effect-label'
  };

  // Add event scale change value
  function onChangeEffectImage (evt, el) {
    var check1 = App.isParent(options.uploadEffectLabel, evt.target);
    var $inputs = null;
    var i = 0;

    if (check1) {
      $inputs = el.querySelectorAll('input[type="radio"]');
      for (i; i < $inputs.length; i++) {
        $inputs[i].removeAttribute('checked');
      }
      check1.previousElementSibling.setAttribute('checked', 'checked');

      return check1.previousElementSibling.getAttribute('value');
    }
  }

  return {
    init: function(el, callback){
      el.addEventListener('click', function onClickOnEl (evt) {
        callback(onChangeEffectImage(evt, el));
      });
    },

    unload: function (el) {
      el.removeEventListener('click', onClickOnEl);
    }
  }
})();
