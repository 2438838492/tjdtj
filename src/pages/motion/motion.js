require('../../assets/css/common.css');
require('../../assets/css/reset.css');
//font
require('../../assets/fonts/iconfont.css')
require('./motion.less');
//工具函数
const tools = require('../../assets/js/tools');

// 地图初始化应该在地图容器div已经添加到DOM树之后
var map = new AMap.Map('container', {
    zoom: 14
})
