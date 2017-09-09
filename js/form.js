/**
 * Created by Nikita on 09.09.2017.
 */
var Form = (function(){
  var MAX_HASHTAGS = 5;
  var MAX_LENGTH_HASHTAG = 20;
  var options = {
    uploadResizeControlsButtonInc: 'upload-resize-controls-button-inc',
    uploadResizeControlsButtonDec: 'upload-resize-controls-button-dec',
    uploadSelectImageForm: '#upload-select-image',
    effectImagePreview: 'effect-image-preview',
    uploadEffectControls: '.upload-effect-controls',
    uploadEffectLabel: 'upload-effect-label',
    uploadFormHashtags: 'upload-form-hashtags',
    uploadFormDescription: 'upload-form-description'
  };
  var $cashe = (function () {
    var $uploadOverlayForm = document.querySelector(options.uploadSelectImageForm);
    var obj = {};

    obj.uploadSelectImageForm = $uploadOverlayForm;
    obj.uploadEffectControls = $uploadOverlayForm.querySelector(options.uploadEffectControls);
    obj.effectImagePreview = $uploadOverlayForm.querySelector('.' + options.effectImagePreview);
    obj.uploadFormHashtags = $uploadOverlayForm.querySelector('.' + options.uploadFormHashtags);
    obj.uploadFormDescription = $uploadOverlayForm.querySelector('.' + options.uploadFormDescription);

    return obj;
  })();

  // Add event '#upload-file' form
  function addEventOpenDownloadOverlayForm () {
    var $uploadFile = $cashe.uploadSelectImageForm.querySelector('#upload-file');
    var $uploadOverlay = $cashe.uploadSelectImageForm.querySelector('.upload-overlay');
    var $uploadSubmit = $cashe.uploadSelectImageForm.querySelector('#upload-submit');

    $uploadFile.addEventListener('change', function() {
      document.addEventListener('keydown', addEventKeydownCloseDownloadOverlayForm);
      $cashe.uploadSelectImageForm.addEventListener('click', onChangeScaleImage);
      $cashe.uploadEffectControls.addEventListener('click', onChangeEffectImage);
      document.addEventListener('click', addEventClickCloseDownloadOverlayForm);
      $uploadSubmit.addEventListener('click', onClickUploadOverlayForm);
      $uploadOverlay.classList.remove('hidden');
    });
  }

  // Add event for change image effect
  function onChangeEffectImage (evt) {
    var check1 = isParent(options.uploadEffectLabel, evt.target);
    var $inputs = null;
    var i = 0;
    var $uploadEffectControls = null;

    if (check1) {
      $inputs = $cashe.uploadEffectControls.querySelectorAll('input[type="radio"]');
      for (i; i < $inputs.length; i++) {
        $inputs[i].removeAttribute('checked');
      }
      check1.previousElementSibling.setAttribute('checked', 'checked');
      $cashe.effectImagePreview.setAttribute('class', options.effectImagePreview + ' effect-' + check1.previousElementSibling.getAttribute('value'));
    }
  }

  // Check has parent
  function isParent(parentClass, child) {
    var node = child.parentNode;
    while (node !== null) {
      if (node.classList && node.classList.contains(parentClass)) {
        return node;
      }
      node = node.parentNode;
    }
    return false;
  }

  // Add events for change image scale
  function onChangeScaleImage (evt) {
    var check1 = evt.target.classList.contains(options.uploadResizeControlsButtonInc);
    var check2 = evt.target.classList.contains(options.uploadResizeControlsButtonDec);
    var $uploadResizeControlsValueElement = null;
    var uploadResizeControlsValue = null;

    if (check1 || check2) {
      $uploadResizeControlsValueElement = $cashe.uploadSelectImageForm.querySelector('input.upload-resize-controls-value');
      uploadResizeControlsValue = parseInt($uploadResizeControlsValueElement.getAttribute('value').replace('%',''));

      if (check1) {
        if (uploadResizeControlsValue < 100) {
          uploadResizeControlsValue += 25;
          if (uploadResizeControlsValue < 100) {
            $cashe.effectImagePreview.style.transform = 'scale(0.' + uploadResizeControlsValue + ')';
          } else {
            $cashe.effectImagePreview.style.transform = 'scale(1)';
          }
          $uploadResizeControlsValueElement.setAttribute('value', uploadResizeControlsValue + '%');
        }
      } else if (check2) {
        if (uploadResizeControlsValue > 25) {
          uploadResizeControlsValue -= 25;
          if (uploadResizeControlsValue < 100) {
            $cashe.effectImagePreview.style.transform = 'scale(0.' + uploadResizeControlsValue + ')';
          } else {
            $cashe.effectImagePreview.style.transform = 'scale(1)';
          }
          $uploadResizeControlsValueElement.setAttribute('value', uploadResizeControlsValue + '%');
        }
      }
    }
  }

  // Submit upload overlay form
  function onClickUploadOverlayForm() {
    var hashTags = null;
    var i = 0;

    if ($cashe.uploadFormHashtags.value.trim().length) {
      hashTags = $cashe.uploadFormHashtags.value.trim().split(' ');
      if (hashTags.length > MAX_HASHTAGS) {
        $cashe.uploadFormHashtags.setCustomValidity('Максимум можно использовать ' + MAX_HASHTAGS + ' хеш-тегов');
      } else {
        for (i; i < hashTags.length; i++) {
          if (hashTags[i][0] !== '#') {
            $cashe.uploadFormHashtags.setCustomValidity('Хэш-тег начинается с символа `#` и должен включать одно слово');
          } else if (hashTags[i].length > MAX_LENGTH_HASHTAG) {
            $cashe.uploadFormHashtags.setCustomValidity('Максимальная длина одного хэш-тега ' + MAX_LENGTH_HASHTAG + 'символов');
          } else if ($cashe.uploadFormHashtags.value.match(new RegExp(hashTags[i],"g")).length > 1) {
            $cashe.uploadFormHashtags.setCustomValidity('Хэш-теги не должны повторяться');
          } else if (hashTags[i].match(/#/ig).length > 1) {
            $cashe.uploadFormHashtags.setCustomValidity('Хэш-теги разделяются пробелами');
          } else {
            $cashe.uploadFormHashtags.setCustomValidity('');
          }
        }
      }
    }
    $cashe.uploadFormDescription.value = $cashe.uploadFormDescription.value.trim();
    if ($cashe.uploadFormDescription.value) {

    }
  }

  // Add event close upload overlay form by click
  function addEventClickCloseDownloadOverlayForm (evt) {
    if (evt.target.classList.contains('upload-form-cancel')) {
      closeUploadOverlayForm();
    }
  }

  // Add event close upload overlay form
  function addEventKeydownCloseDownloadOverlayForm (evt) {
    if (evt.keyCode === ESC_KEYCODE && evt.target.tagName !== 'INPUT' && evt.target.tagName !== 'TEXTAREA') {
      closeUploadOverlayForm();
    }
  }

  // Close upload overlay form
  function closeUploadOverlayForm () {
    var $form = document.querySelector(options.uploadSelectImageForm);
    var $uploadOverlay = $form.querySelector('.upload-overlay');
    var $uploadSubmit = $form.querySelector('#upload-submit');

    $cashe.uploadEffectControls.removeEventListener('click', onChangeEffectImage);
    document.removeEventListener('keydown', addEventKeydownCloseDownloadOverlayForm);
    document.removeEventListener('click', addEventClickCloseDownloadOverlayForm);
    $form.removeEventListener('click', onChangeScaleImage);
    $uploadSubmit.removeEventListener('click', onClickUploadOverlayForm);
    $uploadOverlay.classList.add('hidden');
  }

  return {
    init: function(){

      addEventOpenDownloadOverlayForm();
    }
  }
})();
