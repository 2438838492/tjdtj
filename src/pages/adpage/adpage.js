require('../../assets/css/common.css');
require('../../assets/css/reset.css');
require('./adpage.less');
const tools = require('../../assets/js/tools');
//倒计时
document.addEventListener('DOMContentLoaded', function () {
    let n = 5;
    let time = setInterval(function () {
        let span = tools.get('span');
        n--;
        if (n === 0) {
            clearInterval(time);
            location.href = './login.html'
        }
        console.log(n);
        span.innerText = n;
    }, 1000)
});
