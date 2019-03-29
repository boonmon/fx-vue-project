<template>
  <div class="main">
    <img class="banner-full-width" :src="titleBanner">
    <p class="p-title">金财互联，综合财税服务平台</p>
    <div class="cell-row">
      <div class="cell-item">
        <div class="cell-num">
          1998<span>年</span>
        </div>
        <div class="cell-desc">
          方欣科技成立
        </div>
      </div> 
      <div class="cell-item">
        <div class="cell-num">
          20<span>年</span>
        </div>
        <div class="cell-desc">
          财税行业积淀
        </div>
      </div>
      <div class="cell-item">
        <div class="cell-num">
          18<span>省</span>
        </div>
        <div class="cell-desc">
          业务覆盖
        </div>
      </div>
      <div class="cell-item">
        <div class="cell-num">
          1000<span>万</span>
        </div>
        <div class="cell-desc">
          服务企业近千万
        </div>
      </div>

    </div>

    <div class="btn-style" @click="toUrl(wxurl+'/wechat/#/about?wechatCode=WECHAT_CUS_MAIN')">
      <div>了解详情</div>
    </div>
    <div class="vedio-cell marginTop">
      <div class="cell-title">金财视频</div>
      <div class="cell-content vedio-cell-content">
        <mt-swipe :auto="ifautoPlay" :continuous="true" :defaultIndex="vedioDefaultIndex">
          <mt-swipe-item v-for="(vitem ,vindex) in vedios" :key="vindex" @click.native="showVedio(vindex)">
            <div class="v-cover">
              <img class="v-cover-img" :src="vitem.videoBannerImageUrl ?(cmsImgvUrl+vitem.videoBannerImageUrl) : defaultcover">
              <img class="v-cover-play-icon" :src="playicon">
            </div>
          </mt-swipe-item>
        </mt-swipe>
        <mt-popup
          v-model="vPopupVisible"
          position="top"
          v-if="vPopupVisible"
          :closeOnClickModal="false"
          style="width:100%;height:100%;background:rgba(0,0,0,0.7);">
          <div id="vedio-id">
            
          </div>
          <div class="closeVPop"><i class="icon iconfont icon-delete" @click="closeVedio"></i></div>
        </mt-popup>

      </div>
    </div>

    <div class="news-cell marginTop cellbgColor" v-if="news.length > 0">
      <div class="cell-title news-title">金财新闻 <div class="more-icon" @click="$router.push('/server/category')">更多 <i class="icon iconfont icon-gengduo"></i></div></div>
      <div class="cell-content">
        <div class="cell-news-item" v-for="(item,index) in news" :key="index"  @click="$router.push('/server/newscontent?contentId='+item.id+'&encode='+encode+'&categorycode'+categorycode)">
          <p>
            {{item.title || ''}}
          </p>
          <p>
            <i class="icon iconfont icon-redian"></i>
            <span class="news-type">{{item==0 ? '最新' :'热点'}}</span> 
            <span class="news-date">{{item.pubDate? toDate(item.pubDate):''}}</span>
          </p>
        </div>
      </div>
    </div>

    <div class="al-cell marginTop cellbgColor marginBottom">
      <div class="cell-title">客户案例</div>
      <div class="cell-content al-cell-content">
        <div class="al-item" v-for="(item,index) in alImgs" :key="index">
          <div class="al-img">
            <img :src="item.imgSrc"/>
            <div class="over-img">{{item.company}}</div>
          </div>
          <div class="al-desc">{{item.desc}}</div>
        </div>
      </div>
    </div>

    <div class="fixed-footer">
      <div class="footer-item checked" @click="$router.push('/server/about')">
        <i class="icon iconfont icon-shouye1"></i>
        <p>首页</p>
      </div>
      <div class="footer-item" @click="toUrl(wxurl+'/wechat/#/about?wechatCode=WECHAT_CUS_MAIN')">
        <i class="icon iconfont icon-jieshao"></i>
        <p>公司介绍</p>
      </div>
      <div class="footer-item" @click="$router.push('/server/category')">
        <i class="icon iconfont icon-zixun2"></i>
        <p>资讯</p>
      </div>
      <div class="footer-item" @click="$router.push('/server/vediolist')">
        <i class="icon iconfont icon-vedio"></i>
        <p>视频</p>
      </div>
      <div class="footer-item" @click="toUrl('https://mp.weixin.qq.com/s/u-__r4PJHGvkeHjM-vvmwA');">
        <i class="icon iconfont icon-anli"></i>
        <p>案例</p>
      </div>
    </div>

  </div>  
