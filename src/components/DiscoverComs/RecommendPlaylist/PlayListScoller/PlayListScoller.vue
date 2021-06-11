<template>
    <div id="playListScoller">
        <div class="playList">
            <div class="palyItem" v-for="(item) in playListInfo" :key="item.id" @click="$router.push(`/search/songlist/${item.id}`)">
                <div class="img">
                    <img :src="item.picUrl" alt="">
                    <div class="playCount">
                        <div class="iconfont icon-play">{{Math.trunc(item.playCount/10000)}}万</div>
                    </div>
                    <div class="shadow"></div>
                </div>
                <div class="title">
                    {{item.name}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { reqRecommendPlayList } from '@/api'
    import BScroll from 'better-scroll'
    export default {
        data () {
            return {
                playListInfo : []
            }
        },

        mounted () {
            this.getPlayListInfo()
        },

        methods : {
            async getPlayListInfo () {
                let result = await reqRecommendPlayList()
                this.playListInfo = result.result
            },
            
        },

        watch: {
            playListInfo () {
                this.$nextTick(()=>{
                    new BScroll('#playListScoller',{
                        scrollX: true,
                        preventDefault: false,
                        stopPropagation: true
                    })
                })
            }
        }
     }
</script>

<style lang="less" scoped>
    #playListScoller{
        height: 140px;
        width: 100%;
        overflow: hidden;
        .playList{
            width: 680px;
            padding: 0 20px;
            display: flex;
            .palyItem{
                height: 140px;
                width: 105px;
                margin-right: 10px;
                .img{
                    position: relative;
                    img{
                        width: 105px;
                        height: 105px;
                        border-radius: 10px;
                    }
                    .shadow{
                        position: absolute;
                        width: 90px;
                        height: 5px;
                        left: 50%;
                        transform: translateX(-50%);
                        border-top-left-radius: 15px;
                        border-top-right-radius: 15px;
                        background-color: #f7f6f2;
                        top: -5px;
                    }
                    .playCount{
                        position: absolute;
                        top: 5px;
                        right: 5px;
                        border-radius: 10px;
                        background-color: rgba(234, 234, 234, .2);
                        .iconfont{
                            color: white;
                            font-size: 12px;
                            transform: scale(0.7);
                            letter-spacing: 1px;

                        }
                    }
                }
            }
            .title{
                width: 100%;
                height: 30px;
                line-height: 15px;
                text-align: center;
                overflow:hidden;/*超出隐藏*/
                text-overflow:ellipsis;/*文本溢出时显示省略标记*/
                display:-webkit-box;/*设置弹性盒模型*/
                -webkit-line-clamp:2;/*文本占的行数,如果要设置2行加...则设置为2*/
                -webkit-box-orient:vertical;/*子代元素垂直显示*/
            }
        }
    }
</style>