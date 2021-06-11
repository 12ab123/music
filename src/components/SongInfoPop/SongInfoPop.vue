<template>
    <van-popup   class="songInfoPop" v-model="show" position="bottom" :style="{ height: '75%' }" >
        <div class="header">
            <div class="songInfo">
                <div class="left">
                    <img :src="songInfo.singImg" alt="">
                </div>
                <div class="centent">
                    <div class="song">歌曲: {{songInfo.singName}}</div>
                    <div class="singer">{{songInfo.singer}}</div>
                </div>
                <div class="right">
                    <p>开通VIP畅享</p>
                </div>
            </div>
            <div class="openVip">
                开通VIP畅享千万曲库下载特权
            </div>
        </div>
        <div class="cententScroll">
            <div class="list">
                <van-cell :border="false" clickable class="listItem">
                    <div class="iconfont icon-Next"></div>
                    <div class="title">下一首播放</div>
                </van-cell>
                <van-cell :border="false" clickable class="listItem">
                    <div class="iconfont icon-tianjia"></div>
                    <div class="title">收藏到歌单</div>
                </van-cell>
                <van-cell :border="false" clickable class="listItem">
                    <div class="iconfont icon-xiazai"></div>
                    <div class="title">下载</div>
                </van-cell>
                <van-cell :border="false" clickable class="listItem">
                    <div class="iconfont icon-message"></div>
                    <div class="title">评论</div>
                </van-cell>
                <van-cell :border="false" clickable class="listItem">
                    <div class="iconfont icon-SHARE"></div>
                    <div class="title">分享</div>
                </van-cell>
                <van-cell :border="false" clickable class="listItem">
                    <div class="iconfont icon-yonghu"></div>
                    <div class="title">歌手</div>
                </van-cell>
                <van-cell :border="false" clickable class="listItem">
                    <div class="iconfont icon-zhuanji"></div>
                    <div class="title">专辑</div>
                </van-cell>
                <van-cell :border="false" clickable class="listItem">
                    <div class="iconfont icon-xianxingbeike"></div>
                    <div class="title">云贝推歌</div>
                </van-cell>
                <van-cell :border="false" clickable class="listItem">
                    <div class="iconfont icon-shipin"></div>
                    <div class="title">相关视频</div>
                </van-cell>
                <van-cell :border="false" clickable class="listItem">
                    <div class="iconfont icon-iconset0218"></div>
                    <div class="title">设为铃声</div>
                </van-cell>
                <van-cell :border="false" clickable class="listItem">
                    <div class="iconfont icon-gouwuche"></div>
                    <div class="title">单曲购买</div>
                </van-cell>
                <van-cell :border="false" clickable class="listItem">
                    <div class="iconfont icon-empty"></div>
                    <div class="title">删除</div>
                </van-cell>
                <van-cell :border="false" clickable class="listItem">
                    <div class="iconfont icon-no"></div>
                    <div class="title">屏蔽歌曲或歌手</div>
                </van-cell>
            </div>
        </div>
    </van-popup>
</template>

<script>
    import BSrcoll from 'better-scroll'
    import { ISSHOWSONGINFOPOP } from '@/vuex/mutations-types'
    import { reqSongInfo } from '@/api'
    export default {
        data () {
            return {
                songInfo: {}
            }
        },

        computed: {
            show: {
                get () {
                    return this.$store.state.isShowSongInfoPop
                },
                set () {
                    this.$store.commit(ISSHOWSONGINFOPOP,false)
                }
            }
        },


        methods: {
            

            async getSongInfo () {
                let result = await reqSongInfo(this.$store.state.SongInfoPopId)
                result = result.songs[0]
                this.songInfo = {
                    singer: result.ar[0].name,
                    singName: result.name,
                    singImg: result.al.picUrl,
                    id: result.id
                }
            }
        },

        watch: {
            show (val) {
                if(val){
                    this.getSongInfo()
                    setTimeout(()=>{     
                        this.scroll || (this.scroll = new BSrcoll('.cententScroll',{
                            preventDefaultException: {className:/(^|\s)van-cell__value(\s|$)/},
                            stopPropagation: true,      // 事件冒泡.默认为false
                            bounce: false               // 禁止滚动溢出,默认为true
                        }))
                    })
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .songInfoPop{
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        padding: 10px 10px 0 10px;
        box-sizing: border-box;
        .header{
            height: 80px;
            border-bottom: 1px solid #f8f8f8;
            .songInfo{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .left{
                    img{
                        width: 50px;
                        height: 50px;
                        border-radius: 5px;
                    }
                }
                .centent{
                    // flex: 1;
                    padding: 0 10px;
                    line-height: 24px;
                    box-sizing: border-box;
                    .song{
                        width: 210px;
                        font-size: 14px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .singer{
                        width: 210px;
                        font-size: 13px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        color: #b0b0b0;
                    }
                }
                .right{
                    width: 90px;
                    text-align: center;
                    border: 1px solid #ca848a;
                    padding: 3px;
                    color: #ca848a;
                    border-radius: 10px;
                    font-size: 12px;
                    p{
                        width: 70px;
                        transform: scale(0.8);
                    }
                }
            }
            .openVip{
                margin-top: 10px;
                width: 100%;
                color: #ccc;
            }
        }
        .cententScroll{
            height: calc(100% - 81px);
            width: 100%;
            overflow: hidden;
            .list{
                height: calc(13 * 40px);
                .listItem{
                    height: 40px;
                    padding: 0;
                    line-height: 40px;
                    .iconfont{
                        font-size: 22px;
                        font-weight: 900;
                        float: left;
                        margin-left: 10px;
                    }
                    .title{
                        float: left;
                        margin-left: 10px;
                        font-size: 12px;
                    }
                }
            }
        }
                
    }
</style>