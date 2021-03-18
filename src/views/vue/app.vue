<template>
    <div class="app" >
        {{title}}
        <img src="@/images/icons.png" alt="">
        <Button type="primary" >view-design import</Button>
    </div>
</template>

<script >
    export default {
        name: '',
        data() {
            return {
                title:'hello world'
            }
        }
    }
</script>

<style lang="scss">
    @import "@/style/_root.scss";
    @import "@/style/_extend.scss";
    @import "@/style/_icons.scss";
    .app{
        color:$pink;
        // @include bg('icons.png');
        // @include sprite($zan);
    }
</style>