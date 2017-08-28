(function(){
  'use strict';

  var COMMENTS = ['Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var templateImgs = document.querySelector('#picture-template');
  var pictures = document.querySelector('.pictures');
  var DATA = getTestData(COMMENTS);
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;


  if (supportsTemplate()) {
    templateImgs = templateImgs.content;
  }

  printImages(pictures, templateImgs, DATA);
  addEventOpenImages();
  document.addEventListener('keydown', onOpenImageByEnter);

  // Open popup by click on Enter
  function onOpenImageByEnter(evt) {
    if (evt.keyCode === ENTER_KEYCODE && evt.target.classList.contains('picture')) {
      evt.preventDefault();
      showImage(evt.target);
    }
  }

  // Close popup by click on Esc
  function onCloseImageByEsc(evt) {
    if (evt.keyCode === ESC_KEYCODE || evt.keyCode === ENTER_KEYCODE && evt.target.classList.contains('gallery-overlay-close')) {
      hideImage();
    }
  }

  // Add event open images
  function addEventOpenImages() {
    document.addEventListener('click', function (evt) {
      if (evt.target.parentNode.classList.contains('picture')) {
        evt.preventDefault();
        showImage(evt.target.parentNode);
      }
    });
  }
  // Check support 'template' tag
  function supportsTemplate() {
    return 'content' in document.createElement('template');
  }

  // Generate test data
  function getTestData(commentsArr, count) {
    var i = 0;
    var obj = {};
    var result = [];

    if (!count) {
      count = 25;
    }
    for (i; i < count; i++) {
      obj.url = 'photos/' + (i + 1) + '.jpg';
      obj.likes = getRandomNumber(15, 200);
      obj.comments = getRandomNumber(15, 200);
      result.push(obj);
      obj = {};
    }

    return result;
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

  // Print personages in DOM
  function printImages(container, template, data) {
    var i = 0;
    var templateHtml = null;
    var fragment = document.createDocumentFragment();

    for (i; i < data.length; i++) {
      templateHtml = parseImgTemplate(template, data[i]);
      fragment.appendChild(templateHtml);
    }
    container.appendChild(fragment);

    function parseImgTemplate(templateTag, item) {
      templateTag = templateTag.cloneNode(true);

      templateTag.querySelector('img').setAttribute('src', item.url);
      templateTag.querySelector('.picture-likes').textContent = item.likes;
      templateTag.querySelector('.picture-comments').textContent = item.comments;

      return templateTag;
    }
  }

  // Return random on range
  function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

}());
