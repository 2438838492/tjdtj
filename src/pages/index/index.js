require('../../assets/css/common.css');
require('../../assets/css/reset.css');

//swiper样式
require('../../libs/swiper8/swiper-bundle.min.css');

//字体图标
require('../../assets/fonts/iconfont.css');

//当前页面样式
require('./index.less');

const Swiper = require('../../libs/swiper8/swiper-bundle.min.js');

//工具函数
const tools = require('../../assets/js/tools');

//引入封装axios包
const ajax = require('../../assets/js/axios');

//swiper 轮播图
var mySwiper = new Swiper('.swiper', {
  loop: true, // 循环模式选项
  autoplay: {
    delay: 1000,
    stopOnLastSlide: false,
    disableOnInteraction: false,//禁止手滑后停止轮播
  },
  // 如果需要分页器
  pagination: {
    el: '.swiper-pagination',
  },
})

//页面加载获取用户数据
document.addEventListener('DOMContentLoaded', function () {
  ajax.get('/api/user/info')
    .then(function (data) {
      let res = data.data.data; //获取到的用户数据
      // console.log(data);
      tools.get('.first em').textContent = res.ranking;//排名
      tools.get('.second em').innerText = res.clockCount + '天';//签到
      tools.get('#badge').innerText = res.badges;//徽章
    })

  //页面加载时获取打卡信息 以打卡就禁止打卡
  ajax.get('/api/user/clockInInfo')
    .then(function (data) {
      //判断是否打卡
      let res = data.data.data;
      // console.log(res);
      if (res.isClockIn) {
        //已打卡
        tools.get('.second button').disabled = true;
        tools.get('.second button').textContent = '已打卡';
        tools.get('.second button').style.color = 'deeppink';
      }
    })

  //提交打卡信息
  tools.get('.second button').addEventListener('click', function () {
    ajax.post('/api/user/clockIn',)
      .then(function (res) {
        if (res.data.errno === 0) {
          alert('打卡成功')
        } else {
          alert(res.data.message)
        }
      })
  })
})