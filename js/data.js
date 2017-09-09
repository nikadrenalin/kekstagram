/**
 * Created by Nikita on 09.09.2017.
 */
var Data = (function(){
  var COMMENTS = ['Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

  return {
    init: function(){

      return true;
    },
    getImagesData: function(count){
      var i = 0;
      var obj = {};
      var result = [];

      if (!count) {
        count = 25;
      }
      for (i; i < count; i++) {
        obj.url = 'photos/' + (i + 1) + '.jpg';
        obj.likes = App.getRandomNumber();
        obj.COMMENTS = App.getRandomNumber();
        result.push(obj);
        obj = {};
      }

      return result;
    }
  }
})();
