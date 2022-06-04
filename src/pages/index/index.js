require('../../assets/css/common.css');
require('../../assets/css/reset.css');
require('../../assets/fonts/iconfont.css');

//引入swiper
// import Swiper styles
//import Swiper from 'swiper';
// import Swiper JS
//import 'swiper/swiper-bundle.css';
//CommonJs
const Swiper = require('swiper');    
// const mySwiper = new Swiper('.swiper', { /* ... */ });

require('./index.less');
//工具函数
const tools = require('../../assets/js/tools');

//运动
let montion = tools.get('.motion');
montion.addEventListener('click', function () {
  location.href = './motion.html'
})

// Swiper
// tools.get('header');
/* Swiper.use([Navigation, Pagination]); // 使用需要的功能
const mySwiper = new Swiper('.swiper-container', {
  loop: true,
  pagination: {
    el: '.swiper-pagination', // 分页器
  },
  navigation: {
    nextEl: '.swiper-button-next', //切换箭头
    prevEl: '.swiper-button-prev',
  },
})  */