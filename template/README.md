# 企业门户（报销，财税查查）H5

## 集成功能介绍

- css normalize，以及部分css reset
- 两套样式框架
    - [mint-ui](https://mint-ui.github.io/#!/zh-cn)，vue移动端组件
    - [微信weui](https://github.com/Tencent/weui)，类似bootstrap。由于weui.js从CDN导入到window.weui，所以开发时无需import weui对象<br>
    [样式文档链接](https://github.com/Tencent/weui/wiki) ， [js文档链接](https://github.com/Tencent/weui.js/blob/master/docs/README.md)

- ~~[微信js-sdk](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115)~~

- [手机淘宝可伸缩布局方案](https://github.com/amfe/lib-flexible)，用于设计稿像素级还原
- [使用Flexible实现手淘H5页面的终端适配](https://www.w3cplus.com/mobile/lib-flexible-for-html5-layout.html)
- [腾讯vConsole移动端调试方案](https://github.com/Tencent/vConsole)，用于手机真机的环境问题调试。需要使用时就取消index.html中vconsole脚本标签的注释。
---


## 设计稿像素级还原

淘宝flexible会将页面的root font-size设置为手机宽度的1/10，相关概念太多所以不解释，写代码的时候只要把设计稿的px换算成rem就好。

如在750px宽的设计稿中，一个宽200px的元素换算为

`200 ÷ 750 × 10 = 2.666666rem`

在css中就写 `width:2.666666rem;` ，建议安装编辑器插件在写代码时自动换算，记得将插件默认的root font-size改为设计稿宽度除以10，通常为75px或37.5px。

需要换算为rem的地方包括：
- 容器大小
- font-size
- 大于1px的边框、圆角、阴影
- 内距和外距

现在css像素已经与设计稿像素相对应，并且自动伸缩适应设备屏幕。


> **1px的线适配（不强制）**
>
> 1px的线在dpr>1的屏幕上对应的物理像素为2~4px，这会让1px的线看起来比设计稿要粗一些，所以应该想办法让手机正确地渲染1px线。
>
> 推荐用这篇文章的最后一种方法 [伪类 + transform](http://www.jianshu.com/p/7e63f5a32636) 去还原1px的线。
>
> 当然，高清屏的像素适配还有图片适配，可以看[这篇文章](https://www.w3cplus.com/mobile/lib-flexible-for-html5-layout.html)里的[这张图](http://www.w3cplus.com/sites/default/files/blogs/201212/retina-web-10.jpg)，但这些操作需要其他部门的配合，比较麻烦，目前应该搞不了。

---

### 优化
- http://blog.seosiwei.com/detail/9

## Build Setup

``` bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 打包 开发环境
npm run builddev

# 打包 测试环境
npm run buildtest

# 打包 预生产环境
npm run buildpre

# 打包 生产环境
npm run buildprod
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

#工程已升级为webpack4,以下为升级内容

1、更新webpack版本至 4.27.1, 下载webpack-cli(webpack4之后，webpack-cli与webpack分离，需要单独下载依赖)，并更新需要升级的依赖;
2、更新loader版本，将node使用版本提升至大于8.0版本;
3、webpack4 抛弃了extract-text-webpack-plugin、webpack.optimize.UglifyJsPlugin、CommonsChunkPlugin,分别使用 mini-css-extract-plugin、uglifyjs-webpack-plugin、optimization代替;
4、webpack 4 增加了一个 mode 配置，值可选有两个 development 和 production  (生产环境默认开启了很多代码优化(minify，splite 等));
5、使用webpack-dev-server来替代工程旧的热更新配置;
6、添加portfinder插件，在启动工程端口冲突时，自动分配一个可使用端口;
7、将监听localhost改为监听本地ip;
#升级结果，打包速度目前测试提升大约 80%~98%;测试环境打包体积由 19.4MB 减少至 7.59MB;


