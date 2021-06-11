<template>
    <div id="container">
        <div id="List" v-for="(list,index) in info" :key="index">
            <div class="header van-hairline--bottom" v-show="list.title">
                <div class="title">{{list.title}}</div>
            </div>
            <van-cell  v-for="(item , index) in list.list" :key="index" :title="item.name" is-link >
                <van-icon class="iconfont" class-prefix='icon' slot="icon"  
                :name="item.icon.slice(5)"></van-icon>
            </van-cell>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            info: {
                type: Array,
                required: true
            },
        }
    }
</script>

<style lang="less" scoped>
    #List{
        background-color: white;
        border-radius: 10px;
        width: 100%;
        margin-top: 20px;
        overflow: hidden;
        .header{
            width: 100%;
            height: 30px;
            .title{
                font-size: 12px;
                transform: scale(0.9);
                color: #cacaca;
                line-height: 30px;
                letter-spacing: 2px;
            }
        }
        .iconfont{
            font-size: 20px;
            margin-right: 10px;
        }
    }
</style>