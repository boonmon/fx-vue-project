<template>
  <div class="main">
    <img class="banner-full-width" :src="defaultImg">

    <mt-loadmore :bottom-method="getFrontArticleList" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="false">
        <div class="info-list">
          <div class="info-item" v-for="(item ,index) in news" :key="index" @click="$router.push('/server/newscontent?contentId='+item.id+'&encode='+encode+'&categorycode'+categorycode)">
            <div class="info-item-left">
              <p>{{item.title || ''}}</p>
              <p>{{item.pubDate? toDate(item.pubDate):''}}</p>
            </div>
            <div class="info-item-right">
              <img :src="item.picture ? (cmsImgvUrl +item.picture):defaultImg">
            </div>
          </div>
        </div>
    </mt-loadmore>

  </div>  
</template>
<script>
import { standardAsync } from "@/api/async";
import { Loadmore } from 'mint-ui';
import util from "@/utils/";
import titleBanner from '@/assets/img/server/zixun_banner.png';
import config from '@/api/config';
export default {
  data(){
    return{
      encode:'904039',
      categorycode:'001114002001',
      news:[],
      defaultImg:titleBanner,
      cmsImgvUrl:config.cmsImgvUrl,

      allLoaded:false,//上拉加载参数
      pageindex:1,
      pagesize:10,

    };  
  },

  created() {
    console.log(config.cmsImgvUrl);
  },
  mounted() {
    //获取资讯列表
    this.getFrontArticleList();
    
  },
  methods: {

    toDate: util.toDate,

    getFrontArticleList(){
      let params = {
        encode: this.encode,
        categorycode: this.categorycode,
        pageindex: this.pageindex,
        pagesize: this.pagesize,
      };
      standardAsync(this,'getFrontArticleList',params,function(res){
          if(res.body){
            if(res.body.length > 0){
              this.news = this.news.concat(res.body);
              this.$refs.loadmore.onBottomLoaded();
              this.pageindex++;
              if(res.body.length < this.pagesize){
                  this.allLoaded = true;
              }
            }
          }else{
             this.allLoaded = true;
          }
      },'','');
    },
    
    

  },


}
</script>
<style scoped lang="scss">
  $background: #fff; 
  .banner-full-width{
      width:100%;
	    height: 4.347rem;
  }

  .info-list{
    padding: 0 .4rem;
    background: $background;
  }
  .info-item{
    width: 100%;
    padding:0.4rem 0;
    display: flex;
    border-bottom: .013rem solid #eee;
    align-items: center;
    .info-item-left{
      padding-right: 0.507rem;
      p{
        margin: 0;
        padding: 0;
        font-size: 0.32rem;
        color: #9e9e9e;
        &:first-child{
          font-size: 0.427rem;
          color: #1b1b1b;
          word-break:break-all;
          display:-webkit-box;
          -webkit-line-clamp:2;
          -webkit-box-orient:vertical;
          overflow:hidden;
          margin-bottom: 0.253rem;
        }

      }
    }

    .info-item-right{
      img{
        width: 1.913rem;
	      height: 1.487rem;
      }
    }
  }

</style>


