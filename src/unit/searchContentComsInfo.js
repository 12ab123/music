
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

export default [
    { title : '综合', component : Synthesize },
    { title : '单曲', component : Single },
    { title : '歌单', component : SongList },
    { title : '视频', component : Video },
    { title : '声音', component : Audio },
    { title : '播单', component : SowingSingle },
    { title : '云圈', component : CloudCircle },
    { title : '歌手', component : Singer },
    { title : '专辑', component : Album },
    { title : '用户', component : User },
]