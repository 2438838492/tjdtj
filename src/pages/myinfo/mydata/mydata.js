require('../../assets/css/common.css');
require('../../assets/css/reset.css');

//字体图标
require('../../assets/fonts/iconfont.css');

//当前页面样式
require('./mydata.less');

//工具函数
const tools = require('../../assets/js/tools');

//引入封装axios包
const ajax = require('../../assets/js/axios');

const myecharts = require('echarts');
const { color } = require('echarts');
let echarts = myecharts.init(tools.get('.main1'));
let echarts2 = myecharts.init(tools.get('.main2'));
let echarts3 = myecharts.init(tools.get('.main3'));
let echarts4 = myecharts.init(tools.get('.main4'));

document.addEventListener('DOMContentLoaded', function () {
    //获取个人信息
    ajax.get('/api/user/info').then(function (res) {
        let data = (res.data.data);
        // console.log(data);
        tools.get('.consume span').textContent = Math.floor((data.meter)/1000) ;
        tools.get('.sport span').textContent = Math.floor((data.duration)/60) ;
    })

    tools.get('.header p span').addEventListener('click',function(){
        history.back(); 
    })

    //获取运动数据
    ajax.get('/api/exercise').then(function (res) {
        // console.log(res);
        let data = res.data.data;
        // console.log(data);

        //运动天数
        let newDays = data.days.map(function (v) {
            return v.date.substr('5');
        });
        //运动时长
        let newSumDuration = data.days.map(function (v) {
            return v.sumDuration;
        });
        echarts.setOption({
            //标题
            title: {
                text: '近7天运动时长',
                top: 20,
                left: 10

            },
            // 图表位置
            grid: {
                top: 80 + 'px',
                left: "50",
            },
            tooltip: {},
            // x轴参数
            xAxis: {
                type: 'category',
                data: newDays
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    showBackground: true,
                    type: 'bar',
                    data: newSumDuration,
                    backgroundStyle: {
                        color: 'rgba(45,45,45,.4)',
                    },

                }
            ]
        })

        //骑行时长
        let runTime = 0;
        //获取7天所有的骑行时间
        let runArr = data.days.map(function (v) {
            return (v.exerciseData[0].duration);
        });
        //遍历得出总时长
        runArr.forEach(function (v) {
            runTime += v;
        })

        //跑步时长
        let rideTime = 0;
        //获取7天所有的跑步时间
        let rideArr = data.days.map(function (v) {
            return (v.exerciseData[1].duration);
        });
        //遍历得出总时长
        rideArr.forEach(function (v) {
            rideTime += v;
        })

        //骑行时长
        let trainTime = 0;
        //获取7天所有的骑行时间
        let trainArr = data.days.map(function (v) {
            return (v.exerciseData[2].duration);
        });
        //遍历得出总时长
        trainArr.forEach(function (v) {
            trainTime += v;
        })

        // console.log(runTime, rideTime, trainTime);
        echarts2.setOption({
            title: {
                text: '运动分类',
                left: '10px',
                top: '10px',
            },

            legend: {
                orient: 'vertical',
                left: '10px',
                top: 'middle',

            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: '50%',
                    label: {
                        position: 'inner',
                        formatter: '{d}' + "%",
                        color: '#fff',
                        fontSize: '12px',
                        fontWeight: 'bold',
                    },
                    width: '310px',
                    height: '310px',
                    top: '0',
                    left: '20px',
                    data: [
                        { value: runTime, name: '骑行' },
                        { value: rideTime, name: '跑步' },
                        { value: trainTime, name: '训练' },

                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            color: 'rgba(0, 0, 0, 0.9)'
                        }
                    }
                }
            ]

        })


        echarts3.setOption({
            title: {
                text: '运动分类',
                left: '10px',
                top: '10px',
            },

            legend: {
                orient: 'vertical',
                left: 'right',
                top: 'middle',
            },

            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value'
            },
            yAxis: {
                type: 'category',
                data: newDays
            },
            series: [
                {
                    name: '骑行',
                    type: 'bar',
                    stack: 'total',
                    emphasis: {
                        focus: 'series'
                    },
                    data: rideArr
                },
                {
                    name: '跑步',
                    type: 'bar',
                    stack: 'total',
                    emphasis: {
                        focus: 'series'
                    },
                    data: runArr
                },
                {
                    name: '训练',
                    type: 'bar',
                    stack: 'total',
                    emphasis: {
                        focus: 'series'
                    },
                    data: trainArr
                },
            ]

        })

        //训练次数
        let conut = data.days.map(function (v) {
            return v.count
        });
        // console.log(conut);
        echarts4.setOption({
            title: {
                text: '运动分类',
                left: '10px',
                top: '10px',
            },

            legend: {
                orient: 'vertical',
                left: 'right',
                top: 'middle',
            },

            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: newDays
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: conut,
                    type: 'line'
                }
            ]

        })



    })

})


