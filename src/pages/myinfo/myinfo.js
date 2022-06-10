require('../../assets/css/common.css');
require('../../assets/css/reset.css');

//字体图标
require('../../assets/fonts/iconfont.css');

//当前页面样式
require('./myinfo.less');

//工具函数
const tools = require('../../assets/js/tools');

//引入封装axios包
const ajax = require('../../assets/js/axios');

document.addEventListener('DOMContentLoaded', function () {
    //上传头像
    console.dir(tools.get('#avatar'));
    tools.get('#avatar').addEventListener('change', function () {

        let file = new FormData();
        file.append('file', this.files[0]);
        console.dir(this);

        ajax.post('api/shared/uploadPortrait1', file)
            .then(function (res) {
                if (res.data.errno === 0) {
                    //上传的头像地址
                    let url = 'http://47.96.154.185:3701' + res.data.data.url;
                    tools.get('#avatar-img').src = url;
                };
            })
    })

    //性别选择
    tools.get('#gender').addEventListener('click', function () {
        weui.picker([{
            label: '男',
            value: 0
        }, {
            label: '女',
            value: 1
        },], {
            onConfirm: function (r) {
                tools.get('.gender').textContent = r[0].label;
            },
            title: '性别'
        });
    })

    // 生日选择
    tools.get('#birthday').addEventListener('click', function () {
        weui.datePicker({
            start: 1990,
            end: new Date().getFullYear(),
            onConfirm: function (r) {
                let arr = r.map(function (v) {
                    return v.value < 10 ? '0' + v.value : v.value;
                }).join('-');
                tools.get('.birthday').textContent = arr;
            },
            title: '选择生日'
        });
    })

    //定义变量保存省份id 获取城市列表需要
    let previousID;
    //省份选择
    tools.get('#previous').addEventListener('click', function () {
        //获取省份列表
        ajax.get('api/shared/province')
            .then(function (r) {
                //构建新省份列表
                let previous = [];
                // console.log(r.data.data);//服务器端省份列表
                r.data.data.forEach(function (v) {
                    previousID = v.id; //省份ID
                    previous.push({ label: v.name, value: v.id });
                })
                // console.log(previous) 构造后新列表;
                weui.picker(previous, {
                    onConfirm: function (r) {
                        previousID = r[0].value; //省份id
                        tools.get('.previous').textContent = r[0].label;
                        tools.get('.city').textContent = '未选择';
                    },
                    title: '选择省'
                });
                // console.log(previousID);
            })
    })

    //城市 
    let cityId;
    tools.get('#city').addEventListener('click', function () {
        ajax.get('/api/shared/city?provinceId=' + previousID)
            .then(function (r) {
                //判断服务器是否返回城市列表
                if (r.data.errno === 0) {
                    let cityArr = []; //构建weui需要的城市列表
                    r.data.data.forEach(function (v) {
                        cityArr.push({ label: v.name, value: v.id })
                    })
                    weui.picker(cityArr, {
                        onConfirm: function (r) {
                            cityId = r[0].value;
                            tools.get('.city').textContent = r[0].label;
                        },
                        title: '城市'
                    });
                } else {
                    alert('请先选择省份')
                }
            })
    })

    //修改个人信息
    tools.get('.submit').addEventListener('click', function () {
        //获取个人信息
        let nickName = tools.get('.nickName').value;
        let gender = tools.get('.gender').textContent === '男' ? 0 : 1;
        let birthday = tools.get('.birthday').textContent;
        let imgUrl = tools.get('#avatar-img').src;
        let sign = tools.get('.textarea').value;
        // console.log(birthday);
        //提交数据到服务器
        ajax.post('/api/user/changeInfo', {
            nickName: nickName,
            gender: gender,
            birthday: birthday,
            imgUrl: imgUrl,
            sign: sign,
            provinceId: previousID,
            cityId: cityId,
        }).then(function (r) {
            if (r.data.errno) {
                alert('保存成功')
            }
        })
        // console.log(cityId);
    })
    /* 
    ajax.get('/api/user/info').then(function (r) {
        console.log(r);
    }) */

    //数据回填
    ajax.get('/api/user/info').then(function (res) {
        let info = res.data.data;
        // console.log(info);
        tools.get('.nickName').value = info.nickName;
        tools.get('.gender').textContent = info.gender === 0 ? '男' : '女';
        tools.get('.birthday').textContent = info.birthday;
        tools.get('#avatar-img').src = info.imgUrl;
        tools.get('.textarea').textContent = info.sign;
        tools.get('.city').textContent = info.cityId;
        // tools.get('.previous').textContent = info.provinceId;
        //省份回填
        ajax.get('/api/shared/province').then(function (v) {
            // 省份列表
            let arr = v.data.data;
            //filter筛选出符合条件值
            let newArr = arr.filter(function (v) {
                return v.id === info.provinceId;
            })
            //  console.log(newArr);
           tools.get('.previous').textContent = newArr[0].name;
        })

        // 城市回填
        ajax.get('/api/shared/city?provinceId=' + info.provinceId)
            .then(function (r) {
                let arr = r.data.data;
                // console.log(arr);
                let newArr = arr.filter(function (v) {
                    // console.log(v);
                    return v.id === info.cityId;
                })
                // console.log(newArr);
                tools.get('.city').textContent = newArr[0].name;
            })
        //个性签名字数显示
        tools.get('.textarea').addEventListener('input', function () {
            tools.get('.text-length').textContent = this.value.length;
        })
    })
})



