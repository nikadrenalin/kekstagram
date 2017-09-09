/**
 * Created by Nikita on 09.09.2017.
 */
var Picture = (function(){
  var pictures = document.querySelector('.pictures');
  var templateImgs = document.querySelector('#picture-template');

  return {
    init: function(){

      return true;
    },
    printImages: function(){
      var i = 0;
      var templateHtml = null;
      var fragment = document.createDocumentFragment();
      var data = Data.getImagesData();

      if (App.checkSupportTemplateTag) {
        templateImgs = templateImgs.content;
      }

      for (i; i < data.length; i++) {
        templateHtml = parseImgTemplate(templateImgs, data[i]);
        fragment.appendChild(templateHtml);
      }
      pictures.appendChild(fragment);

      function parseImgTemplate(templateTag, item) {
        templateTag = templateTag.cloneNode(true);

        templateTag.querySelector('img').setAttribute('src', item.url);
        templateTag.querySelector('.picture-likes').textContent = item.likes;
        templateTag.querySelector('.picture-comments').textContent = item.comments;

        return templateTag;
      }
    }
  }
})();
