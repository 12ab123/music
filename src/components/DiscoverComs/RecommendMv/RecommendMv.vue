<template>
    <div id="recommendMv">
        <MoreTitle title="精选MV"/>
        <RecommendMvScroller/>
    </div>
</template>

<script>
    import MoreTitle from '../RecommendPlaylist/MoreTitle/MoreTitle'
    import RecommendMvScroller from './RecommendMvScroller/RecommendMvScroller'
    export default {
        components: {
            MoreTitle,
            RecommendMvScroller
        }
    }
</script>

<style lang="less" scoped>

</style>