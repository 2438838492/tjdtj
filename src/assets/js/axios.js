// 引入axios包文件
const axios = require('axios');
//用axios在创建一个axios新对象
const ajax = axios.create({
    baseURL: 'http://47.96.154.185:3701',
    headers: { 'authorization': 'Bearer ' + localStorage.getItem('token') }
});

module.exports=ajax;//暴露axios实例