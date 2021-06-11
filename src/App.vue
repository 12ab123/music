<template>
  <div id="app">
      <transition :name="toSearchTransitionType">
        <keep-alive>
          <router-view :key="$route.params.id"></router-view>
        </keep-alive>
      </transition>
      <Player v-show="$route.path !== '/login'"/>
      <TabBar v-show="$route.path === '/discover' || $route.path === '/my' || $route.path === '/ksong' || $route.path === '/podcast' || $route.path === '/cloudvillage' || $route.path === '/my/myInfo'"/>
      <PopUp/>
      <SongInfoPop/>
  </div>
</template>

<script>
  import TabBar from '@/components/TabBar/TabBar.vue'
  import PopUp from '@/components/PopUp/PopUp.vue'
  import Player from '@/components/Player/Player.vue'
  import SongInfoPop from '@/components/SongInfoPop/SongInfoPop.vue'
  import { USERINFO, ISLOGIN } from '@/vuex/mutations-types'
  import { reqUserInfo } from '@/api'
  export default {
      data () {
        return {
          toSearchTransitionType: ''
        }
      },

      mounted () {
          sessionStorage.getItem('id') && this.getUserInfo()
          
      },

      


      methods: {
        async getUserInfo () {
                let result = await reqUserInfo(sessionStorage.getItem('id'))
                let userInfo = {
                    imgSrc: result.profile.avatarUrl,
                    userName: result.profile.nickname,
                    level: result.level

                }
                this.$store.commit(USERINFO,userInfo)
                this.$store.commit(ISLOGIN,true)
            },

            
        },
      
      components: {
        TabBar,
        PopUp,
        Player,
        SongInfoPop
      },

      watch: {
        $route (to,from) {
          if(to.path === '/search' || from.path === '/search'){
            this.toSearchTransitionType = 'fade'
          }else{
            this.toSearchTransitionType = ''
          }
        } 
      }
  }
</script>

<style lang="less">
  #app{
    background-color: #f5f5f5;
  }

  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
  }
  .fade-enter, .fade-leave-to{
    // margin-top: 200%;
    opacity: 0;
  }
  .btnactive {
      position: relative;
      overflow: hidden;
  }

  .btnactive:after {
      content: "";
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      pointer-events: none;
      background-image: radial-gradient(circle, #666 10%, transparent 10.01%);
      background-repeat: no-repeat;
      background-position: 50%;
      transform: scale(10, 10);
      opacity: 0;
      transition: transform .3s, opacity .5s;
  }

  .btnactive:active:after {
      transform: scale(0, 0);
      opacity: .3;
      transition: 0s;
  }


  .pop{
    padding: 0 20px;
    box-sizing: border-box;
    overflow: hidden;
    .backImg{
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      filter: blur(20px);
      background-size: 500%;
      z-index: -1;
      &::before{
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        background-color: rgba(0, 0, 0,0.4);
        z-index: 2;
      }
    }
    .header{
        display: flex;
        width: 100%;
        height: 50px;
        align-items: center;
        justify-content: space-between;
        .closeIcon{
            font-size: 25px;
            color: white;
        }
        .title{
          font-size: 15px;
          color: white;
          flex: 1;
          text-align: center;
          line-height: 20px;
          .singer{
            font-size: 12px;
            color: #8f8f8f;
          }
        }
        .share{
          color: white;
          font-size: 28px;
        }
    }
    .phonograph{
      width: 100%;
      .toneArm{
        height: 110px;
        position: relative;
        img{
          position:absolute;
          top:20px;
          left: 43%;
          z-index: 10;
          transform-origin: top left;
          transition: all 0.5s;
          transform: scale(0.6) rotateZ(-15deg)  ;
        }
      }
      .turntable{
        position: relative;
        width: 280px;
        height: 280px;
        border-radius: 50%;
        margin: 0 auto;
        background-size: cover;
        background-image: url('./unit/img/disc.png');
        img{
          transition:  all 0.5s;
          position: absolute;
          left: 0;top: 0;bottom: 0;right: 0;
          margin: auto;
          width: 190px;
          height: 190px;
          border-radius: 50%;
        }
      }
    }

    .authorFunction{
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 80px;
      color: white;
      opacity: 0.8;
      .iconfont{
        font-size: 21px;
      }
    }

    .progress{
      margin: 25px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: white;
      .progressBar{
        margin: 0 10px;
        flex: 1;
        border-bottom: 2px solid #605d58;
        position: relative;
        .noProgress{
          position: absolute;
          left: 0;
          top: -1px;
          width: 0;
          border-bottom: 2px solid white;
          .noProgressHeader{
            position: absolute;
            width: 5px;
            height: 5px;
            background-color: white;
            border-radius: 50%;
            right: 0;
            top: -1.5px;
          }
        }
      }
    }

    .audioControl{
      display: flex;
      align-items: center;
      justify-content: space-around;
      color: white;
      .iconfont{
        font-size: 22px;
      }
      .playControl{
        i{
          font-size: 45px;

        }
      }
    }
  }





</style>
