<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
import VConsole from "vconsole";

export default {
    name: "app",

    created() {
        // 添加VConsole调试按钮
        try {
            if (
                process.env.CUR_ENV === "development" ||
                process.env.CUR_ENV === "test"
            ) {
                new VConsole();
            }
        } catch (error) {}
    },

    mounted() {
        document.getElementById("app").style.height = window.innerHeight + "px";
        window.addEventListener("resize", this.appResize, false);
    },

    methods: {
        appResize() {
            document.getElementById("app").style.height =
                window.innerHeight + "px";
        }
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.appResize, false);
    }
};
</script>

<style>
    #app {
        /* 腾讯移动端字体方案 https://github.com/AlloyTeam/Mars/blob/master/solutions/font-family.md */
        font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Helvetica Neue', STHeiti, 'Microsoft Yahei', Tahoma, Simsun, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: #f2f2f2;
    }

    html,
    body,
    #app {
        height: 100%;
        width: 100%;
        overflow-x: hidden;

    }

    * {
        outline: 0;
        -webkit-text-size-adjust: none;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
    }

</style>
