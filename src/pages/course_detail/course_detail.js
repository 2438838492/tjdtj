require('../../assets/css/common.css');
require('../../assets/css/reset.css');
//font
require('../../assets/fonts/iconfont.css')
require('./course_detail.less');
//工具函数
const tools = require('../../assets/js/tools');
const ajax = require('../../assets/js/axios');
const { get } = require('../../assets/js/tools');

let fragments = localStorage.getItem('fragments');
fragments = JSON.parse(fragments);
console.log(fragments);

let baseurl = 'http://47.96.154.185:3701';

document.addEventListener('DOMContentLoaded', function () {
    let video = tools.get('video');
    let n = 0; //保存视屏播放的片段
    play();

    // 记录锻炼时长
    let duration = new Date().getTime();
    console.log(duration);

    //自动循环播放
    video.addEventListener('ended', function () {
        n++
        if (n === fragments.length) { //重置播放片段达到循环播放
            n = 0;
            play();
        }
        play();
    })

    //上一集
    tools.get('.icon-previous').addEventListener('click', function () {
        n--;
        if (n < 0) {
            n = 0;
            play();
        }
        play();
    })

    //暂停
    tools.get('.icon-play').addEventListener('click', function () {
        video.pause();
        duration = new Date().getTime();
        console.log(duration);
    })

    // 下一集
    tools.get('.icon-next').addEventListener('click', function () {
        n++;
        if (n === fragments.length) {
            n = fragments.length - 1;
            play();
        }
        play();
    })
    // 视频播放函数
    function play() {
        video.src = baseurl + fragments[n].videoUrl;
    }
    // console.log(fragments[0].videoUrl);
})