/**
 * Created by Nikita on 09.09.2017.
 */
var Form = (function(){
  var MAX_HASHTAGS = 5;
  var MAX_LENGTH_HASHTAG = 20;
  var currentImageFilter = null;
  var options = {
    uploadResizeControlsButtonInc: 'upload-resize-controls-button-inc',
    uploadResizeControlsButtonDec: 'upload-resize-controls-button-dec',
    uploadSelectImageForm: '#upload-select-image',
    effectImagePreview: 'effect-image-preview',
    uploadEffectControls: '.upload-effect-controls',
    uploadEffectLabel: 'upload-effect-label',
    uploadFormHashtags: 'upload-form-hashtags',
    uploadFormDescription: 'upload-form-description',
    uploadOverlay: 'upload-overlay',
    uploadEffectLevel: 'upload-effect-level',
    uploadEffectLevelPin: 'upload-effect-level-pin',
    uploadEffectLevelVal: 'upload-effect-level-val',
    uploadEffectLevelLine: 'upload-effect-level-line',
    uploadResizeControls: 'upload-resize-controls'
  };
  var $cache = (function () {
    var $uploadOverlayForm = document.querySelector(options.uploadSelectImageForm);
    var obj = {};

    obj.uploadSelectImageForm = $uploadOverlayForm;
    obj.uploadEffectControls = $uploadOverlayForm.querySelector(options.uploadEffectControls);
    obj.effectImagePreview = $uploadOverlayForm.querySelector('.' + options.effectImagePreview);
    obj.uploadFormHashtags = $uploadOverlayForm.querySelector('.' + options.uploadFormHashtags);
    obj.uploadFormDescription = $uploadOverlayForm.querySelector('.' + options.uploadFormDescription);
    obj.uploadEffectLevel = $uploadOverlayForm.querySelector('.' + options.uploadEffectLevel);
    obj.uploadResizeControls = $uploadOverlayForm.querySelector('.' + options.uploadResizeControls);

    return obj;
  })();

  // Add event '#upload-file' form
  function addEventOpenDownloadOverlayForm () {
    var $uploadFile = $cache.uploadSelectImageForm.querySelector('#upload-file');
    var $uploadOverlay = $cache.uploadSelectImageForm.querySelector('.' + options.uploadOverlay);
    var $uploadSubmit = $cache.uploadSelectImageForm.querySelector('#upload-submit');

    $uploadOverlay.querySelector('.upload-effect-level').classList.add('hidden');

    $uploadFile.addEventListener('change', function() {
      document.addEventListener('keydown', addEventKeydownCloseDownloadOverlayForm);
      InitializeScale.init($cache.uploadResizeControls, adjustScale);
      InitializeFilters.init($cache.uploadEffectControls, adjustFilter);
      document.addEventListener('click', addEventClickCloseDownloadOverlayForm);
      $uploadSubmit.addEventListener('click', onClickUploadOverlayForm);
      $uploadOverlay.classList.remove('hidden');
    });
  }

  // Adjust filter for image
  function adjustFilter (filter) {
    if (filter) {
      $cache.effectImagePreview.setAttribute('class', options.effectImagePreview + ' effect-' + filter);
      addChangeEffectOnDrag(filter);
    }
  }

  // Change dip for effect on drag
  function addChangeEffectOnDrag (effect) {
    var pin = $cache.uploadEffectLevel.querySelector('.' + options.uploadEffectLevelPin);

    $cache.effectImagePreview.style.filter = '';
    if (effect === 'none') {
      $cache.uploadEffectLevel.classList.add('hidden');
      $cache.effectImagePreview.style.filter = '';
    } else {
      $cache.uploadEffectLevel.classList.remove('hidden');
      currentImageFilter = effect;
      setRangeValue(20);
      applyFilterForImage(20);
      pin.addEventListener('mousedown', onMouseDownPinDrag);
    }
  }

  // Add event on pin by mouse down
  function onMouseDownPinDrag(evt) {
    evt.preventDefault();
    var $pin = $cache.uploadEffectLevel.querySelector('.' + options.uploadEffectLevelPin);
    var $line = $cache.uploadEffectLevel.querySelector('.' + options.uploadEffectLevelLine);
    var startCoords = {
      x: evt.clientX
    };
    var result = null;

    function onMouseMove (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };
      result = ((($pin.offsetLeft - shift.x) * 100) / ($line.offsetWidth));
      if (result < 0) {
        result = 0;
      } else if (result > 100) {
        result = 100;
      } else {
        applyFilterForImage(result);
        setRangeValue(result);
      }
    };

    function onMouseUp (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  // Set range to value
  function setRangeValue (val) {
    var $pin = $cache.uploadEffectLevel.querySelector('.' + options.uploadEffectLevelPin);
    var $val = $cache.uploadEffectLevel.querySelector('.' + options.uploadEffectLevelVal);

    $pin.style.left = val + '%';
    $val.style.width = val + '%';
  }

  // Apply filter for image
  function applyFilterForImage (val) {
    if (currentImageFilter === 'chrome') {
      $cache.effectImagePreview.style.filter = 'grayscale(' + val / 100 + ')';
    } else if (currentImageFilter === 'sepia') {
      $cache.effectImagePreview.style.filter = 'sepia(' + val / 100 + ')';
    } else if (currentImageFilter === 'marvin') {
      $cache.effectImagePreview.style.filter = 'invert(' + val + '%)';
    } else if (currentImageFilter === 'phobos') {
      $cache.effectImagePreview.style.filter = 'blur(' + val * (3 / 100) + 'px)';
    } else if (currentImageFilter === 'heat') {
      $cache.effectImagePreview.style.filter = 'brightness(' + val * (3 / 100) + ')';
    }
  }

  // Submit upload overlay form
  function onClickUploadOverlayForm() {
    var hashTags = null;
    var i = 0;

    if ($cache.uploadFormHashtags.value.trim().length) {
      hashTags = $cache.uploadFormHashtags.value.trim().split(' ');
      if (hashTags.length > MAX_HASHTAGS) {
        $cache.uploadFormHashtags.setCustomValidity('Максимум можно использовать ' + MAX_HASHTAGS + ' хеш-тегов');
      } else {
        for (i; i < hashTags.length; i++) {
          if (hashTags[i][0] !== '#') {
            $cache.uploadFormHashtags.setCustomValidity('Хэш-тег начинается с символа `#` и должен включать одно слово');
          } else if (hashTags[i].length > MAX_LENGTH_HASHTAG) {
            $cache.uploadFormHashtags.setCustomValidity('Максимальная длина одного хэш-тега ' + MAX_LENGTH_HASHTAG + 'символов');
          } else if ($cache.uploadFormHashtags.value.match(new RegExp(hashTags[i],"g")).length > 1) {
            $cache.uploadFormHashtags.setCustomValidity('Хэш-теги не должны повторяться');
          } else if (hashTags[i].match(/#/ig).length > 1) {
            $cache.uploadFormHashtags.setCustomValidity('Хэш-теги разделяются пробелами');
          } else {
            $cache.uploadFormHashtags.setCustomValidity('');
          }
        }
      }
    }
    $cache.uploadFormDescription.value = $cache.uploadFormDescription.value.trim();
    if ($cache.uploadFormDescription.value) {

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
    if (evt.keyCode === App.ESC_KEYCODE && evt.target.tagName.toLocaleLowerCase() !== 'input' && evt.target.tagName.toLocaleLowerCase() !== 'textarea') {
      closeUploadOverlayForm();
    }
  }

  // Set scale style for download image
  function adjustScale (scale) {
    $cache.effectImagePreview.style.transform = 'scale(' +  scale / 100 + ')';
  };

  // Close upload overlay form
  function closeUploadOverlayForm () {
    var $form = document.querySelector(options.uploadSelectImageForm);
    var $uploadOverlay = $form.querySelector('.upload-overlay');
    var $uploadSubmit = $form.querySelector('#upload-submit');

    $cache.uploadEffectControls.removeEventListener('click', onChangeEffectImage);
    document.removeEventListener('keydown', addEventKeydownCloseDownloadOverlayForm);
    document.removeEventListener('click', addEventClickCloseDownloadOverlayForm);
    $uploadSubmit.removeEventListener('click', onClickUploadOverlayForm);
    InitializeScale.unload();
    InitializeFilters.unload();
    $uploadOverlay.classList.add('hidden');
  }

  return {
    init: function(){

      addEventOpenDownloadOverlayForm();
    }
  }
})();
