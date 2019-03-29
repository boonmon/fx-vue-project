 import config from './config'
 global._maq = [];
 (function () { // (function(){})是一个闭包的用法，闭包必定会被调用。
   var ga = document.createElement('script');
   ga.type = 'text/javascript';
   ga.charset = 'utf-8';
   ga.async = true // ga.async = true 异步调用外部js文件，即不阻塞浏览器的解析
   ga.src = config.trackUrl + '?sc=JCDZ_WX&time=' + Date.parse(new Date());
   console.log('打印埋点环境' + ga.src);
   var s = document.getElementsByTagName('script')[0];// 取得第一个tag名为script的元素
   s.parentNode.insertBefore(ga, s);// 在s前添加元素ga
 })()
