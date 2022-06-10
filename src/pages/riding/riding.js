require('../../assets/css/common.css');
require('../../assets/css/reset.css');
//font
require('../../assets/fonts/iconfont.css')
require('./riding.less');
const { get } = require('../../assets/js/tools');
//工具函数
const tools = require('../../assets/js/tools');
// 地图初始化应该在地图容器div已经添加到DOM树之后
var map = new AMap.Map('container', {
    zoom: 14
})

tools.get('.go').addEventListener('click', function () {
    tools.get('.mask').style.display = 'flex';

    let n = 3;
    let timer = null;
    timer = setInterval(function () {
        n--;
        tools.get('.countdown').textContent = n;
        if (n === 0) {
            tools.get('.countdown').textContent = 'GO';
        }
        if (n < 0) {
            tools.get('.countdown').textContent = '';
            location.href = './sporting.html';
            clearInterval(timer)
        }
    }, 1000)


})