<template>
    <div id="MainFooter">
        <ul class="footerul">
            <li class="footerli"><router-link :to="{name:'home'}"><span>&#xe609;</span></router-link></li>
            <li class="footerli"><router-link :to="{name:'discovery'}"><span>&#xe607;</span></router-link></li>
            <li  class="footerli"><router-link :to="{name:'invite'}"><span>&#xe662;</span></router-link></li>
            <li class="footerli"><router-link :to="{name:'my'}"><span>&#xe654;</span></router-link></li>
        </ul>
        <img v-if="isShow" class="loading-img" src="/img/loading.gif" />
    </div>
</template>

<script>
export default {
    data(){
        return {
			isShow:true
        }
    },
    mounted(){
    	var that=this;
        setTimeout(function(){
        	that.isShow=false
        },1200)
    }
}
</script>

<style lang="scss" scoped>
    #MainFooter{
        width: 100%;
        height: 50px;
        background:#e3e3e3;
         max-width: 640px;
        margin: 0 auto;
        ul{
            width: 100%;
           height: 50px;
            li{
                width: 25%;
                height: 50px;
                text-align: center;
                line-height: 50px;
                font-size: 25px;
                float: left;
                color: #AEAEAE;
                span{
                    font-family: 'iconfont';
                }
                .router-link-exact-active.router-link-active{
                    color: red
                }
            }
            
        }

    }
    .loading-img{
    	position: relative;
    	top: -400px;
    	left: 150px;
    }
</style>

