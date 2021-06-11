
import { CHANGESEARCHKEYWORDS } from '@/vuex/mutations-types'


export default {
    data () {
        return {
            a: '我是mixin'
        }
    },

    methods: {
        searchAndSkip (search,historyList) {
            if(search === historyList[0]) return
            historyList.unshift(search)
            localStorage.setItem('historyList',JSON.stringify(historyList))
            this.$store.commit(CHANGESEARCHKEYWORDS,search)
            this.$router.push(`/search/searchcontent/${search}`)
        },


    }
}