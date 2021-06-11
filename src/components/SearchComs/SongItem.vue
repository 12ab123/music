<template>
    <div id="songItemContainer">
        <van-cell @click="clickSong(songInfo.id)" v-for="(songInfo , index) in searchData" :key="songInfo.id" class="songItem" clickable center>
            <template #title>
                <div class="title">
                    <div class="seniority" v-if="isShowSeniority">{{++index}}</div>
                    <div class="inner">
                        <div class="songTitle">{{songInfo.name}}</div>
                        <div class="label">{{songInfo.ar ? songInfo.ar[0].name : songInfo.artists[0].name}}</div>
                    </div>
                </div>
            </template>
            <template #right-icon>
                <van-icon class="iconfont"   class-prefix='icon' name="dian" @click.stop="showSongInfoPop(songInfo.id)" />
            </template>
        </van-cell>

        
    </div>
</template>

<script>
    import { SONGID } from '@/vuex/mutations-types'
    import { ISSHOWSONGINFOPOP, SONGINFOPOPID } from '@/vuex/mutations-types'
    export default {
        data () {
            return {
            }
        },

        props: {
            searchData: {
                type: Array,
            },
            isShowSeniority: {
                type: Boolean,
                default: false
            }
        },

        mounted () {
            
        },

        methods: {
            clickSong (id) {
                this.$store.commit(SONGID,id)
            },   
            
            showSongInfoPop (id) {
                this.$store.commit(ISSHOWSONGINFOPOP,true)
                this.$store.commit(SONGINFOPOPID,id)
            }
        },

        
    }
</script>

<style lang="less" scoped>
    #songItemContainer{
        .songItem{
            height: 56px;
            .title{
                display: flex;
                width: 280px;
                .seniority{
                    height: 56px;
                    width: 30px;
                    text-align: center;
                    line-height: 56px;
                    font-size: 15px;
                    color: #bfbfbf;
                }
                .inner{
                    margin-left: 10px;
                    .songTitle{
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

            }

        }

        
    }
</style>