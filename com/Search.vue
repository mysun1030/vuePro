<template>
    <div id='searchPag' ref='pagScroll'>
        <div id='searchHeader'>
            <span class="search-item" @click="backHome()">首页</span>
            <div class="middle">
                <img src="./../img/logo.png" />
                <span class="city"></span>
            </div>
            <span class='toLogin'>登录</span>
            <span class="search">&#xe651;</span>
        </div>
        <div id='searchContent'>
            <div class="tab-item">
                <div @click="tabs(index)" v-for='(item,index) in tabInfo' :key="index" class="tab-item-localation tabDiv">{{item.class}}</div>
            </div>
            <!--location res  -->
            <p class="tips">根据关键字{{$route.query.keyword}}为您推荐以下商品</p>
            <div class="location">
                <ul>
                    <li @click="godetail(item.enjoy_url)" v-for="(item,index) in location" :key="index">
                        <img :src="item.product_image"/>
                        <div class="products-info">
                            <span class="name">{{item.name}}</span>
                            <span class='price'>{{item.price/100}}元/{{item.show_entity_name}}</span>
                            <span class="original_price">￥{{item.original_price/100}}</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="nation">
                <ul>
                   <li @click="godetail(item.enjoy_url)" v-for='(item,index) in nation' :key="index">
                       <img :src="item.product_image"/>
                        <div class="products-info">
                            <span class="name">{{item.name}}</span>
                            <span class='price'>{{item.price/100}}元/{{item.show_entity_name}}</span>
                            <span v-show="original_price" class="original_price">￥{{item.original_price/100}}</span>
                        </div>
                   </li>
                </ul>
            </div>
            <img v-if="isShow" class="loading-img" src="/img/loading.gif" />
        </div>
    </div>
</template>

<script>
import MyAjax from './../md/MyAjax';
export default {
    data() {
        return {
            tabInfo: [
                { "class": "本地服务" },
                { "class": "全国送" }
            ],
            location:[],
            nation:[],
            page:0,
            original_price:true,
            proid:'',
            isShow:true
        }
    },
    created(){
        var self = this;
        $(window).scroll(function(){
            let scrollTop = $(this).scrollTop();
            let scrollHeight = $(document).height();
            let windowHeight = $(this).height();
            if(scrollTop + windowHeight === scrollHeight){
                self.getMoreData()
            }
        })
    },
    methods: {
        backHome() {
            this.$router.push({
                name: 'home'
            })
        },
        godetail(str){
        	 var str = str.split('?')[1];
             this.$router.push({
                name:'detail',
                query:{
                    id:str
                }
            })
        	
        },
        tabs(index) {
            if (index == 0) {
                $('.location').css('display', 'block');
                $('.nation').css('display', 'none')
            } else if (index == 1) {
                $('.location').css('display', 'none');
                $('.nation').css('display', 'block');
            }
            $('.tabDiv').eq(index).addClass('active').siblings().removeClass('active')
        },
        getMoreData(){
            var that = this;
            var cityID = this.$route.query.cityID;
            var keyword = this.$route.query.keyword;
            that.page++;
            var page = that.page;
            var locationUrl = 'https://api.ricebook.com/3/enjoy_product/search.json?city_id=' + cityID + '&keyword=' + keyword + '&page='+page;
            var nationUrl = 'https://api.ricebook.com/3/enjoy_product/search.json?city_id=1&keyword=' + keyword + '&page='+page;
            MyAjax.fetch(locationUrl, function (res) { 
            	
                that.location = that.location.concat(res.products);
            }, function (err) { console.log(err) })
            MyAjax.fetch(nationUrl,function(re){
            	
            that.nation =that.nation.concat(re.products);
            for(var i in re.products){
                if(re.products[i].original_price == undefined){
                  that.original_price = false;
                }else{
                     that.original_price = true;
                }
            }
            },function(err){console.log(err)})
        }
    },
    mounted() {
        var that = this;
        $('.tabDiv').eq(0).addClass('active');
        var cityID = this.$route.query.cityID;
        var keyword = this.$route.query.keyword;
        var page = that.page;
        var locationUrl = 'https://api.ricebook.com/3/enjoy_product/search.json?city_id=' + cityID + '&keyword=' + keyword + '&page='+page;
        var nationUrl = 'https://api.ricebook.com/3/enjoy_product/search.json?city_id=1&keyword=' + keyword + '&page=0'
        MyAjax.fetch(locationUrl, function (res) { 
            that.location = res.products;
            }, function (err) { console.log(err)})
        MyAjax.fetch(nationUrl,function(re){
            that.nation = re.products;
            console.log(re)
            for(var i in re.products){
                if(re.products[i].original_price == undefined){
                  that.original_price = false;
                }else{
                     that.original_price = true;
                }
            }
            },function(err){console.log(err)})
        
        setTimeout(function(){
        	that.isShow=false
        },1500)
    }
    
}
</script>

<style>

</style>
