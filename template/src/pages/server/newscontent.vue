<template>
  <div class="main">
    <div class="title">{{news.title ||''}}</div>
    <div class="source">
      <span>来源：{{news.source || ''}}</span>
      <span class="date-time">{{news.createTime ? toDate(news.createTime):''}}</span>
    </div>
    <div class="content" v-html="news.content || ''"></div>

    <div class="nc-fujian">
        <div v-for="(fj,index) in (news?news.filePath:[])" :key="index">
            <ul>
                <li @click="nav(cmsImgvUrl + fj.path)">
                    {{fj.name}}.{{fj.path.substr(fj.path.lastIndexOf('.') + 1)}}</li>
            </ul>
        </div>
    </div>
    
  </div>  
</template>
<script>
import { standardAsync } from "@/api/async";
import util from "@/utils/";
import config from '@/api/config';
export default {
  data(){
    return{
      msImgvUrl : config.cmsImgvUr,
      contentId:this.$route.query.contentId ? this.$route.query.contentId :'',
      news:{},

    };  
  },

  created() {

  },

  mounted() {
    this.getContent();
    
  },
  methods: {
      toDate: util.toDate,
      getContent() {
        let contentId = this.contentId;
        // 根据文章id直接获取内容详情
        if (this.contentId!='') {
            standardAsync(this, 'getEcmContent', { contentId }, res => {
                this.news = res.body
                this.resizeImg();
                // 更新点击量
                standardAsync(this, 'updateClikcNum', { contentId }, res => { })
            })
        }
        // 根据站点编码和栏目编码直接获取内容详情
        else {
            let param = {
                encode: this.$route.query.encode,
                categorycode: this.$route.query.categorycode,
            }
            standardAsync(this, 'getDirectEcmContent', param, res => {
                this.news = res.body
                this.resizeImg();
                standardAsync(this, 'updateClikcNum', { contentId: res.body.id }, res => { })
            })
        }
    },

    resizeImg() {
        this.$nextTick(() => {
            let imgs = document.querySelectorAll('img')
            imgs.forEach(item => {
                let ow = item.width
                let oh = item.height
                item.style.width = '100%'
                // 保持宽高比
                item.style.height = Math.ceil(item.width * oh / ow) + 'px'
            })
        })
    },

    nav(url){
      if (url && url.length > 0) {
          if (url.indexOf('http') > -1) {
              location.href = url
          } else {
              this.$router.push({ path: url })
          }
      }
    },


    

  },


}
</script>
<style scoped lang="scss">
 .main{
    background: #fff;
    padding: 20px 16px;
    padding-bottom: 30%;
  }

  .title {
      font-size: 22px;
      line-height: 1.4;
      font-weight: bold;
      text-align: left;
      margin-bottom: 14px;
  }

 .source {
        background-color: #f5f5f5;
        padding: 16px;
        margin: 32px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

  .source>span {
      font-size: 0.35rem;
      color: #999999;
  }


  .nc-fujian li {
      margin-top: 6px;
      font-size: 12px;
      color: rgb(0, 0, 255);
  }

</style>


