<template>
    <div class="lb-template">
        <div class="top-tab" v-if="lbTemplateConfig && lbTemplateConfig.length > 0">
            <mt-navbar v-model="lbTemplateConfig[0].selected">
                <mt-tab-item
                    v-for="item in lbTemplateConfig"
                    :key="item.id"
                    :id="item.id"
                >{{item.title}}</mt-tab-item>
            </mt-navbar>
            <!-- tab-container -->
            <mt-tab-container v-model="lbTemplateConfig[0].selected">
                <mt-tab-container-item
                    v-for="(item,index) in lbTemplateConfig"
                    :key="item.id"
                    :id="item.id"
                    @touchstart.native.stop="tabMoveStart"
                    @touchmove.native.stop="tabMoving"
                    @touchend.native.stop="tabMoveEnd($event,lbTemplateConfig,index)"
                >
                    <div class="content-wrapper" :key="ct.title" v-for="ct in item.content">
                        <div v-if="ct.showNavbar">
                            <div class="tab">
                                <div class="lb-nav-title">{{ct.title}}</div>
                                <mt-navbar v-model="ct[item.id][0].selected">
                                    <mt-tab-item
                                        @touchstart.native.stop="()=>{}"
                                        @touchmove.native.stop="()=>{}"
                                        @touchend.native.stop="()=>{}"
                                        @mousedown.native.stop="()=>{}"
                                        @mouseup.native.stop="()=>{}"
                                        v-for="tab in ct[item.id]"
                                        :key="tab.id"
                                        :id="tab.id"
                                    >{{tab.title}}</mt-tab-item>
                                </mt-navbar>

                                <!-- tab-container -->
                                <mt-tab-container
                                    v-if="lbTemplateConfig[0].selected == item.id"
                                    v-model="ct[item.id][0].selected"
                                    @touchstart.native.stop="()=>{}"
                                    @touchmove.native.stop="()=>{}"
                                    @touchend.native.stop="()=>{}"
                                    @mousedown.native.stop="()=>{}"
                                    @mouseup.native.stop="()=>{}"
                                    swipeable
                                >
                                    <mt-tab-container-item
                                        v-for="tab in ct[item.id]"
                                        :key="tab.title"
                                        :id="tab.id"
                                    >
                                        <div>
                                            <img
                                                v-for="iu in tab.imgUrlList"
                                                :key="iu"
                                                :src="iu"
                                                alt
                                                srcset
                                            >
                                        </div>
                                    </mt-tab-container-item>
                                </mt-tab-container>
                            </div>
                        </div>
                        <div v-else>
                            <img v-for="iu in ct.imgUrlList" :key="iu" :src="iu" alt srcset>
                        </div>
                    </div>
                    <div v-if="item.showButton">
                        <div class="lb-template-button">
                            <div class="lb-template-button-wrapper">
                                <button class="no-open" v-if="!isOpen(item)">
                                    <span>敬请期待</span>
                                    {{getOpenDate(item)}}正式上线
                                </button>
                                <button
                                    v-else
                                    @click="buttonEvents(item)"
                                >{{item.buttonInfo?item.buttonInfo.name : '立即订购'}}</button>
                            </div>
                        </div>
                        <mt-popup v-model="item.showDialog" popup-transition="popup-fade">
                            <order-dialog
                                @submit="submit(item)"
                                :purchaseParams="item.purchaseParams"
                            ></order-dialog>
                        </mt-popup>
                    </div>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
    </div>
</template>

