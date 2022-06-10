require('../../assets/css/common.css');
require('../../assets/css/reset.css');
//font
require('../../assets/fonts/iconfont.css')
require('./sporting.less');
const { get } = require('../../assets/js/tools');
//工具函数
const tools = require('../../assets/js/tools');
const ajax = require('../../assets/js/axios');

// 计时器
let time = null;
document.addEventListener('DOMContentLoaded', function () {
    timer();
    //时分秒
    let hour = 0;
    let minute = 0;
    let second = 0;

    // 运动时长
    let duration = 0;

    //暂停
    tools.get('.pause').addEventListener('click', function () {
        this.style.display = 'none';
        this.nextElementSibling.style.display = 'block';
        this.nextElementSibling.nextElementSibling.style.display = 'block';
        // 清除定时器
        clearInterval(time);
    })

    //继续
    tools.get('.continue').addEventListener('click', function () {
        this.style.display = 'none';
        this.nextElementSibling.style.display = 'none';
        this.previousElementSibling.style.display = 'block';
        timer();
    })

    //结束
    tools.get('.end').addEventListener('click', function () {
        //!!!注意这里获取到的值是String 计算要转为Number类型
        let timeHour = tools.get('.hour').textContent;
        let timeminute = tools.get('.minute').textContent;
        let timesecond = tools.get('.second').textContent;

        // 计算总秒数
        let totalMinute = Number(timeHour * 60) + Number(timeminute * 60) + Number(timesecond);

        //计算卡路里
        let calorie = Math.floor(70 * (totalMinute / 3600) * 10 * 1000);

        //上传数据
        ajax.post('http://47.96.154.185:3701/api/exercise/save', {
            type: 0,
            duration: totalMinute,
            calorie: calorie,
        })
            .then(function (res) {
                if (res.data.errno === 0) {
                    clearInterval(time);
                    history.go(-1);
                }
            })
    })

    //定时器函数
    function timer() {
        time = setInterval(function () {
            second++;
            if (second > 59) {
                second = 0;
                minute += 1;
                if (minute > 59) {
                    minute = 0;
                    hour += 1;
                }
            }
            //渲染时分秒
            tools.get('.hour').textContent = hour < 10 ? "0" + hour : '' + hour;
            tools.get('.minute').textContent = minute < 10 ? "0" + minute : '' + minute;
            tools.get('.second').textContent = second < 10 ? "0" + second : '' + second;
        }, 1000);
    }
})


