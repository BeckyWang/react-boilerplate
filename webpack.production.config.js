const path = require('path');
const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSCSS = new ExtractTextPlugin('css/[name].css', {allChunks: false});


module.exports = {
    entry: {
        index: './src/index.js'
    },

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'js/[name].js'
    },

    module: {
        rules: [{
            test: /\.jsx?$/,
            include: [path.resolve(__dirname, "src")],
            enforce: "post",
            use: [{
                loader: "babel-loader",
                options: {
                    presets: ["react", "env"],
                    plugins: ["transform-object-rest-spread", "syntax-dynamic-import"],
                }
            }]
        }, {
            test: /\.scss$/,
            include: [path.resolve(__dirname, "src")],
            use: extractSCSS.extract({
                fallback: 'style-loader',
                use: ["css-loader?modules", {
                    loader: 'postcss-loader',
                    options: {
                        plugins: () => [
                            require('cssnano')({
                                preset: 'default',
                            }),
                            require('autoprefixer')({ browsers: ['last 10 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6', 'ie > 8'] })
                        ]
                    }
                }, "sass-loader"]
            })
        }, {
            test: /\.(?:png|jpg|gif|svg)$/,
            loader: 'url-loader?limit=8192&name=image/[hash].[ext]' //小于8k,内嵌;大于8k生成文件
        }]
    },

    resolve: {
        modules: [
            "node_modules",
            path.resolve(__dirname, "src"),
        ],
        extensions: [".js", ".jsx", ".json", ".css", ".scss"]
    },

    context: __dirname,

    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'echarts': 'echarts'
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            // 最紧凑的输出
            beautify: false,
            // 删除所有的注释
            comments: false,
            // compress: true,
            compress: {
                // 在UglifyJs删除没有用到的代码时不输出警告  
                warnings: false,
                // 删除所有的 `console` 语句
                // 还可以兼容ie浏览器
                drop_console: true,
                // 内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true,
            }
        }),
        new CopyWebpackPlugin([{
            from: 'node_modules/babel-polyfill/dist/polyfill.min.js',
            to: 'lib/'
        }, {
            from: 'node_modules/react/dist/react.min.js',
            to: 'lib/'
        }, {
            from: 'node_modules/react-dom/dist/react-dom.min.js',
            to: 'lib/'
        }]),
        new HtmlwebpackPlugin({
            filename: './index.html',
            template: 'src/index.ejs',
            title: 'react项目脚手架'
        }),
        new HtmlWebpackIncludeAssetsPlugin({
            assets: [
                'lib/polyfill.min.js',
                'lib/react.min.js',
                'lib/react-dom.min.js'
            ],
            append: false
        }),
        extractSCSS
    ]
}