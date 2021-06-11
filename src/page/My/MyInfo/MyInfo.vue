<template>
    <div id="MyContainer">
        <HeaderBar/>
        <div class="toLogin" @click="toLogin">
            <div class="imgContainer">
                <img :src="userInfo.imgSrc" alt="用户头像">
            </div>
            <div class="Login" v-if="!isLogin">
                立即登录  >
            </div>
            <div class="userHeaderInfo" v-else>
                <div class="left">
                    <div class="name">{{userInfo.userName}}</div>
                    <div class="level">Lv.{{userInfo.level}}</div>
                </div>
                <div class="right"> 
                    <van-icon name="arrow" />
                </div>
            </div>
        </div>

        <div class="likeMusic btnactive" @click="$router.push('/my/likesonglist')">
            <div class="img" :style="likeImg">
                <i class="iconfont icon-love1"></i>
            </div>
            <div class="likeInfo">
                <div class="title">我喜欢的音乐</div>
                <div class="manySongs">{{likeSongs.length}}首</div>
            </div>
            <div class="loveModel">
                <span class="iconfont icon-love"></span>
                <span>心动模式</span>
            </div>
        </div>

        <div class="createSong"></div>
    </div>
</template>

<script>
    import HeaderBar from '@/components/HeaderBar/HeaderBar.vue'
    import { reqUserInfo, reqUserLikeSongs, reqSongInfo } from '@/api'
    import { USERINFO, ISLOGIN } from '@/vuex/mutations-types'
    import { mapState } from 'vuex'
    export default {
        data () {
            return {
                userId: sessionStorage.getItem('id'),
                likeSongs: [],
                likeImg: {
                    backgroundImage: 'linear-gradient(#9b9b9b , #9b9b9b)'
                },
            }
        },


        components: {
            HeaderBar
        },

        mounted () {
            if(this.$store.state.isLogin){
                this.getUserLikeSongsInfo()
            }
        },

        computed: {
            ...mapState(['isLogin','userInfo'])
        },

        methods: {
            toLogin () {
                this.userId || this.$router.push('/login')
            },


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

            async getUserLikeSongsInfo () {
                let result = await reqUserLikeSongs(this.userId)
                this.likeSongs = result.ids

            },

            async getSongInfo (id) {
                let result = await reqSongInfo(id)
                this.likeImg = {
                    backgroundImage: `url(${result.songs[0].al.picUrl})`,
                    backgroundSize: 'cover'
                }
            }

        },

        watch: {
            '$route' (to, from, next) {
                if(from.path === '/login'){
                    this.userId || this.getUserInfo()
                }
            },

            isLogin (val,oldVal) {
                if(val){
                    this.getUserLikeSongsInfo()
                }
            },

            likeSongs (val,oldVal) {
                if(val.length>0){
                    this.getSongInfo(val[val.length-1])
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    #MyContainer{   
        padding: 0 20px;
        height: 600px;
        .toLogin{
            margin-top: 50px;
            width: 100%;
            height: 100px;
            display: flex;
            justify-content: left;
            align-items: center;
            .imgContainer{
                height: 50px;
                width: 50px;
                border: 2px solid #fff;
                border-radius: 50%;
                margin: 0 10px 0 0;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
            .Login{
            font-size: 13px;
            }
            .userHeaderInfo{
                flex: 1;
                display: flex;
                height: 60px;
                align-items: center;
                justify-content: space-between;
                .left{
                    .name{
                        margin-top: 10px;
                        font-size: 13px;
                    }
                    .level{
                        margin-top: 5px;
                        background-color: white;
                        border-radius: 10px;
                        display: inline-block;
                        padding: 4px 10px;
                        transform: scale(0.8);
                    }
                }
                .right{
                    font-size: 20px;
                }
            }
        }

        .likeMusic{
            margin-top: 20px;
            height: 80px;
            width: 100%;
            background-color: white;
            display: flex;
            align-items: center;
            border-radius: 10px;
            padding: 0 20px;
            box-sizing: border-box;
            .img{
                height: 50px;
                width: 50px;
                border-radius: 5px;
                // background-color: #9b9b9b;
                text-align: center;
                line-height: 50px;
                i{
                    font-size: 25px;
                    color: white;
                }
            }
            .likeInfo{
                margin-left: 10px;
                flex: 1;
                .title{
                    font-size: 13px;
                    letter-spacing: 2px;
                }
                .manySongs{
                    font-size: 12px;
                    color: #ccc;
                    margin-top: 5px;
                }
            }
            .loveModel{
                border: 1px solid #ccc;
                border-radius: 15px;
                padding: 3px 7px;
                span:nth-child(1){
                    color: red;
                }
                
            }
        }

        .createSong{
            width: 100%;
            height: 80px;
        
        }
        
        
        
    }
</style>