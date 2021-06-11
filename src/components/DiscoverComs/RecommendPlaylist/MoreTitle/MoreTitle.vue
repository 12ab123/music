<template>
    <div id="moreTitle">
            <div class="title">{{title}}</div>
            <div class="more">{{more}}</div>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: '推荐歌单'
            },
            more: {
                type: String,
                default: "更多 >"
            }
        }
    }
</script>

<style lang="less" scoped>
    #moreTitle{
        height: 45px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        box-sizing: border-box;
        .title{
            font-size: 15px;
            letter-spacing: 1.5px;
        }
        .more{
            border-radius: 7px;
            padding: 3px 8px;
            position: relative;
            height: 10px;
            text-align: center;
            &::before{
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                border: 1px solid #ccc;
                border-radius: 10px;
            }
        }
    }
</style>