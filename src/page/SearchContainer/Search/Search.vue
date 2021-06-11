<template>
    <div id="searchContainer">
        <!-- <div class="search">
            <div class="back iconfont icon-left"></div>
            <div class="input">
                <input type="text" v-model="searchText" @keyup.enter="inputText" :placeholder="defaultSong[1]">
            </div>
        </div> -->

        <SearchInput :historyList="historyList"/>

        <div class="isLoading" v-if="isLoading">
            正在努力加载中......
        </div>
        <div v-else>
            <div class="history">
                <div class="left">历史</div>
                <div class="historyScroll">
                    <div class="historyList" ref="historyList">
                        <div class="historyItem" @click="historySearch(item)" v-for="(item , index) in historyList" :key="index">{{item}}</div>
                    </div>
                </div>
                <div class="empty iconfont icon-empty" @click="clearHistoryList"></div>
            </div>

            <div class="topSearchList">
                <div class="header">
                    <div class="title">热搜榜</div>
                    <div class="play iconfont icon-play">播放</div>
                </div>
                <div class="hotSearchList">
                    <div class="hotSearchItem" @click="hotSearch(item.searchWord)" :class="{topThree:index+1<4}" v-for="(item , index) in hotSearchInfo" :key="index">
                        <div class="ranking">{{index+1}}</div>
                        <div class="title">{{item.searchWord}}</div>
                        <div class="img">
                            <img :src="item.iconUrl" alt="">
                        </div>
                    </div>
                    
                </div>
                <!-- <div class="isShowMoreHotSearch">展开更多热搜
                    <i class="iconfont icon-down"></i>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import { HISTORYSEARCHLIST } from '@/vuex/mutations-types'
    import { reqDefaultSearchSong, reqHotSearchList } from '@/api'
    import SearchInput from '@/components/SearchComs/SearchInput'
    import minix from '@/minix'
    export default {
        data () {
            return {
                defaultSong: [],
                hotSearchInfo: [],
                isLoading: true,
                historyList: []
            }
        },

        mixins: [minix],

        components: {
            SearchInput
        },


        mounted () {
            this.getHotSearchListInfo()
            this.historyList = JSON.parse(localStorage.getItem('historyList')) ? JSON.parse(localStorage.getItem('historyList')) : []
        },


        methods: {
            async getDefaultSong () {
                let result = await reqDefaultSearchSong()
                this.defaultSong = [result.data.realkeyword,result.data.showKeyword]
            },

            async getHotSearchListInfo () {
                let result = await reqHotSearchList()
                this.hotSearchInfo = result.data
                this.isLoading = false
            },

           
            // 清除搜索记录
            clearHistoryList () {
                this.historyList = []
                localStorage.setItem('historyList',JSON.stringify(this.historyList))
            },

            // 点击热搜榜中的内容执行的回调
            hotSearch (search) {
                this.searchAndSkip(search,this.$store.state.historySearchList)             
            },

            // 点击历史进行搜索
            historySearch (search) {
                this.searchAndSkip(search,this.$store.state.historySearchList)
            },

        },

        watch : {
            isLoading () {
                this.$nextTick(()=>{  
                    this.historeyScroll = new BScroll('.historyScroll',{
                        scrollX: true,
                        stopPropagation: true,
                        preventDefaultException: {className:/(^|\s)historyItem(\s|$)/}
                    })
                })
            },

            historyList (value) {
                this.$nextTick(()=>{
                    this.historeyScroll && this.historeyScroll.refresh()
                })
                this.$store.commit(HISTORYSEARCHLIST,value)
            }
        }
    }
</script>

<style lang="less" scoped>
    #searchContainer{
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
        background-color: white;
        .search{
            height: 35px;
            width: 100%;
            display: flex;
            align-items: center;
            .back{
                font-size: 25px;
                width: 30px;
                height: 100%;
                line-height: 45px;
                text-align: left;
            }
            .input{
                flex: 1;
                height: 35px;
                border-bottom: 1px solid #cecece;
                margin-left: 10px;
                position: relative;
                font-size: 14px;
                input{
                    width: 100%;
                    position: absolute;
                    bottom: 5px;
                    left: 0;
                }
            }
        }

        .history{
            width: 100%;
            height: 30px;
            margin: 20px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .left{
                font-size: 13px;
                letter-spacing: 2px;
            }
            .historyScroll{
                margin: 0 10px;
                flex: 1;
                overflow: hidden;
                height: 22px;
                .historyList{
                    display: inline-block;
                    white-space: nowrap;
                    .historyItem{
                        display: inline-block;
                        background-color: #f3f3f3;
                        border-radius: 15px;
                        margin-right: 10px;
                        padding: 5px 10px;
                        letter-spacing: 1px;
                        z-index: 999;
                    }
                }
            }
        }

        .topSearchList{
            margin-top: 20px;
            .header{
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 60px;
                border-bottom: 1px solid #f1f1f1;
                .title{
                    font-size: 13px;
                    letter-spacing: 2px;
                }
                .play{
                    border: 1px solid #f1f1f1;
                    font-size: 12px;
                    letter-spacing: 1px;
                    padding: 3px 10px;
                    transform: scale(0.8);
                    border-radius: 15px;
                }
            }

            .hotSearchList{
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                .hotSearchItem{
                    display: flex;
                    height: 30px;
                    align-items: center;
                    width: 50%;
                    
                    .ranking{
                        font-size: 14px;
                        color: #ccc;
                    }
                    .title{
                        font-size: 12px;
                        letter-spacing: 1px;
                        margin: 0 5px 0 10px;
                        color: #5d5c5c;
                        white-space: nowrap;
                    }
                    .img{
                        display:inline-block;
                        margin-left: -30px;
                        width: 30px;
                        img{
                            transform: scale(0.2);
                        }
                    }
                    

                    &.topThree{
                        .ranking{
                            color: #eb716e;
                        }
                        .title{
                            font-weight: bolder;
                            font-size: 14px;
                            color: black;
                        }
                    }
                }
            }

            .isShowMoreHotSearch{
                width: 100%;
                height: 50px;
                text-align: center;
                line-height: 50px;
                color: #ccc;
                letter-spacing: 2px;
                font-size: 12px;
                position: relative;
                i{
                    position: absolute;
                }
            }
        }

        .isLoading{
            color: red;
            font-size: 12px;
            width: 100%;
            text-align: center;
            margin-top: 100px;
        }
    }
</style>