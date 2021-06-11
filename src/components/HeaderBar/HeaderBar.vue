<template>
    <div id="headerContainer">
        <slot name="left">
            <div class="iconfont icon-menu-2-line left" @click="changePopUp"></div>
        </slot>
        <slot name="content">

        </slot>
        <slot name="right">

        </slot>
    </div>
</template>

<script>
    import { CHANGEPOPUPISSHOW } from '@/vuex/mutations-types'
    export default {
        methods: {
            changePopUp () {
                this.$store.commit(CHANGEPOPUPISSHOW,true)
            }
        }
    }
</script>

<style lang="less" scoped>
    #headerContainer{
        background-color: #f5f5f5;
        z-index: 999;
        position: fixed;
        left: 0;
        top: 0;
        display: flex;
        height: 60px;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        .left,.right{
            width: 50px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            font-size: 23px;
            color: #171413;
        }
        .input{
            flex: 1;
            height: 35px;
            background-color: #ccc;
            border-radius: 15px;
            opacity: 0.2;
        }
    }
</style>