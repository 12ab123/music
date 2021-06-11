<template>
    <div id="synthesizeContainer">
        <div class="loading" v-if="isLoading">
            加载中........
        </div>
        <div class="list" v-else>
            <div class="song backRadius" v-if="searchData.song">
                <div class="header">单曲</div>
                <SongItem :searchData="searchData.song.songs"/>
                <div class="more" @click="changeTab(1)">{{searchData.song.moreText}} > </div>
            </div>

            <div class="song backRadius" v-if="searchData.playList">
                <div class="header">歌单</div>
                <van-cell  v-for="playInfo in searchData.playList.playLists" :key="playInfo.id" class="playItem" clickable center>
                    <img class="playIcon" :src="playInfo.coverImgUrl" alt="">
                    <div class="playTitle">
                        <div class="title">{{playInfo.name}}</div>
                        <div class="playCount">{{playInfo.trackCount}}首 , by {{playInfo.creator.nickname}} , 播放{{playInfo.playCount | transfromNumber}}次</div>
                    </div>
                </van-cell>
                <div class="more" @click="changeTab(2)">{{searchData.playList.moreText}} > </div>
            </div>

            <div class="song backRadius" v-if="searchData.video">
                <div class="header">视频</div>
                <van-cell v-for="videoInfo in searchData.video.videos" :key="videoInfo.vid" class="videoItem" clickable center>
                    <div class="videoIcon">
                        <img :src="videoInfo.coverUrl" alt="">
                        <i class="iconfont icon-play1"></i>
                    </div>
                    <div class="videoTitle">
                        <div class="title">{{videoInfo.title}}</div>
                        <div class="videoCount">{{videoInfo.durationms | transfromDay}} , by {{videoInfo.creator[0].userName}} , {{videoInfo.playTime | transfromNumber}}播放</div>
                    </div>
                </van-cell>
                <div class="more" @click="changeTab(3)">{{searchData.playList.moreText}} > </div>
            </div>

            <div class="song backRadius" v-if="searchData.artist">
                <div class="header">艺人</div>
                <van-cell v-for="artInfo in searchData.artist.artists" :key="artInfo.accountId" class="artItem" clickable center>
                    <img :src="artInfo.picUrl" alt="">
                    <div class="title">{{artInfo.name}}</div>
                </van-cell>
                <div class="more" @click="changeTab(7)">{{searchData.artist.moreText}} > </div>
            </div>
        </div>
        
    </div> 
</template>

<script>
    import { reqSearchData } from '@/api'
    import dayjs from 'dayjs'
    import SongItem from './SongItem'
    export default {
        data () {
            return {
                searchData: {},
                isLoading: true
            }
        },
        components: {
            SongItem
        },

        props: {
            changeActive: {
                type: Function
            }
        },

        filters: {
            transfromNumber (value) {
                if(value <= 1000){
                    return value 
                }else if(value <= 10000){
                    return (value/1000).toFixed(1) + '千'
                }else if(value <= 100000000){
                    return (value/10000).toFixed(1) + '万'
                }else{
                    return (value/100000000).toFixed(1) + '亿'
                }
            },

            transfromDay (value) {
                
                return dayjs(value).format('mm:ss')
            }
        },

        mounted () {
            this.getSearchData()
        },

        methods: {
            async getSearchData () {
                let result = await reqSearchData({type:1018,keywords:this.$route.params.keywords})
                this.isLoading = false
                let data = {}
                for(var key in result.result){
                    if(key !== 'code' && key !=='rec_query' && key !== 'rec_type') {
                        data[key] = result.result[key]
                    }
                }
                this.searchData = data

            },

            changeTab (index) {
                this.changeActive(index)
            },

            clickSongItem(id) {
                this.$store.commit(SONGID,id)
            },

            clickSongIcon () {
                console.log('icon')
            },
        }
    }
</script>

<style lang="less" scoped>
    .backRadius{
        background-color: white;
        border-radius: 15px;
        margin-top: 20px;
        padding: 15px 15px 15px 0;
        box-sizing: border-box;
        
    }
    .header{
        margin-left: 15px;
        font-size: 15px;
        letter-spacing: 2px;
        height: 35px;
        line-height: 35px;
    }

    .songItem{
        height: 56px;
        .title{
            width: 260px;
            font-size: 15px;
            letter-spacing: 1px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
        .label{
            width: 260px;
            font-size: 12px;
            color: #8f8f8f;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
    }

    .more{
        margin-top: 10px;
        text-align: center;
        color: #8f8f8f;
    }

    .playItem{
        height: 65px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .playIcon{
            width: 45px;
            height: 45px;
            border-radius: 5px;
            overflow: hidden;
            float: left;
        }
        .playTitle{
            height: 100%;
            float: left;
            margin-left: 10px;
            width: 210px;
            .title{
                width: 100%;
                font-size: 15px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                height: 20px;
            }
            .playCount{
                width: 230px;
                font-size: 12px;
                height: 20px;
                transform: scale(0.8);
                overflow: hidden;   
                text-overflow:ellipsis;
                white-space: nowrap;
                margin-left: -20px;
                color: #8f8f8f;
            }
            
        }
    }

    .videoItem{
        height: 75px;
        display: flex;
        align-items: center;
        .videoIcon{
            float: left;
            width: 35%;
            position: relative;
            height: 60px;
            border-radius: 10px;
            overflow: hidden;
            img{
                width: 100%;
                height: 100%;
            }
            i{
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                right: 0;
                margin: auto;
                width: 24px;
                height: 24px;
                color: white;
                font-size: 24px;
                opacity: 0.7;
            }
        }
        .videoTitle{
            width: 63%;
            float: left;
            margin-left: 2%;
            .title{
                font-size: 13px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2; 
                overflow: hidden;
                line-height: 20px;
            }
            .videoCount{
                width: 220px;
                font-size: 12px;
                transform: scale(0.8);
                margin-left: -18px;
                color: #8f8f8f;
            }
        }
    }

    .artItem{
        height: 60px;
        line-height: 60px;
        img{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            float: left;
            margin-top: 10px;
        }
        .title{
            float: left;
            margin-left: 10px;
        }
    }

    .loading{
        margin-top: 50px;
        color: red;
        text-align: center;
        font-size: 14px;
        height: 600px;
    }
    

</style>