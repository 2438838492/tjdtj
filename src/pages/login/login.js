require('../../assets/css/common.css');
require('../../assets/css/reset.css');
require('./login.less');
//工具函数
const tools = require('../../assets/js/tools');
//正则手机号码
let reg = /^1[3456789]\d{9}$/im;
//密码正则
let regtel = /\w{2,16}/im
document.querySelector('button').addEventListener('click', function (v) {
    if (tel() && pws()) {
        let account = document.querySelector('#username').value;
        let password = document.querySelector('#pws').value;
        //
        let ajax = new XMLHttpRequest();
        //
        ajax.open('post', 'http://47.96.154.185:3701/api/user/login');
        //请求头
        ajax.setRequestHeader('Content-Type', 'application/json');
        //请求参数
        let data = JSON.stringify({ "account": account, "password": password });
        //
        ajax.send(data);
        //
        ajax.addEventListener('readystatechange', function () {
            if (ajax.readyState === 4 && ajax.status === 200) {
                arr = ajax.responseText;
                console.log(JSON.parse(arr));
                if (JSON.parse(arr).errno === 0) {
                    alert('登录成功');
                } else {
                    alert('该账号未注册')
                }
            }
        })
    }
})

//变量验证真假
let corrct = true;
//手机验证
function tel() {
    let account = document.querySelector('#username').value;
    let password = document.querySelector('#pws').value;
    if (reg.test(account)) {
        document.querySelector('#username').style.border = '5px solid green';
        return corrct
    } else {
        document.querySelector('#username').style.border = '5px solid red';
        let mes = tools.get('.mes');
        mes.innerText = '亲输入正确的手机号'
    }

}

//密码验证
function pws() {
    let password = document.querySelector('#pws').value;
    if (regtel.test(password)) {
        document.querySelector('#pws').style.border = '5px solid green';
        return corrct;
    } else {
        document.querySelector('#pws').style.border = '5px solid red';
        let mes = tools.get('.mes');
        mes.innerText = '亲输入正确密码'
    }
}