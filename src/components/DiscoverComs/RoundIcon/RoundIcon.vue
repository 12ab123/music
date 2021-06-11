<template>
    <div id="roundIcon">
        <ul class="iconList">
            <li class="iconItem" v-for="(item) in roundIcon" :key="item.id">
                <div class="icon">
                    <img :src="item.iconUrl" alt="">
                </div>
                <div class="title">{{item.name}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
    import {reqRoundIcon} from '@/api'
    import BScroll from 'better-scroll'
    export default {
        data () {
            return {
                roundIcon: []
            }
        },

        mounted () {
            this.getRoundIconInfo()
        },

        methods: {
            async getRoundIconInfo () {
                let result = await reqRoundIcon()
                this.roundIcon = result.data
            }
        },

        watch: {
            roundIcon () {
                this.$nextTick(()=>{
                    new BScroll('#roundIcon',{
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
    #roundIcon{
        width: 100%;
        height: 80px;
        border-bottom: 1px solid #f8f8f8;
        overflow: hidden;
        .iconList{
            height: 80px;
            display: flex;
            align-items: center;
            width: 800px;
            .iconItem{
                margin: 0 15px 0 20px;
                width: 55px;
                height: 60px;
                .icon{
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    background-color:red;
                    margin: 0 auto;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .title{
                    width: 55px;
                    font-size: 12px;
                    text-align: center;
                    transform: scale(0.7);
                    letter-spacing: 0.6px;
                }
            }
        }
    }
</style>