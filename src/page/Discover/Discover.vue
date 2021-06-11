<template>
  <div id="discover">
      <HeaderBar>
        <template v-slot:content>
          <div class="input" @click="$router.push('/search')"></div>
        </template>
        <template v-slot:right>
          <div class="right iconfont icon-microphone"></div>
        </template>
      </HeaderBar>
      <div class="discoverContainer">
          <Swiper/>
          <RoundIcon/>
          <RecommendPlayList/>
          <RecommendMv/>
      </div>
      <div class="footer"></div>

  </div>
</template>

<script>
  import HeaderBar from '@/components/HeaderBar/HeaderBar.vue'
  import Swiper from '@/components/DiscoverComs/DisSwiper/DisSwiper.vue'
  import RoundIcon from '@/components/DiscoverComs/RoundIcon/RoundIcon.vue'
  import RecommendPlayList from '@/components/DiscoverComs/RecommendPlaylist/RecommendPlaylist'
  import RecommendMv from '@/components/DiscoverComs/RecommendMv/RecommendMv'
  export default {
    components: {
      HeaderBar,
      Swiper,
      RoundIcon,
      RecommendPlayList,
      RecommendMv
    }
  }
</script>

<style lang="less" scoped>

    .discoverContainer{
      margin-top: 60px;
    }
    .footer{
      height: 100px;
      width: 100%;
    }
</style>