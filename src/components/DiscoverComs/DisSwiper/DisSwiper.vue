<template>
    <div id="swiperContainer">
        <van-swipe ref="swipe" class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(item , index) in bannerInfo" :key="index">
                    <img :src="item.imageUrl"/>
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
    import {reqBanner} from '@/api'
    export default {
        data () {
            return {
                bannerInfo : []
            }
        },

        mounted () {
            this.getBannerInfo()
        },



        methods: {
            async getBannerInfo () {
                let result = await reqBanner()
                this.bannerInfo = result.banners
            }
        }
    }
</script>

<style lang="less" scoped>
    .van-swipe-item{
        height: 135px;
        width: 100%;
        text-align: center;
        img{
            width: 90%;
            height: 135px;
            border-radius: 10px;
        }
    }
</style>