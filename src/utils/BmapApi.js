import { Message } from 'element-ui'
let bController = {};
/**
 * 百度地图api
 * 外部不允许使用BMap.* 等方法
 */
export default {

    /**
     * 新建百度地图
     * @param  {[type]} dom 容器
     * @param  {[boolean]} isOpenGeolocation 是否开启定位插件
     * @return {[type]}     百度地图对象
     */
    buildBMap: function(dom, isOpenGeolocation) {
        let map = new BMap.Map(dom); // 创建Map实例
        map.centerAndZoom(new BMap.Point(116.404, 39.915), 15); // 初始化地图,设置中心点坐标和地图级别
        map.addControl(new BMap.MapTypeControl({ //添加地图类型控件
            mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
        }));
        map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
        // 添加定位控件
        if (isOpenGeolocation) {
            var geolocationControl = new BMap.GeolocationControl();
            map.addControl(geolocationControl);
        }
        return map;
    },
    /**
     * 添加控件
     * @param {[type]} map [description]
     */
    addController:function(map){
            let top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT});// 左上角，添加比例尺
            let top_left_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT});  //左上角，添加默认缩放平移控件
            map.addControl(top_left_control);        
            map.addControl(top_left_navigation);     
     },
    /**
     * 获取当前位置
     * @param  {[type]} map 地图对象
     * @return {[type]}     [description]
     */
    getCurrentLocation: function(map) {
        let _this = this;
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                let mk = new BMap.Marker(r.point);
                mk.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
                mk.disableMassClear(); //禁止清除
                map.addOverlay(mk);
                var opts = {
                    width: 200, // 信息窗口宽度
                    height: 10, // 信息窗口高度
                    title: "我在这里", // 信息窗口标题
                }
                _this.getPointLocation(r.point.lng, r.point.lat)
                    .then((address) => {
                        var infoWindow = new BMap.InfoWindow(address, opts); // 创建信息窗口对象 
                        mk.addEventListener("click", function() {
                            map.openInfoWindow(infoWindow, r.point); //开启信息窗口
                        });
                        map.openInfoWindow(infoWindow, r.point); //开启信息窗口
                    });
                map.panTo(r.point); //移动到对应的点
            } else {
                Message.error('定位错误->' + this.getStatus());
            }
        }, {
            enableHighAccuracy: true
        })
    },
    /**
     * 添加一个点
     * @param {[type]} map  地图对象
     * @param {[type]} lng  纬度
     * @param {[type]} lat  经度
     * @param {[type]} icon 图片url
     */
    addMapPoint: function(map, lng, lat, icon) {
        this.pointTranslate(lng, lat).then((point) => {
            var mk;
            if (icon) {
                mk = new BMap.Marker(point, {
                    icon: new BMap.Icon(icon.url, new BMap.Size(icon.x || 40 , icon.y || 40))
                });
            } else {
                mk = new BMap.Marker(point);
            }
            map.addOverlay(mk);
        });

    },
    /**
     * 移动到对应的点
     * @param  {[type]} map 百度地图对象
     * @param  {[type]} lng 纬度
     * @param  {[type]} lat 经度
     * @return {[type]}     [description]
     */
    moveToPoint: function(map, lng, lat) {
        this.pointTranslate(lng, lat).then((point) => {
            map.panTo(point);
        })
    },
    /**
     * 获取点的地址
     * @param  {[type]} lng 纬度
     * @param  {[type]} lat 经度
     * 使用方法 getPointLocation(lng,lat).then((address)=>{});
     */
    getPointLocation: function(lng, lat) {
        var geoc = new BMap.Geocoder();
        var point = new BMap.Point(lng, lat);
        return new Promise((resolve) => {
            geoc.getLocation(point, res => {
                resolve(res.address);
            });
        })

    },
    /**
     * 移除地图所有的点
     * @param  {[type]} map [description]
     * @return {[type]}     [description]
     */
    removeAllPoint: function(map) {
        //var allOverlay = map.getOverlays();
        map.clearOverlays();
    },

    /**
     * [pointTranslate description] 坐标地址转换
     * @param  {[type]} lng [description]
     * @param  {[type]} lat [description]
     * @return {[type]}     [description]
     */
    pointTranslate: function(lng, lat) {
        var convertor = new BMap.Convertor();
        var pointArr = [];
        var point = new BMap.Point(lng, lat);
        pointArr.push(point);
        return new Promise((resolve) => {
            /*convertor.translate(pointArr, 1, 5, (data) => {
                if (data.status === 0) {
                   // console.log(data.points[0])
                    resolve(data.points[0]);
                } else {
                    console.error('坐标转换失败')
                }
            })*/
             resolve(point);
        });
    },
    /**
     * 划线
     * @param  {[type]} map    百度地图对象
     * @param  {[type]} points 点集=》"116.399,39.910;116.405,39.920;116.425,39.900"
     * @param  {[type]} color  颜色(可为空)
     * @param  {[type]} weight 粗细(可为空)
     * @param  {[type]} opcity 透明度(可为空)
     * @return {[type]}        [description]
     */
    drawLine: function(map, points, color, weight, opcity) {
        var polyline = new BMap.Polyline(points, {
            strokeColor: color || "red",
            strokeWeight: weight || 6,
            strokeOpacity: opcity || 0.8
        });
        map.addOverlay(polyline);
    }

}
