/**
 * Created by Nikita on 10.09.2017.
 */
var InitializeScale = (function(){
  var options = {
    uploadResizeControlsButtonInc: 'upload-resize-controls-button-inc',
    uploadResizeControlsButtonDec: 'upload-resize-controls-button-dec',
    uploadResizeControlsValue: 'upload-resize-controls-value'
  };

  // Add event scale change value
  function addEvtChangeScale (evt, el) {
    var check1 = evt.target.classList.contains(options.uploadResizeControlsButtonInc);
    var check2 = evt.target.classList.contains(options.uploadResizeControlsButtonDec);
    var $uploadResizeControlsValueElement = null;
    var uploadResizeControlsValue = null;
    var result = null;

    if (check1 || check2) {
      $uploadResizeControlsValueElement = el.querySelector('.' + options.uploadResizeControlsValue);
      uploadResizeControlsValue = parseInt($uploadResizeControlsValueElement.getAttribute('value').replace('%',''));

      if (check1) {
        if (uploadResizeControlsValue < 100) {
          uploadResizeControlsValue += 25;
          $uploadResizeControlsValueElement.setAttribute('value', uploadResizeControlsValue + '%');
          result = uploadResizeControlsValue;
        }else {
          result = 100;
        }
      } else if (check2) {
        if (uploadResizeControlsValue > 25) {
          uploadResizeControlsValue -= 25;
          $uploadResizeControlsValueElement.setAttribute('value', uploadResizeControlsValue + '%');
          result = uploadResizeControlsValue;
        } else {
          result = 25;
        }
      }

      return result;
    }
  }

  return {
    init: function(el, callback){
      el.addEventListener('click', function onClickOnEl (evt) {
        callback(addEvtChangeScale(evt, el));
      });
    },

    unload: function (el) {
      el.removeEventListener('click', onClickOnEl);
    }
  }
})();
