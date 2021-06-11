<template>
    <van-tabbar v-model="active" active-color="#ee0a24" inactive-color="#b3b3b3" route>
        <van-tabbar-item to="/discover">   
            <!-- 将vant中的tabbar中的图标改为iconfont中的图标 -->
            <van-icon class="iconfont" class-prefix='icon' slot="icon"  
            name='music_albums_fill'></van-icon>
            <p>发现</p>
        </van-tabbar-item>

        <van-tabbar-item to="/podcast">
            <van-icon class="iconfont" class-prefix='icon' slot="icon"  
            name='broadcast'></van-icon>
            <p>播客</p>
        </van-tabbar-item>

        <van-tabbar-item to="/my/myInfo">
            <van-icon class="iconfont" class-prefix='icon' slot="icon"  
            name='music'></van-icon>
            <p>我的</p>
        </van-tabbar-item>

        <van-tabbar-item to="/ksong">
            <van-icon class="iconfont" class-prefix='icon' slot="icon"  
            name='microphone-1'></van-icon>
            <p>K歌</p>
        </van-tabbar-item>

        <van-tabbar-item to="/cloudvillage">
            <van-icon class="iconfont" class-prefix='icon' slot="icon"  
            name='people'></van-icon>
            <p>云村</p>
        </van-tabbar-item>
    </van-tabbar>
</template>

<script>

    export default {
        data () {
            return {
                active: 0
            }
        }
    }
</script>

<style lang="less" scoped>

    .iconfont{
        font-size: 25px;
        margin-bottom: -10px;
    }
    p{
        font-size: 12px;
        transform: scale(0.7);
    }

</style>