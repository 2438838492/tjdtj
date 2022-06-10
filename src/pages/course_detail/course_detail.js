require('../../assets/css/common.css');
require('../../assets/css/reset.css');
//font
require('../../assets/fonts/iconfont.css')
require('./course_detail.less');
//工具函数
const tools = require('../../assets/js/tools');
const ajax = require('../../assets/js/axios');


let fragments = localStorage.getItem('fragments');
fragments = JSON.parse(fragments);
console.log(fragments);
let baseurl = 'http://47.96.154.185:3701';
let duration = 0;
document.addEventListener('DOMContentLoaded', function () {
    let video = tools.get('video');
    let n = 0; //保存视屏播放的片段
    play();

    // 记录锻炼时长
    let startTime = new Date().getTime();
    console.log(startTime);

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
        endTime = new Date().getTime();
        // console.log(endTime);
        tools.get('.box').style.display = 'flex';

        duration += (endTime - startTime) / 1000;
        // console.log( duration);

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
        tools.get('#total').textContent = fragments.length;
        tools.get('#festival').textContent = n + 1;
        tools.get('#title').textContent = fragments[n].title;
        // console.log(fragments[n].title);
    }
    // console.log(fragments[0].videoUrl);

    //模态框
    //继续训练
    tools.get('.box .continue').addEventListener('click', function () {
        tools.get('.box').style.display = 'none';
        video.play();
        startTime = new Date().getTime();
    })
    //结束训练
    tools.get('.box .end').addEventListener('click', function () {
        //运动时长
        duration = Math.floor(duration);
        console.log(duration);
        let calorie = Math.floor(70 * (duration / 3600) * 10 * 1000);
        ajax.post('/api/exercise/save', { type: 2, calorie: calorie, duration: duration, })
            .then(function (r) {
                console.log(r.data);
                if (r.data.errno === 0) {
                    alert('成功');
                    history.go(-1);
                }
            })
    })


})