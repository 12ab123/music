<template>
    <div id="playerContainer" ref="player">
        <div class="player" @click="openPop">
            <div class="img">
                <img :src="songImg" alt="">
            </div>
            <div class="title">
                <span class="name">{{songName}}</span>
                <span class="singer">{{songSinger}}</span>
            </div>
            <div class="control" @click.stop="playOrStop">
                <div class="wrapper right">
                    <div ref="left" class="circleProgress rightcircle"></div>
                </div>
                <div class="wrapper left">
                    <div ref="right" class="circleProgress leftcircle"></div>
                </div>
                <div class="playOrStop">
                    <i class="iconfont icon-play1" v-if="!isPlay"></i>
                    <i v-else class="iconfont icon-iconstop"></i>
                </div>
            </div>
            <div class="songList iconfont icon-menu-2-line"></div>
            <audio ref="audio" @loadedmetadata="loadedmetadata" @play="play" @pause="pause" @timeupdate="audioTimeChange" :src="songLink"></audio>
        </div>


        <van-popup
        v-model="popShow"
        get-container="#app"
        position="bottom"
        class="pop"
        :style="{ height: '100%' }"
        >
            <div class="backImg" :style="{backgroundImage: `url('${songImg}')`}"></div>
            <div class="header">
                <van-icon @click="closePop" class="closeIcon" name="arrow-down" />
                <div class="title">
                    <div class="name">{{songName}}</div>
                    <div class="singer">{{songSinger}}</div>
                </div>
                <div class="share iconfont icon-SHARE"></div>
            </div>

            <div class="phonograph">
                <div class="toneArm">
                    <img  ref="toneArm" src="../../unit/img/needle.png" alt="">
                </div>
                <div class="turntable">
                    <img ref="turntable"  :src="songImg" alt="">
                </div>
            </div>

            <div class="authorFunction">
                <div class="iconfont icon-love"></div>
                <div class="iconfont icon-xiazai"></div>
                <div class="iconfont icon-iconset0218"></div>
                <div class="iconfont icon-message"></div>
                <div class="iconfont icon-dian"></div>
            </div>
        
            <div class="progress">
                <div class="noTime">{{nowTime}}</div>
                <div class="progressBar" @click="changeMusicProgress" ref="progressBar">
                    <div class="noProgress" ref="noProgress">
                        <div class="noProgressHeader"></div>
                    </div>
                </div>
                <div class="totalTime">{{songTime}}</div>
            </div>

            <div class="audioControl">
                <div class="playState iconfont icon-suijibofang1"></div>
                <div class="last iconfont icon-shangyishoushangyige"></div>
                <div class="playControl" @click="playOrStop">
                    <i v-if="isPlay" class="iconfont icon-zanting"></i>
                    <i v-else class="iconfont icon-bofang"></i>
                </div>
                <div class="next iconfont icon-xiayigexiayishou"></div>
                <div class="songList iconfont icon-liebiao"></div>
            </div>
        </van-popup>
    </div>
</template>

