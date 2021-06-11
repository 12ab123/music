<template>
    <div id="songListContainer">
        <div class="header" :style="{backgroundImage: `url(${songListInfo.backImg ? songListInfo.backImg : ''})`}">
            <div class="black">
                <div class="iconfont icon-left" @click="$router.back()"></div>
                <div>歌单</div>
            </div>
            <div class="songListInfo">
                <div class="left">
                    <img :src="songListInfo.backImg ? songListInfo.backImg : '' " alt="">
                </div>
                <div class="right">
                    <div class="title">我喜欢的音乐</div>
                    <div class="authorInfo">
                        <img :src="$store.state.userInfo.imgSrc" alt="">
                        <div class="authorName">{{$store.state.userInfo.userName}}</div>
                    </div>
                    <div class="songListDetail">
                        {{songListInfo.description}}
                    </div>
                </div>
            </div>
            <div class="dynamicInfo">
                <div class="add iconfont icon-tianjia">    12121</div>
                <div class="info iconfont icon-message">    21212</div>
                <div class="share iconfont icon-SHARE">    21212</div>
            </div>
        </div>

        <div class="songs" v-if="songsInfo">
            <SongItem :searchData = songsInfo :isShowSeniority = isShowSeniority />
        </div>
    </div>
</template>

<script>
    import { reqSongInfo, reqUserLikeSongs } from '@/api'
    import SongItem from '@/components/SearchComs/SongItem.vue'
    export default {
        data () {
            return {
                songListInfo: {},
                songListId: [],
                songsInfo: [],
                isShowSeniority: true
            }
        },

        components: {
            SongItem
        },

        mounted () {
            this.getLikeSongListInfo(sessionStorage.getItem('id'))
        },

        methods: {

            async getLikeSongListInfo (id) {
                let result = await reqUserLikeSongs(id)
                this.songListId = result.ids
            },
            

            async getSongsInfo (ids) {
                let result = await reqSongInfo(ids)
                this.songsInfo = result.songs
                this.songListInfo = {
                    backImg : result.songs[result.songs.length-1].al.picUrl,
                }
            }
        },

        watch: {
            songListId ( val, oldVal ) {
                this.getSongsInfo(String(val))
                
            }
        }
    }
</script>

<style lang="less"  scoped>
    #songListContainer{
        background-color: white;
        .header{
            position: relative;
            height: 220px;
            width: 100%;
            &::after{
                position: absolute;
                content: '';
                width: 100%;
                height: 15px;
                background-color: white;
                left: 0;
                right: 0;
                margin: 0 auto;
                bottom: -5px;
                border-radius: 50% 50% 0 0;
                // transform: rotateZ(180deg);
            }
            .black{
                margin: 0 0 0 20px;
                padding: 5px 0 0 0;
                height: 40px;
                color: white;
                display: flex;
                align-items: center;
                div:nth-child(1){
                    font-size: 27px;
                }
                div:nth-child(2){
                    margin-left: 6px;
                    font-size: 16px;
                }
            }

            .songListInfo{
                margin-top: 15px;
                display: flex;
                width: 100%;
                padding: 0 20px;
                box-sizing: border-box;
                position: relative;
                .left{
                    position: relative;
                    
                    img{
                        position: relative;
                        z-index: 3;
                        height: 115px;
                        width: 115px;
                        border-radius: 10px;
                    }
                    &::after{
                        content: '';
                        width: 90px;
                        height: 10px;
                        background-color: #80726f;
                        position:absolute;
                        left: 0;
                        right: 0;
                        margin: 0 auto;
                        top: -5px;
                        border-radius: 5px;
                    }
                }
                .right{
                    position: relative;
                    margin-left: 10px;
                    width: 210px;
                    .title{
                        width: 100%;
                        color: white;
                        margin-bottom: 30px;
                        font-size: 14px;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                    }
                    .authorInfo{
                        display: flex;
                        align-items: center;
                        img{
                            width: 25px;
                            height: 25px;
                            border-radius: 50%;
                        }
                        .authorName{
                            margin-left: 5px;
                            color: #9a918c;
                        }
                    }
                    .songListDetail{
                        width: 100%;
                        position: absolute;
                        left: 0;
                        bottom: 0;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                        color: #8c857f;
                    }
                }
            }
            .dynamicInfo{
                height: 43px;
                width: 70%;
                position: absolute;
                left: 0;
                right: 0;
                margin: 0 auto;
                bottom: -15px;
                background-color: white;
                z-index: 4;         
                box-shadow:0px 1px 5px 0px rgba(196,186,196,1);
                display: flex;
                justify-content: center;
                align-items: center;
                &::before{
                    content: '';
                    height: 43px;
                    width: 43px;
                    display: block;
                    border-radius: 50%;
                    background-color: white;
                    position: absolute;
                    left: -20px;
                }
                &::after{
                    content: '';
                    height: 43px;
                    width: 43px;
                    display: block;
                    border-radius: 50%;
                    background-color: white;
                    position: absolute;
                    right: -20px;
                }
                .iconfont{
                    width: 70px;
                    text-align: center;
                    font-size: 16px;
                }
                .add,.info{
                    border-right: 1px solid #ededed;
                }
            }
        }
        .songs{
            margin-top: 40px;
            width: 100%;
            padding: 0 20px;
            box-sizing: border-box;
            padding-bottom: 50px;
        }
    }
</style>