<script>
import { Navbar, TabItem } from "mint-ui";
import orderDialog from "@/components/orderDialog";
import nav from "@/router/nav";
export default {
    props: {
        lbTemplateConfig: Array
    },
    components: {
        orderDialog
    },
    data() {
        return {
            showDialog: false,
            cI: 0
        };
    },
    watch: {
        tabNav(val) {
            this.$nextTick(() => {
                this.swipeTtrace();
            });
        }
    },
    computed: {
        tabNav() {
            let length = this.lbTemplateConfig.length;
            for (let i = 0; i < length; i++) {
                let item = this.lbTemplateConfig[i].content;
                let _length = item.length;
                for (let j = 0; j < _length; j++) {
                    if (item[j][this.lbTemplateConfig[0].selected]) {
                        this.cI = i;
                        return item[j][this.lbTemplateConfig[0].selected][0]
                            .selected;
                    }
                }
            }
        }
    },
    created() {},
    mounted() {},
    methods: {
        submit(item) {
            item.showDialog = false;
        },
        tabMoveStart(e) {
            let touch = e.touches[0]; //获取第一个触点
            let x = Number(touch.pageX); //页面触点X坐标
            //记录触点初始位置
            this.startX = x;
        },
        tabMoving(e) {},
        tabMoveEnd(e, arr, index) {
            let touch = e.changedTouches[0]; //获取第一个触点
            let x = Number(touch.pageX); //页面触点X坐标
            //记录触点初始位置
            this.endX = x;

            if (this.startX - this.endX > 70) {
                if (index !== arr.length - 1) {
                    arr[0].selected = arr[index + 1].id;
                }
            } else if (this.endX - this.startX > 70) {
                if (index !== 0) {
                    arr[0].selected = arr[index - 1].id;
                }
            }
        },
        buttonEvents(item) {
            let year = new Date().toLocaleDateString().split("/")[0];
            let date = parseInt(
                new Date()
                    .toLocaleDateString()
                    .replace(/\//g, "")
                    .replace(year.toString(), "")
            );
            console.log("date", parseInt(date));
            if (item.buttonInfo && item.buttonInfo.url) {
                if (item.buttonInfo.openTime) {
                    let openYear = parseInt(
                        item.buttonInfo.openTime.split("/")[0]
                    );
                    if (openYear < year) {
                        return true;
                    }
                    let openTime = parseInt(
                        item.buttonInfo.openTime
                            .replace(/\//g, "")
                            .replace(openYear.toString(), "")
                    );
                    if (openTime <= date) {
                        nav(item.buttonInfo.url);
                    } else {
                    }
                } else {
                    nav(item.buttonInfo.url);
                }
            } else {
                item.showDialog = true;
            }
        },
        swipeTtrace() {
            var tabItem = document.querySelectorAll(".mint-tab-item");
            var tab = document.querySelectorAll(".mint-navbar");
            var sWidth = window.screen.width;
            let currentTab = document.querySelectorAll(".tab")[this.cI];
            let isSelect = currentTab.querySelector(".is-selected");
            var left = isSelect.getBoundingClientRect().left;
            var right = isSelect.getBoundingClientRect().right;
            var tabItemW = isSelect.offsetWidth;
            var lw = left + tabItemW - 1;
            var jl = left + tabItemW - sWidth + 50;
            var attr = currentTab.querySelector(".mint-navbar");
            if (lw >= sWidth) {
                attr.scrollLeft += jl;
            }
            if (left < 0) {
                attr.scrollLeft -= tabItemW;
            }
        },
        isOpen(item) {
            let year = new Date().toLocaleDateString().split("/")[0];
            let date = parseInt(
                new Date()
                    .toLocaleDateString()
                    .replace(/\//g, "")
                    .replace(year.toString(), "")
            );
            if (!item.buttonInfo) {
                return true;
            }
            if (item.buttonInfo.openTime) {
                let openYear = item.buttonInfo.openTime.split("/")[0];
                if (openYear < year) {
                    return true;
                }
                let openTime = parseInt(
                    item.buttonInfo.openTime
                        .replace(/\//g, "")
                        .replace(openYear.toString(), "")
                );
                if (openTime <= date) {
                } else {
                    return false;
                }
            }
            return true;
        },
        getOpenDate(item) {
            item.buttonInfo.openTime.replace("/", "年").replace("/", "月");
            let l = item.buttonInfo.openTime.split("/");
            let y = parseInt(l[0]);
            let m = parseInt(l[1]);
            let d = parseInt(l[2]);
            return y + "年" + m + "月" + d + "日";
        }
    }
};
</script>

<style scoped>
.mint-tab-container {
    overflow: auto;
}
.mint-popup {
    background: none;
}
.top-tab >>> .mint-navbar {
    background-color: #fff;
}
.top-tab >>> .mint-navbar .mint-tab-item {
    padding: 0.43rem 0;
}
.top-tab >>> .mint-tab-item-label {
    font-size: 0.37rem;
    color: #222222;
}
.top-tab >>> .is-selected .mint-tab-item-label {
    color: #ff7800;
}
.top-tab >>> .mint-navbar .mint-tab-item.is-selected {
    border-bottom: 0;
}
.tab >>> .mint-navbar {
    border-bottom: 0.0173rem solid #d0d0d0;
    display: flex;
    overflow-x: auto;
}
.tab >>> .mint-navbar::-webkit-scrollbar {
    display: none;
}

.tab >>> .mint-navbar .mint-tab-item {
    padding: 0.43rem 0.4rem;
    white-space: nowrap;
}
.tab >>> .mint-navbar .mint-tab-item {
    color: #666666;
}
.tab >>> .mint-navbar .mint-tab-item.is-selected {
    border-bottom: 0.05rem solid #ff6d00;
    margin-bottom: 0px;
    color: #ff6d00;
}

.lb-template img {
    width: 100%;
    height: auto;
}
.lb-template .content-wrapper {
    margin-bottom: 0.266667rem /* 20/75 */;
}
.lb-template .mint-tab-container-item .content-wrapper:last-of-type {
    margin-bottom: 0;
}

.lb-template-button {
    height: 1.6rem /* 120/75 */;
}

.lb-template-button button {
    width: 100%;
    height: 100%;
    background-color: #ff6d00;
    color: #fff;
    font-size: 0.48rem /* 36/75 */;
    border: 0;
    border-radius: 0.533333rem /* 40/75 */;
}

.tab {
    background: #fff;
}

.lb-nav-title {
    text-align: center;
    padding-top: 0.533333rem /* 40/75 */;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #000;
    font-size: 0.466667rem /* 35/75 */;
}

.lb-template-button-wrapper {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #fff;
    border-top: 1px solid #f2f2f2;
    padding: 0.266667rem /* 20/75 */;
    height: 1.6rem /* 120/75 */;
}
.lb-template-button-wrapper .no-open {
    font-size: 0.32rem /* 24/75 */;
    background-color: #dfdfdf;
    color: #242424;
}

.lb-template-button-wrapper .no-open span {
    font-size: 0.426667rem /* 32/75 */;
}
</style>
