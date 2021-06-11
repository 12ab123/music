<template>
    <div id="loginContainer">
    
        <div class="header"></div>
        <div class="hello">Hello,</div>

        

        <van-button round type="default" class="oneKeyLogin button"  @click="show = true">一键登录</van-button>
        <van-button round type="default" class="noTry button" @click="$router.replace('/')">立即体验</van-button>


        <div class="moreLogin">其他登录方式</div>

        <div class="moreLoginContainer">
            <div class="img"><img src="../../unit/img/图层 5.png" alt=""></div>
            <div class="img"><img src="../../unit/img/图层 6.png" alt=""></div>
            <div class="img"><img src="../../unit/img/图层 7.png" alt=""></div>
            <div class="img"><img src="../../unit/img/图层 8.png" alt=""></div>
        </div>

        <van-popup 
        v-model="show" 
        position="right" 
        :style="{ height: '100%', width: '100%' }" 
        class="pop"
        >
            <div class="header">
                <van-icon name="arrow-left" class="closePop" @click="show = false"/>
                <div class="title">用户登录</div>
            </div>

            <div class="input">
                <i class="iconfont icon-phone"></i>
                <input type="text"  placeholder="手机号" v-model="phone">
            </div>
            <div class="input">
                <i class="iconfont icon-cc-lock"></i>
                <input type="password"  placeholder="密码" v-model="password">
            </div>

            <van-button round type="default" class="login" @click="login">登录</van-button>

            <div class="footer">
                <img src="../../unit/img/phoneDown.png" alt="">
            </div>
        </van-popup>
    </div>
</template>

<script>
    import md5 from 'js-md5'
    import { reqLogin } from '@/api'
    export default {
        data () {
            return {
                show: false,
                phone: '',
                password: ''
            }
        },

        mounted () {
        },

        methods: {
             login () {
                // 前端验证
                let { phone, password } = this
                if(!phone){
                    this.$toast.fail('手机号不能为空');
                    return
                }
                if(!password.trim()) {
                    this.$toast.fail('密码不能为空');
                    return
                }
                if(!(/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(phone))){
                    this.$toast.fail('手机号格式错误');
                    return
                }


                // 后端验证
                this.ajaxLogin()

            },

            async ajaxLogin () {
                let result = await reqLogin(this.phone,md5(this.password))
                if(result.code === 200){
                    sessionStorage.setItem('id',result.account.id)
                    this.$toast.success('登录成功')
                    this.$router.replace('/my')
                }
                if(result.code === 502){
                    this.$toast.fail('密码错误')
                    this.password = ''
                }

            }
        }
    }
</script>

<style lang="less" scoped>
    #loginContainer{
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: #ffffff;

        .header{
            width: 100%;
            height: 250px;
            background-image: url('../../unit/img/图层 3.png');
            background-size: cover;
        }

        .hello{
            font-size: 60px;
            font-weight: 900;
            margin-left: 20px;
        }

        .button{
            color: #959595;
            background-color: white;
            border: none;
            box-shadow:0 0 3px  #ccc;
            width: 75%;
            font-weight: 900;
            letter-spacing: 2px;
        }
        .oneKeyLogin{
            margin: 100px auto 0 auto;
            display: block;
        }
        .noTry{
            margin: 20px auto 0 auto;
            display: block;
        }

        .moreLogin{
            margin-top: 50px;
            text-align: center;
            font-size: 14px;
            color: #999;
        }

        .moreLoginContainer{
            
            display: flex;
            width: 90%;
            height: 80px;
            margin: 0 auto;
            align-items: center;
            justify-content: space-around;
            div{
                width: 40px;
                height: 40px;
                img{
                    width: 40px;
                    height: 40px;
                }
            }
        }


        .pop{
            padding: 0;
            .header{
                height: 65px;
                width: 100%;
                background-image: linear-gradient(to right, #ff9966, #ff6362);
                margin-bottom: 10px;
                .closePop{
                    margin-left: 15px;
                    line-height: 65px;
                    font-size: 23px;
                    color: white;
                }
                .title{
                    margin-left: -20px;                
                }
            }

            .input{
                width: 80%;
                height: 55px;
                border-bottom: 1px solid #f6f6f6;
                margin: 0 auto;
                display: flex;
                align-items: center;
                .iconfont{
                    font-size: 20px;
                    color: #ccc;

                }
                input{
                    margin-left: 10px;
                    height: 40px;
                    width: 100%;
                }
            }

            .login{
                width: 80%;
                display: block;
                margin: 40px auto;
                background-image: linear-gradient(to right, #ff9966, #ff6362);
                color:white;
            }

            .footer{
                position: absolute;
                width: 100%;
                bottom:0;
                img{
                    width: 100%;
                }
            }
            
        }
    }
</style>

