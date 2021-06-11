
import { 
    CHANGEPOPUPISSHOW, 
    CHANGESEARCHKEYWORDS, 
    HISTORYSEARCHLIST, 
    SONGID, 
    USERINFO, 
    ISLOGIN, 
    ISSHOWSONGINFOPOP, 
    SONGINFOPOPID 
} from './mutations-types'


export default {
    [CHANGEPOPUPISSHOW] (state,isShow) {
        state.isShowPopUp = isShow
    },

    [CHANGESEARCHKEYWORDS] (state,keywords) {
        state.searchKeywords = keywords
    },

    [HISTORYSEARCHLIST] (state,historyList) {
        state.historySearchList = historyList
    },

    [SONGID] (state,id){
        state.songId = id
    },

    [USERINFO] (state,userInfo) {
        state.userInfo = userInfo
    },

    [ISLOGIN] (state,isLogin) {
        state.isLogin = isLogin
    },

    [ISSHOWSONGINFOPOP] (state,isShow) {
        state.isShowSongInfoPop = isShow
    },

    [SONGINFOPOPID] (state,id){
        state.SongInfoPopId = id
    }
}