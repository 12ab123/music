import Discover from '@/page/Discover/Discover.vue'
import Podcast from '@/page/Podcast/Podcast.vue'
import My from '@/page/My/My.vue'
import KSong from '@/page/KSong/KSong.vue'
import CloudVillage from '@/page/CloudVillage/CloudVillage.vue'
import SearchContainer from '@/page/SearchContainer/SearchContainer.vue'
import Login from '@/page/Login/Login.vue'
import SongList from '@/page/SongList/SongList.vue'


import SearchContent from '@/page/SearchContainer/SearchContent/SearchContent'
import Search from '@/page/SearchContainer/Search/Search'
import LikeSongList from '@/page/My/LikeSongList/LikeSongList.vue'
import MyInfo from '@/page/My/MyInfo/MyInfo.vue'




export default [
    {
        path: '/discover',
        component: Discover
    },
    {
        path: '/podcast',
        component: Podcast
    },
    {
        path: '/my',
        component: My,
        children: [
            {
                path: '/my/likesonglist',
                component: LikeSongList
            },
            {
                path: '/my/myInfo',
                component: MyInfo
            },
            {
                path: '/my',
                redirect: '/my/myInfo'
            }
        ]
            
    },
    {
        path: '/ksong',
        component: KSong
    },
    {
        path: '/cloudvillage',
        component: CloudVillage
    },
    {
        path: '/search',
        component: SearchContainer,
        children: [
            {
                path: '/search/searchcontent/:keywords',
                component: SearchContent
            },
            {
                path: '/search/input',
                component: Search
            },
            {
                path: '/search',
                redirect: '/search/input'
            },
            {
                path: '/search/songList/:id',
                component: SongList,
            },
        ]
    },
    {
        path: '/login',
        component: Login,
    },

    {
        path: '/',
        redirect: '/discover'
    }
]