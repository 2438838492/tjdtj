//引入 html加载插件
const HtmlWebpackPlugin=require('html-webpack-plugin');

//引入 提取CSS文件的插件
const MiniCssExtractPlugin=require('mini-css-extract-plugin');

//引入 优先css的插件
const OptimizeCssAssetsWebpackPlugin=require('optimize-css-assets-webpack-plugin');

//自动获取js文件，实现自动找到入口
let glob=require('glob');
let files=glob.sync('./src/pages/*/*.js');
let entry={};
files.forEach(function(v){
    let fn=v.match(/\/(\w+)\.js/i);
    entry[ fn[1] ] = v;
});

//自动获取html文件，实现自动找网页模板
let htmls=glob.sync('./src/pages/*/*.html');
let htmlArr=htmls.map(function(v){
    let fn=v.match(/\/(\w+)\.html/i);
    return new HtmlWebpackPlugin({
        template: v,
        filename: fn[0].substr(1),
        chunks:[fn[1]],
    });
});


module.exports={
    //入口
    entry: entry,

    //出口
    output:{
        path:__dirname+'/dist',
        filename:'js/[name].js',
        publicPath:'./', //需要手动添加公共路径，才能对html打包
    },

    //加载器
    module:{
        //加载器规则
        rules:[
            //css加载器
            {test:/\.css$/i, use:[{
                loader: MiniCssExtractPlugin.loader,
                options:{
                    publicPath:'../',
                }
            }, 'css-loader']},

            //less加载器
            {test:/\.less$/i, use:[{
                loader: MiniCssExtractPlugin.loader,
                options:{
                    publicPath:'../',
                }
            }, 'css-loader', 'less-loader']},

            //css图片的加载器
            {test:/\.(jpg|png|gif|webp|jpeg)$/i, use:[{
                loader:'url-loader',
                options:{
                    limit:10*1024, //10kb以下的文件打包成代码，10kb以上的打包成文件
                    name:'[hash:8].[ext]', //设置输出的文件名
                    outputPath:'images', //设置输出文件的路径
                    esModule:false, //禁用es6的模块化
                }
            }]},

            //html中的图片
            {test:/\.html$/i, use:['html-loader']},

            //字体文件资源加载器
            {test:/\.(ttf|woff|woff2|eot|svg)$/i, use:[{
                loader:'file-loader',
                options:{
                    name:'[hash:8].[ext]', //设置字体图标文件的文件名
                    outputPath:'fonts', //设置字体图标文件的打包文件夹
                }
            }]}
        ]
    },

    //插件
    plugins:[
        //提出css文件的插件
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),

        //优化css的插件
        new OptimizeCssAssetsWebpackPlugin(),
    ].concat(htmlArr),

    //模式，生产环境或开发环境由命令来决定
    mode: process.env.NODE_ENV,

    //开发服务器
    devServer:{
        contentBase: __dirname+'/dist', // 启动服务器目录
        compress: true, // 启动gzip
        port: 8080,  // 端口
        open: true, // 自动打开服务
        publicPath: '/', // 静态资源查找路径
        openPage: 'adpage.html', // 打开的页面
    },
    target: 'web', // 目标是浏览器
}