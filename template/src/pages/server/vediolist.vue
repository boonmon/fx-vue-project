<template>
  <div class="main">
    <mt-loadmore :bottom-method="pageVideo" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="false">
        <div class="v-list">
          <div class="v-item" :class="index==0 ? 'v-banner':''" v-for="(item ,index) in vedios" :key="index">
            <div :id="'vedio-'+index">

            </div>
            <p>{{item.title}}</p>
          </div>
        </div>
    </mt-loadmore>
  </div>  
</template>
<script>
import { standardAsync } from "@/api/async";
import util from "@/utils/"; 
import { Loadmore } from 'mint-ui';
export default {
  data(){
    return{
      encode: "904039",
      filterCategoryCode:"101003001",
      vedios:[],
      vedioDefaultIndex:0,

      allLoaded:false,//上拉加载参数
      pageindex:1,
      pagesize:5,
      


    };
  
  },

  created() {

  },
  mounted() {
    //获取视频列表信息
    this.pageVideo();
    
  },
  methods: {
    toDate: util.toDate,
    pageVideo(){
      let params = {
        "siteCode":this.encode,
        "filterCategoryCode":this.filterCategoryCode,
        "isRecommend":"",
        "pageIndex":this.pageindex,
        "pageSize":this.pagesize
      };

      standardAsync(this,'pageVideo',params,function(res){
        if(res.body){
            let start = this.vedios.length;
            this.vedios = this.vedios.concat(res.body.data);
            
            this.$nextTick(function(){
              this.setVedioList(start);
            });

            this.$refs.loadmore.onBottomLoaded();

            if(res.body.data.length < this.pagesize){
              this.allLoaded = true;
            }
            
        }
        
      });

    },


    //设置视频列表  
    setVedioList(start){
      console.log("start = ",start)
      var self = this;
      this.vedios.map(function(value,index,arr){
        if(index > start-1){
            let player = polyvObject('#vedio-'+index).videoPlayer({
            width: "100%",
            height: "100%",
            vid: self.vedios[index].videoId,//"5224501273c17406df0ed1bf2def9744_5",//
            volume: 0.7,
            df: 2,
            hideRepeat: true,
            forceH5: true
          });
        }
      });
      this.pageindex++;
    
    },
    
  },


}
</script>
<style scoped lang="scss"> 
  $mainbgColor:#efeff4;
  $cellbgColor:#fff;
  $borderStyle: .013rem solid #dddddd;
  $mainColor:#ff6d00;
  $fontColor:#5a5a5a;
  
  .cellbgColor{
    background: $cellbgColor;
  }
  .main{
    width: 100%;
    overflow-x: hidden;//防止元素过宽横向超屏幕
  }
  .marginTop{
    margin-top: .267rem;
  }
  .marginBottom{
    // margin-bottom:  0.293rem;
    margin-bottom:  2rem;
  }
  .main{
     background: $cellbgColor;
  }

  p{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }



  .v-list{
    display: flex;
    width: 100%;
    justify-content: space-between;
    flex-wrap: wrap;
    .v-item{
      width: 4.96rem;
      margin-bottom: .387rem;
       div{
          width: 4.96rem;
          height: 2.8rem;
          background-color: #eee;
       }
       p{
          font-size: 0.373rem;
          color: #1b1b1b;
          padding-left: .4rem;
          padding-top: 0.267rem;
          font-weight: bold;
       }    
    }
  }

  .v-list .v-item.v-banner{
    width: 100%;
    div{
      width: 100%;
      height: 5.587rem;
    }
    p{
      font-size: 0.427rem;
      color: #1b1b1b;
      font-weight: bold;
    }

  }



</style>


