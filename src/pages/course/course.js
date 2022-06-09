require('../../assets/css/common.css');
require('../../assets/css/reset.css');
//font
require('../../assets/fonts/iconfont.css')
require('./course.less');
//工具函数
const tools = require('../../assets/js/tools');
const ajax = require('../../assets/js/axios');
const { get } = require('../../assets/js/tools');

//获取id
let id = location.search.split('=')[1]; //获取课程id
let baseurl = 'http://47.96.154.185:3701';

//发送请求获取数据
document.addEventListener('DOMContentLoaded', function () {
    ajax.get('/api/train/courseDetail?id=' + id)
        .then(function (r) {
            console.log(r.data.data);
            let data = r.data.data;
            tools.get('.preview img').src = baseurl + data.imgurl;
            tools.get('.title h5').textContent = data.name;
            tools.get('.desc').textContent = data.desc;

            //获取课程信息
            let fragments = JSON.stringify(data.fragments);

            // 课程信息保存到本地储存中
            localStorage.setItem('fragments', fragments)
        })
})