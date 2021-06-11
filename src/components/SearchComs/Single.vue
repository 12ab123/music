<template>
  <div id="singerContainer">
    <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    >
      <div class="singerList">
        <SongItem :searchData="singerInfo"/>
      </div>
    </van-list>
  </div>
</template>

<script>
  import { reqSearchData } from '@/api'
  import SongItem from './SongItem'
  export default {
    data () {
      return {
        singerInfo: [],
        loading: true,
        finished: false,
        offset: 0
      }
    },

    components: {
      SongItem
    },

    
    mounted () {
      this.getSingleInfo()
    },

    methods: {
      async getSingleInfo () {
        let result = await reqSearchData({
          keywords: this.$route.params.keywords,
          type: 1,
          offset: this.offset,
          limit : 15
        })
        this.singerInfo.push(...result.result.songs) 
        this.finished = !result.result.hasMore
        this.loading = false
        this.offset++
      },

      onLoad () {
        this.getSingleInfo()
      }
    }


  }
</script>

<style lang="less" scoped>
  #singerContainer{
    
    margin-top: 20px;
    .singerList{
      border-radius: 10px;
      overflow: hidden;
    }
    
  }
</style>