</template>
<script>
import { Swipe, SwipeItem,Popup } from 'mint-ui';
import { standardAsync } from "@/api/async";
import util from "@/utils/"; 
import titleBanner from '@/assets/img/server/title_banner.png';
import config from '@/api/config';
import playicon from '@/assets/img/server/play.png';
import defaultcover from '@/assets/img/server/fengmian_temp.jpg';

export default {
  data(){
    return{
      wxurl:config.wxUrl,
      cmsImgvUrl:config.cmsImgvUrl,
      playicon,
      defaultcover,
      encode: "904039",
      categorycode: "001114002001",
      filterCategoryCode:"101003001",
      titleBanner: titleBanner,
      news:[],
      vedios:[],
      vPopupVisible:false,
      ifautoPlay:4000,
      player:null,
      alImgs:[
        {company:'广州铭熙企业管理有限公司',imgSrc:require('@/assets/img/server/hsb.jpg'),desc:'金财互联是公司数字化转型的好伙伴'},
        {company:'惠州互联互通创客科技有限公司',imgSrc:require('@/assets/img/server/htck.png'),desc:'7个月增值业务收入240多万'},
        {company:'广东龙达财税服务有限公司',imgSrc:require('@/assets/img/server/ldcs.png'),desc:'客户从1500户增加为1万多户'},
        {company:'广东金账房智慧财税有限公司',imgSrc:require('@/assets/img/server/jzf.png'),desc:'优质用户增长3倍'},
        {company:'广州市正穗财税咨询有限公司',imgSrc:require('@/assets/img/server/zscs.png'),desc:'效率提升3倍的新财税之路'},
      ],
      vedioDefaultIndex:0,

    };
  
  },

  created() {

  },
  mounted() {
    //获取视频列表信息
    this.pageVideo();

    //获取资讯列表
    this.getFrontArticleList();
    
  },

  methods: {
    toDate: util.toDate,
    toUrl(url){
      window.location.href = url;
    },

    showVedio(vindex){
        this.vPopupVisible = true;
        this.vedioDefaultIndex = vindex;
        this.$nextTick(function(){
          this.setVedioList(vindex);
        })
      

    },
    closeVedio(){
      if(!!self.player){
          self.player.destroy();
      }
      this.vPopupVisible = false;
    },

    pageVideo(){
      let params = {
        "siteCode":this.encode,
        "filterCategoryCode":this.filterCategoryCode,
        "isRecommend":"",
        "pageIndex":1,
        "pageSize":4
      };

      standardAsync(this,'pageVideo',params,function(res){
        console.log(res)
        if(res.body){
            res.body.data ? this.vedios = res.body.data:[];
        }
        
      });

    },


    //设置视频列表  
    setVedioList(vindex){
        var self = this;
        if(!!self.player){
            self.player.destroy();
        }
        self.player = polyvObject('#vedio-id').videoPlayer({
          width: "100%",
          height: "100%",
          vid:self.vedios[vindex].videoId,//"5224501273c17406df0ed1bf2def9744_5",
          'autoplay': 1,
          volume: 0.7,
          df: 2,
          hideRepeat: true,
          forceH5: true,
        });
    
    },

    getFrontArticleList(){
      let params = {
        encode: "904039",
        categorycode: this.categorycode,
        pageindex: 1,
        pagesize: 2

      };

      standardAsync(this,'getFrontArticleList',params,function(res){
        if(res.body){
          this.news = res.body;
        }
      },'','');

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
     background: $mainbgColor;
  }
  .p-title{
    background: $cellbgColor; 
  }
  .banner-full-width{
      width:100%;
	    height: 4.347rem;
  }
  .p-title{
    text-align: center;
    font-size: 0.48rem;
    font-weight: bold;
    color: #1b1b1b;
    padding: .587rem 0 0.387rem;
  }

  .cell-row{
    display: flex;
    align-items: center;
    color: #1b1b1b;
    background: $cellbgColor;
    .cell-item{
      width: 25%;
      border-right: $borderStyle;
      div{
        text-align: center;
      }
      &:last-child{
        border: none;
      } 
      &:nth-child(3){
          width: 22%;
      }
      &:nth-child(4){
        width: 28%;
      }
    }
    
    .cell-num{
        font-size: 0.742rem;
        font-weight: bold;
        span{
          font-weight: normal;
          font-size: 0.293rem;
        }
    }
    .cell-desc{
      font-size: 0.293rem;
      color: $fontColor;
    }


  }

  .btn-style{
    width: 100%;
    background: $cellbgColor;
    padding: .56rem 0 .533rem;
    div{
      width: 2rem;
      height: 0.72rem;
      line-height: 0.72rem;
      font-size: 0.32rem;
      text-align: center;
      color: $mainColor;
      border-radius: 0.353rem;
      border: solid 0.013rem $mainColor;  
      margin: 0 auto;
      
    }
  }
  
  .vedio-cell{
    background: $cellbgColor;
    .vedio-cell-content{
      width: 100%;
      height: 4.747rem;
      background-color: #fff;  
      padding:0  0.4rem .4rem;  
    }
  
  .v-cover{
      width:100%;
      position: relative;
       height: 100%;
      .v-cover-img{
        width: 100%;
        height: 100%;
      }

      .v-cover-play-icon{
        position: absolute;
        width: 1.067rem;
	      height: 1.067rem;
        left: 50%;
        top:50%;
        margin-left: -0.5335rem;
        margin-top: -0.5335rem;
      }
      
      &::after{
          content: "";
          display: inline-block;
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          background: rgba(0,0,0,.1);
        }


    }

    


  }

  #vedio-id{
    height: 4.347rem;
    width: 100%;
    margin-top: 40%;
  }

  .closeVPop{
    color:#aaa;
    width: 100%;
    text-align: center;
    padding-top: 2rem;
   i{
     font-size: .7rem;
   }

  }

  .cell-title{
    position: relative;
    font-size: 0.48rem;
    color: #1b1b1b;
    padding: .387rem 0 0.267rem 0.653rem;
    &:before{
      position: absolute;
      content: '';
      left:0.4rem;
      top: .53rem;
      display: inline-block;
      width: 0.107rem;
      height: 0.44rem;
      background-color: $mainColor;
      border-radius: 0.04rem;
    }
  }

  .cell-title.news-title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .more-icon{
      font-size: 0.32rem;
      color: #999999;
      padding-right: 0.387rem;
      i{
        font-size: .24rem;
      }
    }  
  }

  .icon-redian{
    color:$mainColor; 
    margin-right: .187rem;
  }
  .news-type{
    color:$mainColor;
    font-size: 0.293rem;
  }
  .news-date{
    margin-left: .227rem;
    width: 2.093rem;
    font-size: 0.293rem;
    color: #9e9e9e;
  }

  .cell-news-item{
    padding:0.4rem;
    border-top: $borderStyle;
    p:first-child{
      font-weight:bold ;
      font-size: 0.4rem;
      line-height: .6rem;
      height: 1.2rem;
      color: $fontColor;
      padding-bottom: .2rem;
      word-break:break-all;
      display:-webkit-box;
      -webkit-line-clamp:2;
      -webkit-box-orient:vertical;
      overflow:hidden;
    }
  
  }

  .al-cell{
    padding-bottom: 0.373rem;
    .al-cell-content{
      display: flex;
      flex-flow: row nowrap;
      overflow-x: auto;
      margin: 0 0.4rem;
      &::-webkit-scrollbar{
        display: none;
      }  
    }
    .al-item{
      width: 4rem;
      margin-right:0.4rem;
      
    }
    .al-img{
      position: relative;
      .over-img{
        position: absolute;
        width: 3.067rem;
        left: 0;
        bottom: 0.52rem;
        padding:0.187rem 0.124rem 0.187rem 0.133rem;
        background: $cellbgColor;
        font-size: 0.32rem;
        color: $fontColor;

      }
      
    }
    .al-img,img{
      width: 3.947rem;
	    height: 5.187rem;
    }
    .al-desc{
      padding-top: 0.307rem;
      font-size: 0.32rem;
      color: #1b1b1b;
      word-break:break-all;
      display:-webkit-box;
      -webkit-line-clamp:2;
      -webkit-box-orient:vertical;
      overflow:hidden;
    }
 
  }

  .fixed-footer{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      background: $cellbgColor;
      padding: 0.253rem 0;
      .footer-item{
        color: #d1d1d1;
        text-align: center;
        p{
          font-size: 0.24rem;
          color: #999999;
        }
      }

      .footer-item.checked,  .footer-item:active{
          color:$mainColor;
          p{
            color: $mainColor;
          }
      }

    }


</style>


