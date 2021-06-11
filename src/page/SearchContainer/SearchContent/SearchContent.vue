<template>
    <div id="searchContent">
        <SearchInput/>
        <div class="searchContentContainer">
            <van-tabs v-model="active"  swipeable animated background="transparent">
                <van-tab title="综合"><Synthesize :changeActive=changeActive /></van-tab>
                <van-tab title="单曲"><Single :changeActive=changeActive /></van-tab>
                <van-tab title="歌单"><SongList :changeActive=changeActive /></van-tab>
                <van-tab title="视频"><Video :changeActive=changeActive /></van-tab>
                <van-tab title="声音"><Audio :changeActive=changeActive /></van-tab>
                <van-tab title="播单"><SowingSingle :changeActive=changeActive /></van-tab>
                <van-tab title="云圈"><CloudCircle :changeActive=changeActive /></van-tab>
                <van-tab title="歌手"><Singer :changeActive=changeActive /></van-tab>
                <van-tab title="专辑"><Album :changeActive=changeActive /></van-tab>
                <van-tab title="用户"><User :changeActive=changeActive /></van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
    import SearchInput from '@/components/SearchComs/SearchInput'

    import Synthesize from '@/components/SearchComs/Synthesize'         // 综合
    import Single from '@/components/SearchComs/Single'                 // 单曲
    import SongList from '@/components/SearchComs/SongList'             // 歌单
    import Video from '@/components/SearchComs/Video'                   // 视频
    import Audio from '@/components/SearchComs/Audio'                   // 声音
    import SowingSingle from '@/components/SearchComs/SowingSingle'     // 播单
    import CloudCircle from '@/components/SearchComs/CloudCircle'       // 云圈
    import Singer from '@/components/SearchComs/Singer'                 // 歌手
    import Album from '@/components/SearchComs/Album'                   // 专辑
    import User from '@/components/SearchComs/User'                     // 用户



    export default {
        data () {
            return {
                active: 0
            }
        },
        components: {
            SearchInput,
            Synthesize,
            Single,
            SongList,
            Video,
            Audio,
            SowingSingle,
            CloudCircle,
            Singer,
            Album,
            User
        },

        methods: {
            changeActive (to) {
                this.active = to                
            },
        }
       
        
    }
</script>

<style lang="less" scoped>
    #searchContent{
        padding: 0 20px;
        .searchContentContainer{
            margin-top: 20px;
            padding-bottom: 50px;
        }
    }
</style>