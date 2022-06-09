require('../../assets/css/common.css');
require('../../assets/css/reset.css');
//font
require('../../assets/fonts/iconfont.css')
require('./train.less');
//工具函数
const tools = require('../../assets/js/tools');
const ajax = require('../../assets/js/axios');
const { get } = require('../../assets/js/tools');

document.addEventListener('DOMContentLoaded', function () {
    ajax.get('/api/train/courseList').then(function (r) {
        let arr = r.data.data;
        let newArr = arr.shift();
        // console.log(newArr);
        // console.log(newArr.fragments);
        let html = '';
        let baseurl = 'http://47.96.154.185:3701';
        //最新课程
        tools.get('.top img').src = baseurl + newArr.imgurl;
        tools.get('#title').textContent = newArr.name;
        tools.get('#content').textContent = newArr.desc;

        // 渲染课程列表
        arr.forEach(function (v) {
            html += ` <a href="./course.html?id=${v.courseId}" class="used">
            <img src="${baseurl + v.imgurl}" alt="">
            <h5 class="tittle">${v.name}</h5>
            <p class="content">${v.desc}</p>
            </a>
            `
            // console.log(v);
        })
        tools.get('.course').innerHTML += html;
    })
})