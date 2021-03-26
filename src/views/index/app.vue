<template>
    <div class="app" >
      <section class="banner" >
        <div class='banner-1' ></div>
      </section>
    </div>
</template>

<script >
    export default {
        name: '',
        data() {
            return {
                title:'hello world'
            }
        },
        created(){
          
        },
        mounted(){
          this.$nextTick(()=>{
            document.querySelector('.banner').style.height = window.innerHeight + 'px'
          })
        }
    }
</script>

<style lang="scss">
    @import "@/style/_root.scss";
    @import "@/style/_reset.scss";
    @import "@/style/_extend.scss";
    @import "@/style/_icons.scss";
    html{
        height:100%;
    }
    body{
        min-height: 100%;
        background-color: #fef5f0;
    }
    .app{
        min-height:100%;
        
        color:$pink;
        // @include bg('icons.png');
        // @include sprite($zan);
    }
    .banner-1{
      width:100%;
      height:100%;
      @include bg('banner-1.png',center bottom);
    }
</style>