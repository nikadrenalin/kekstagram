/**
 * Created by Nikita on 09.09.2017.
 */
var Preview = (function(){

  // Add event open images
  function addEventOpenImages() {
    document.addEventListener('click', function (evt) {
      if (evt.target.parentNode.classList.contains('picture')) {
        evt.preventDefault();
        showImage(evt.target.parentNode);
      }
    });
  }

  // Show single image
  function showImage(item) {
    var gallery = document.querySelector('.gallery-overlay');
    var galleryOverlayClose = document.querySelector('.gallery-overlay-close');

    gallery.querySelector('.gallery-overlay-image').setAttribute('src', item.querySelector('img').getAttribute('src'));
    gallery.querySelector('.likes-count').textContent = item.querySelector('.picture-likes').textContent;
    gallery.querySelector('.comments-count').textContent = item.querySelector('.picture-comments').textContent;

    document.removeEventListener('keydown', onOpenImageByEnter);
    document.addEventListener('keydown', onCloseImageByEsc);
    galleryOverlayClose.addEventListener('click', hideImage);

    gallery.classList.toggle('hidden');
  }

  // Open popup by click on Enter
  function onOpenImageByEnter(evt) {
    if (evt.keyCode === App.ENTER_KEYCODE && evt.target.classList.contains('picture')) {
      evt.preventDefault();
      showImage(evt.target);
    }
  }

  // Close popup by click on Esc
  function onCloseImageByEsc(evt) {
    if (evt.keyCode === App.ESC_KEYCODE || evt.keyCode === App.ENTER_KEYCODE && evt.target.classList.contains('gallery-overlay-close')) {
      hideImage();
    }
  }

  // Hide gallery overlay popup
  function hideImage() {
    var gallery = document.querySelector('.gallery-overlay');
    var galleryOverlayClose = document.querySelector('.gallery-overlay-close');
    galleryOverlayClose.removeEventListener('click', hideImage);
    gallery.removeEventListener('keydown', onCloseImageByEsc);
    document.addEventListener('keydown', onOpenImageByEnter);

    gallery.classList.add('hidden');
  }

  return {
    init: function(){
      addEventOpenImages();
      document.addEventListener('keydown', onOpenImageByEnter);
    }
  }
})();
