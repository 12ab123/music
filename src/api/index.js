import myAjax from './myAjax'

// 获取轮播图
export const reqBanner = () => myAjax.get('/banner')


// 获取首页圆形图标的信息
export const reqRoundIcon = () => myAjax.get('/homepage/dragon/ball')


// 获取精选歌单的歌曲
export const reqRecommendPlayList = () => myAjax.get('/personalized',{params: {limit: 6}})


//  获取精选MV的信息
export const reqRecommendMvList = () => myAjax.get('/mv/first',{params: {limit: 6}})








// 获取默认的搜索推荐关键字
export const reqDefaultSearchSong = () => myAjax.get('/search/default')

// 获取热搜榜的歌曲列表
export const reqHotSearchList = () => myAjax.get('/search/hot/detail')

// 通过关键字获取推荐列表(注意: 要做事件防抖)
export const reqRecommendList = (keywords) => myAjax.get('search/suggest',{params: {keywords, type: "mobile"}})





// 通过关键字获取数据
export const reqSearchData = ({limit,type,offset,keywords}) => myAjax.get('/search',{params:{
    limit,
    type,
    offset,
    keywords 
}})





// 通过歌曲id获取歌曲播放链接以及其他歌曲相关信息
export const reqSongLink = (id) => myAjax.get('/song/url',{params:{
    id: id
}})


// 通过歌曲id获取歌曲详情信息
export const reqSongInfo = (ids) => myAjax.get('/song/detail',{params:{
    ids
}})




// 通过手机号和密码进行登录
export const reqLogin = (phone,md5_password) => myAjax.get('/login/cellphone',{params:{
    phone,
    md5_password
}})


// 通过用户id获取用户详情信息
export const reqUserInfo = (uid) => myAjax.get('/user/detail',{params:{uid}})


// 通过用户id获取用户喜欢歌曲列表
export const reqUserLikeSongs = (uid) => myAjax.get('/likelist',{params:{uid}})


// 发送请求获取歌单详情数据
export const reqSongListInfo = (id) => myAjax.get('/playlist/detail',{params:{id}})