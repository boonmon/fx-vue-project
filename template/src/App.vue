<template>
    <div id="app">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<script>
import VConsole from "vconsole";

export default {
    name: "app",
    data() {
        return {
            
        };
    },
    created() {},

    mounted() {

    },

    methods: {
       
    },
    beforeDestroy() {
    },
    watch: {
       
    }
};
</script>

<style>

* {
    outline: none;
    -webkit-tap-highlight-color: transparent; 
}

#app {
    /* 腾讯移动端字体方案 https://github.com/AlloyTeam/Mars/blob/master/solutions/font-family.md */
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC",
        "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
    width: 100%;
    background-color: #f9f9f9;
}

@import url("//at.alicdn.com/t/font_1006486_7hc1bk516q5.css");
</style>