<script>
    import { reqSongInfo, reqSongLink } from '@/api'
    import dayjs from 'dayjs'
    export default {
        data () {
            return {
                isPlay: false, 
                songImg: '',
                songLink: '',
                songName: '',
                songSinger: '',
                popShow: false,
                songTime: '00:00',
                nowTime: '00:00',
            }
        },

        mounted () {
            this.$route.path.split('/').length-1 === 1 ? this.$refs.player.style.bottom = 50 + 'px' : this.$refs.player.style.bottom = 0 + 'px'

        },
        computed: {
            songId: {
                get () {
                    return this.$store.state.songId
                }
                
            }
        },
        methods: {
            playOrStop () {
                if(this.$refs.audio.paused){
                    this.isPlay = true
                    this.$refs.audio.play()
                }else{
                    this.isPlay = false
                    this.$refs.audio.pause()        
                } 
            },

            audioTimeChange () {
                this.$refs.turntable && (this.$refs.turntable.style.transform = `rotateZ(${this.turntableRotate++}deg)`)
                this.nowTime = dayjs.unix(this.$refs.audio.currentTime).format('mm:ss')
                if(this.$refs.noProgress){
                    // console.log(this.$refs.progressBar.offsetWidth)
                    this.$refs.noProgress.style.width = this.$refs.progressBar.offsetWidth * (this.$refs.audio.currentTime/this.$refs.audio.duration) + 'px' 
                }
                let a = -180* (this.$refs.audio.currentTime/(this.$refs.audio.duration/2))
                if((-135-a) >= 45){
                    this.$refs.left.style.transform =`rotate(45deg)`
                    this.$refs.right.style.transform = `rotate(${-135-(180+a)}deg)`
                    return
                }
                this.$refs.right.style.transform = `rotate(-135deg)`
                this.$refs.left.style.transform =`rotate(${-135-a}deg)`
            },

            play () {
                this.isPlay = true
                this.$refs.toneArm && (this.$refs.toneArm.style.transform = 'scale(0.6) rotateZ(2deg)')
            },

            pause () {
                this.isPlay = false
                this.$refs.toneArm && (this.$refs.toneArm.style.transform = 'scale(0.6) rotateZ(-15deg)')
            },


            async getSongInfo (id) {
                let result = await reqSongInfo(id)
                this.songImg = result.songs[0].al.picUrl
                this.songName = result.songs[0].name
                this.songSinger = result.songs[0].ar[0].name
            },
            async getSongLink (id) {
                let result = await reqSongLink(id)
                this.songLink = result.data[0].url
                setTimeout(()=>{
                    this.$refs.audio.play()
                    
                },0)
            },

            closePop () {
                this.popShow = false
            },

            loadedmetadata () {
                this.songTime = dayjs.unix(this.$refs.audio.duration).format('mm:ss')
            },

            openPop () {
                this.popShow = true
                setTimeout(()=>{
                    if(this.$refs.audio.paused === false){
                        this.$refs.toneArm.style.transform = 'scale(0.6) rotateZ(2deg)'
                    }
                },0)
            },

            changeMusicProgress (event) {
                this.$refs.audio.currentTime = event.offsetX / this.$refs.progressBar.offsetWidth * this.$refs.audio.duration
            }
        },
        watch: {
            '$route'(to,from){
                if(this.$route.path === '/my/myInfo'){
                    this.$refs.player.style.bottom = 50 + 'px'
                }else{
                    this.$route.path.split('/').length-1 === 1 ? this.$refs.player.style.bottom = 50 + 'px' : this.$refs.player.style.bottom = 0 + 'px'         
                }
            },
            songId (value) {
                this.isPlay = false
                this.turntableRotate = 0
                this.getSongInfo(value)
                this.getSongLink(value)
            },
        }
    }
</script>

<style lang="less" scoped>
    #playerContainer{
        position: fixed;
        left: 0;
        bottom: 0;
        height: 50px;
        width: 100%;
        background-color: white;
       .player{
           display: flex;
           align-items: center;
           padding: 0 20px;
            height: 50px;
            .img{
                width: 35px;
                height: 35px;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 5px;
                }
            }
            .title{
                flex: 1;
                margin-left: 10px;
                font-size: 14px;
                .singer{
                    margin-left: 10px;
                    font-size: 12px;
                    color: #8f8f8f;
                }
            }
            .control{
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background-color: #ccc;
                position: relative;
                margin:  0 10px;
                .wrapper{
                    width: 15px;
                    height: 30px;
                    position: absolute;
                    top:0;
                    overflow: hidden;
                }
                .right{
                    right:0;
                }
                .left{
                    left:0;
                }

                .circleProgress{
                    width: 27.6px;
                    height: 28px;
                    border:1px solid transparent;
                    border-radius: 50%;
                    position: absolute;
                    top:0;
                }
                .rightcircle{
                    border-top:1px solid #2f2f2f;
                    border-right:1px solid #2f2f2f;
                    right:0;
                    transform: rotate(-135deg);

                }
                .leftcircle{
                    border-bottom:1px solid #2f2f2f;
                    border-left:1px solid #2f2f2f;
                    left:0;
                    transform: rotate(-135deg);
                }
                .playOrStop{
                    width: 28px;
                    height: 28px;
                    position:absolute;
                    left: 0;bottom: 0;top: 0;right: 0;
                    margin: auto;
                    background-color: white;
                    border-radius: 50%;
                    text-align: center;
                    line-height: 28px;
                    i{
                        font-size: 12px;
                        margin-left: 2px;
                    }
                }
            }
            .songList{
                font-size: 23px;
            }
       }

       

       
       
    }
</style>