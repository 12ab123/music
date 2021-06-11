<template>
    <div id="MvScroller">
        <div class="mvList">
            <div class="mvItem" v-for="(item) in mvListInfo" :key="item.id">
                <div class="img">
                    <img :src="item.cover" alt="">
                    <div class="playCount">
                        <div class="iconfont icon-play">{{item.playCount}}</div>
                    </div>
                </div>
                <div class="title">
                    {{item.name}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { reqRecommendMvList } from '@/api'
    import BScroll from 'better-scroll'
    export default {
        data () {
            return {
                mvListInfo: []
            }
        },

        mounted () {
            this.getMvListInfo()
        },

        methods: {
            async getMvListInfo () {
                let result = await reqRecommendMvList()
                // console.log(result)
                this.mvListInfo = result.data
            }
        },

        watch: {
            mvListInfo () {
                this.$nextTick(()=>{
                    new BScroll('#MvScroller',{
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
    #MvScroller{
        width: 100%;
        overflow: hidden;
        .mvList{
            padding: 0 20px;
            display: flex;
            width: 1000px;
            .mvItem{
                width: 160px;
                height: 240px;
                margin-right: 10px;
                .img{
                    position: relative;
                    img{
                        width: 160px;
                        height: 200px;
                        border-radius: 10px;
                        
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
    }
</style>