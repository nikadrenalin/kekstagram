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


  if (supportsTemplate()) {
    templateImgs = templateImgs.content;
  }

  printImages(pictures, templateImgs, DATA);
  showImage(DATA[0]);


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
      obj.comments = commentsArr[Math.floor(Math.random() * commentsArr.length)];
      result.push(obj);
      obj = {};
    }

    return result;
  }

  // Show single image
  function showImage(data) {
    var gallery = document.querySelector('.gallery-overlay');

    gallery.classList.toggle('hidden');

    gallery.querySelector('.gallery-overlay-image').setAttribute('src', data.url);
    gallery.querySelector('.likes-count').textContent = data.likes;
    gallery.querySelector('.comments-count').textContent = COMMENTS.length;

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
