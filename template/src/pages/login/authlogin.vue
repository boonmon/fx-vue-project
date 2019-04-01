<template>
    <div>

    </div>
</template>
<style>

</style>
<script>
    import api from '../../api/';
    import localStorageUtil from '@/utils/localStorageUtil'
    export default{
        data(){
            return {
                msg: 'hello vue'
            }
        },
        created() {

         /*   let redirecturl= api.getQueryString('redirecturl');
            console.info("api.getQueryString('redirecturl')sss="+redirecturl);
            if (!redirecturl) {
                redirecturl = this.$route.query.redirecturl;
                console.info("this.$route.query.redirecturl="+redirecturl);
            }*/

            let redirecturl = this.$route.query.redirecturl+this.$route.hash;

             console.info("redirecturl="+redirecturl);
            window.location.href= decodeURI(redirecturl)+"&wxtoken="+localStorageUtil.getItem(localStorageUtil.WX_USER_TOKEN);

        }
    }
</script>
