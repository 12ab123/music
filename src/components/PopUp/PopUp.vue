<template>
    <van-popup v-model="isShowPopUp" @opened="open" @click-overlay="zhezhaoChangePopUp" position="left" :style="{ width: '80%', height: '100%' }" >
        <div id="popUp" ref="popUp">
            <div class="popUpContainer">
                <div class="header">
                    <div class="headerImg">
                        <img :src="$store.state.userInfo.imgSrc" alt="">
                    </div>
                    <div class="name">{{$store.state.userInfo.userName ? $store.state.userInfo.userName : '请先登录'}}</div>
                    <div class="right"> > </div>
                </div>

                <div class="VinylMember">
                    <div class="top">
                        <div class="open">开通黑胶VIP</div>
                        <div class="VIP">会员中心</div>
                    </div>
                    <div class="centent van-hairline--bottom">立享超17项专属特权 > </div>
                    <div class="down">
                        <div class="firstMonth">限时特惠 ! 黑胶首月仅0.88元!</div>
                    </div>
                </div>

                <List :info="group"/>

                <van-button  type="default" class="logOut" @click="logout">退出登录/关闭</van-button>
            </div>
        </div>
    </van-popup>
</template>

<script>
    import { CHANGEPOPUPISSHOW } from '@/vuex/mutations-types'
    import BScroll from 'better-scroll'
    import List from './List/List'
    import popUpListInfo from '@/unit/popUpListInfo'
    import { USERINFO, ISLOGIN } from '@/vuex/mutations-types'
    import { Dialog } from 'vant';
    export default {
        data () {
            return {
                group: []
            }
        },

        components: {
            List
        },

        computed: {
            isShowPopUp : {
                get () {
                    return this.$store.state.isShowPopUp;
                },
                set (value) {
                    this.$store.commit(CHANGEPOPUPISSHOW,value)
                }
            }
            // 不使用mapState的原因, 如果修改了值,必须加上set方法(计算属性 isShowPopUp被赋值了，但此它并未定义 set方法)
            // ...mapState(['isShowPopUp'])
        },

        methods: {
            // 点击遮罩层关闭弹出层
            zhezhaoChangePopUp () {
                this.isShowPopUp = false
            },

            // 当弹出层全部弹出时,实例化滚动条,原因: 不弹出时弹出层的DDOM节点没有生成
            open () {
                // 生成之后不需要再次生成
                this.popUpScroll || (this.popUpScroll = new BScroll('#popUp',{
                    preventDefaultException: {className:/(^|\s)van-cell|iconfont|van-cell__title|van-icon|logOut(\s|$)/,tagName: /^(SPAN)$/},
                    stopPropagation: true,      // 事件冒泡.默认为false
                    bounce: false               // 禁止滚动溢出,默认为true
                }))
            },


            logout () {
                Dialog.confirm({
                title: '',
                message: '确定退出当前账号吗?',
                })
                .then(() => {
                    sessionStorage.removeItem('id')
                    this.$store.commit(USERINFO,{imgSrc:'https://p4.music.126.net/SUeqMM8HOIpHv9Nhl9qt9w==/109951165647004069.jpg'})
                    this.$store.commit(ISLOGIN,false)
                    this.$router.replace('/login')
                    this.isShowPopUp = false
                })
                .catch(() => {
                    // on cancel
                });

                
            }
        },

        mounted () {
            this.group = popUpListInfo 
        }
    }
</script>

<style lang="less" scoped>
    #popUp{
        width: 100%;
        height: 100%;
        overflow: hidden;
        .popUpContainer{
            width: 100%;
            padding: 0 20px;
            box-sizing: border-box;
            background-color: #f5f5f5;
            height: 1300px;

            .header{
                height: 60px;
                width: 100%;
                display: flex;
                align-items: center;
                .headerImg{
                    img{
                        width: 26px;
                        height: 26px;
                        border-radius: 50%;
                    }
                }
                .name{
                    width: 170px;
                    font-size: 14px;
                    letter-spacing: 1.5px;
                    margin:0 10px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    position: relative;
                }
                .right{
                    font-size: 15px;
                    font-weight: 900;
                }
            }

            .VinylMember{
                width: 100%;
                height: 105px;
                background-image: linear-gradient(to right,#8a8a8a,#b6b6b6);
                border-radius: 15px;
                padding-right: 15px;
                padding-left: 15px;
                padding-top: 10px;
                padding-bottom: 10px;
                box-sizing: border-box;
                .top{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .open{
                        font-size: 18px;
                        letter-spacing: 1px;
                        color: white; 
                    }
                    .VIP{
                        font-size: 12px;
                        transform: scale(0.8);
                        letter-spacing: 2px;
                        padding-right: 10px;
                        padding-left: 10px;
                        padding-top: 7px;
                        padding-bottom: 7px;
                        color: #e7e7e7;
                        border: 1px solid #e7e7e7;
                        border-radius: 15px;
                        text-align: center;
                    }
                }
                .centent{
                    font-size: 12px;
                    letter-spacing: 1.4px;
                    color: #bebebe;
                    height: 30px;
                    // position: relative;
                    // &::after{
                    //     content: '';
                    //     position: relative;
                    //     position: absolute;
                    //     width: 100%;
                    //     left: 0;
                    //     bottom: 0;
                    //     border-bottom: 1px solid #c2bcbc;

                    // }
                }
                .down{
                    display: flex;
                    justify-content: space-between;
                    height: 30px;
                    align-items: center;
                    .firstMonth{
                        font-size: 12px;
                        letter-spacing: 1.4px;
                        color: #bebebe;
                    }
                    
                }
            }

            .logOut{
                margin-top: 10px;
                width: 100%;
                border-radius: 10px;
                color: red;
                letter-spacing: 2px;
            }
        }
    }
</style>