const path = require('path');
const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const OpenBrowerPlugin = require('open-browser-webpack-plugin');

const port = 8088;
const host = `http://localhost:${port}/`;

module.exports = {
    entry: {
        index: './src/index.js'
    },

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'js/[name].js',
        publicPath: host
    },

    module: {
        rules: [{
            test: /\.jsx?$/,
            include: [path.resolve(__dirname, "src")],
            enforce: "post",
            use: [{
                loader: "babel-loader",
                options: {
                    presets: ["react", "es2017"],
                    plugins: ["transform-object-rest-spread", "syntax-dynamic-import"],
                }
            }]
        }, {
            test: /\.scss$/,
            include: [path.resolve(__dirname, "src")],
            use: ["style-loader", "css-loader?modules", {
                loader: 'postcss-loader',
                options: {
                    plugins: () => [
                        require('autoprefixer')({ browsers: ['last 10 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6', 'ie > 8'] })
                    ]
                }
            }, "sass-loader"]
        }, {
            test: /\.css$/,
            use: ["style-loader", 'css-loader']
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

    devtool: "eval-source-map",

    context: __dirname,

    devServer: {
        proxy: { // proxy URLs to backend development server
           
        },
        contentBase: [path.join(__dirname, "dist")],
        compress: true, // enable gzip compression
        historyApiFallback: true, // true for index.html upon 404, object for multiple paths
        hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
        port: port
    },

    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },

    plugins: [
        new CopyWebpackPlugin([{
            from: 'node_modules/react/dist/react.min.js',
            to: 'lib/'
        }, {
            from: 'node_modules/react-dom/dist/react-dom.min.js',
            to: 'lib/'
        }]),
        new HtmlwebpackPlugin({
            filename: 'index.html',
            template: 'src/index.ejs',
            title: 'react项目脚手架'
        }),
        new HtmlWebpackIncludeAssetsPlugin({
            assets: [
                'lib/react.min.js',
                'lib/react-dom.min.js'
            ],
            append: false
        }),
        new OpenBrowerPlugin({
            url: host
        })
    ]
};