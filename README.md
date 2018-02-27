# react-boilerplate
利用ES6和Webpack开发React项目的脚手架

### 简介
对于日常工作中基于 React 技术栈的实践，利用webpack构成了基础的脚手架，支持最新的开发流程与默认的生产环境优化。特性如下：

- 使用 ES6/ES7 语法，允许使用 CSS Modules、SCSS 并且使用 PostCSS 进行自动 Polyfill。
- 使用 WebpackDevServer 部署开发服务器、使用 React Hot Loader 进行组件热加载、使用 Babel 进行代码转换。
- 使用 CommonChunksPlugin 作为生产环境下公共代码提取工具。

### 使用方法
1. 克隆仓库：`git clone https://github.com/BeckyWang/react-boilerplate.git`
2. 安装依赖：`npm install `可使用淘宝镜像cnpm
3. 本地测试：`npm run dev` 等模块编译加载完成后，浏览器就会自动打开。
4. 压缩编译：`npm run dist` 用于压缩编译混淆代码