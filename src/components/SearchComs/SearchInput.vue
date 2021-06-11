<template>
    <div class="search">
        <div @click="$router.back()" class=" back iconfont icon-left"></div>
        <div class="input">
            <input type="text" ref="input" @blur="inputBlur"   v-model="inputText" @keydown="changeInput"   @keyup.enter="inputEnter" :placeholder="defaultSong[1]">
            <div class="recommedList" v-show="(recommedList.length !== 0)">
                <van-list>       
                    <van-cell @click="recommendSearch(inputText)" class="oneRecommend" clickable :title="`搜索  ${inputText}`"></van-cell>
                    <van-cell @click="recommendSearch(item.keyword)" icon="search" clickable v-for="(item , index) in recommedList" :key="index" :title="item.keyword" />
                </van-list>
            </div>
        </div>
        
    </div>
</template>

<script>
    import { reqDefaultSearchSong, reqRecommendList } from '@/api'
    import { CHANGESEARCHKEYWORDS } from '@/vuex/mutations-types'
    import minix from '@/minix/index.js'
    import { mapState } from 'vuex'
    export default {
        data () {
            return {
                defaultSong: [],
                inputText: '',
                recommedList: [],

            }
        },

        mixins: [minix],

        props: {
            historyList: {
                type: Array,
            },
        },

        mounted () {
            this.getDefaultSong()
            // 判断当前搜索框所在的路由位置,如果不在search路由中,就在搜素框中显示vuex中存入的文本
            if(!(this.$route.path === '/search/input')){
                this.inputText = this.$store.state.searchKeywords
            }
            
        },

        

        methods: {
            async getDefaultSong () {
                let result = await reqDefaultSearchSong()
                this.defaultSong = [result.data.realkeyword,result.data.showKeyword]
            },

            // 点击搜索框的回车进行的回调
            inputEnter () {
                let search 
                !!this.inputText.trim() ? (search = this.inputText) :  (search = this.defaultSong[0])
                this.searchAndSkip(search,this.$store.state.historySearchList)
            },

            // 点击通过关键字搜素到的推荐歌曲的回调
            recommendSearch (search) {
                console.log(1)
                this.searchAndSkip(search,this.$store.state.historySearchList)
                // this.inputText = this.$store.state.searchKeywords
            },

            // 清除搜索记录
            clearHistoryList () {
                this.historyList = []
                localStorage.setItem('historyList',JSON.stringify(this.historyList))
            },

            changeInput () {
                this.timer && clearTimeout(this.timer)
                this.timer = setTimeout(async ()=>{
                    let result = await reqRecommendList(this.inputText)
                    this.recommedList =!(result.result) ? [] :  (JSON.stringify(result.result) == "{}") ? []  :  result.result.allMatch
                },200)
            },

            inputBlur () {
                setTimeout(()=>{
                    this.recommedList = []
                },)
            }
          
            
        },

        watch : {
            
        }

        
    }
</script>

<style lang="less" scoped>
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
                border-bottom: 1px solid #9a9a9a;
                margin-left: 10px;
                position: relative;
                font-size: 14px;
                input{
                    width: 100%;
                    position: absolute;
                    bottom: 5px;
                    left: 0;
                    background-color: transparent;
                }
                .recommedList{
                    position: absolute;
                    width: 100%;
                    left: 0;
                    top: 120%;
                    box-shadow:
                        0 3.8px 13.1px rgba(0, 0, 0, 0.038),
                        0 12px 26.8px rgba(0, 0, 0, 0.055),
                        0 53px 80px rgba(0, 0, 0, 0.09)
                        ;
                    z-index: 999;
                    .oneRecommend{
                        color:blue;
                    }
                }
            }
            
        }
</style>