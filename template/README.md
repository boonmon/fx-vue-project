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

#新改动
接口实例封装改动，完整的实例如下所示：
example: {
        //method不传则默认为post
        method: 'post',
        //gateway定义网关名称,只用于baseURL,不传默认过gateway(在api/config中可改默认值),传空不过网关
        gateway: 'mgateway',
        uri: '/wechat/thirdparty/ocsp/getWechatWebJs',//接口地址
        develop: '-lzw',//本地开发时调用本地服务,不传则默认为normal
        appId: '',//可根据接口需要定义你的appId，不传则默认为全局appId
        config: {
            // 对 data 进行任意转换处理,不传默认对data的处理为 JSON.stringify(data)
            transformRequest: [function (data, headers) {
                //此处展示使用Qs.stringify()将对象 序列化成URL的形式，以&进行拼接
                return config.paramsSerializer(JSON.parse(data));
            }],
        }, //axios配置项，会更改api/config中的通用axios配置项已有的项，不传默认为{}
        defaultData: {
            token: '1',
            userId: '1'
        },//默认传参,
        notShowLoading: true,//是否显示loading层，在此定义这该接口在所有地方都不展示loading层，一般只是某个页面需要只需在写请求函数时单独配置; 
        cache: false, //是否做数据缓存，不传默认为false,等于true则将接口返回数据保存至sessionstory，下次请求时则自动读取缓存中的数据
        cacheName: 'vuetemp.example',//自定义缓存名称，最好要传，不传则为当前环境名称加该接口名称，例dev.example 
        //可创建自定义axios实例,用于需要特殊定制实例的请求接口,一般只需定义baseURL,headers,timeout
        instance: {
            //此处展示了大部分实例配置项，若不满足详情可见http://www.axios-js.com/zh-cn/docs/
            baseURL: '',//接口域名
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },//请求头信息
            timeout: 20000,//请求超时设置
            responseType: 'json',//回复类型
            // `transformRequest` 允许在向服务器发送前，修改请求数据
            // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
            // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
            transformRequest: [function (data, headers) {
                // 对 data 进行任意转换处理
                return data;
            }],
            // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
            transformResponse: [function (data) {
                // 对 data 进行任意转换处理
                return data;
            }],
            // `params` 是即将与请求一起发送的 URL 参数
            // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
            params: {
                ID: 12345
            },
            // `paramsSerializer` 是一个负责 `params` 序列化的函数
            // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
            paramsSerializer: function (params) {
                return Qs.stringify(params, { arrayFormat: 'brackets' })
            },
            // `withCredentials` 表示跨域请求时是否需要使用凭证
            withCredentials: false, // 不传默认为false
        }
    }

