<template>
    <div id="classlistPag">
        <div id='classlistHeader'>
            <span class="header-item" @click="backHome()">首页</span>
            <div class="middle">
                <img src="./../img/logo.png" />
                <span class="city">北京</span>
                <span class="sel">&#xe603;</span>
            </div>
            <span class='toLogin' @click="goLogin()">登录</span>
            <span class="search">&#xe651;</span>
        </div>

        <div id="listsearch">
            <div id="content">
                <div class="category-wrapper">
                    <span  class="category-tab">全部</span>
                    <span @click="tosort" class="sort-tab"><span class="intellSort">智能排序</span>
                        <span class="icon">&#xe605;</span>
                    </span>
                </div>

                <div class="category-panel" v-show="sortclass">
                    <ul>
                        <li  v-for="(item,index) in sortList" :key="index" @click="choseSort(index)" class="sort_name">{{item}}</li>
                    </ul>
                </div>
                <ul class="goodslist">
                    <li v-for="(item,index) in proList" :key="index" @click="todetail(item.enjoy_url)">
                        <img :src="item.product_image" />
                        <div class="right">
                            <p>{{item.name}}</p>
                            <div>
                                <span>{{item.price/100}}元/{{item.show_entity_name}}</span>
                                <span v-show="item.original_price">{{item.original_price/100}}</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <img v-if="isShow" class="loading-img" src="/img/loading.gif" />
        </div>

    </div>
</template>

<script>
import MyAjax from './../md/MyAjax.js';
export default {
    data() {
        return {
            id: this.$route.query.id,
            cityID: this.$route.query.cityID,
            proList: [],
            clicksort: false,
            original_price: true,
            sortList:['智能排序','离我最近','价格最低','价格最高'],
            sortclass:false,
            isShow:true
        }
    },
    mounted() {
        var that = this;
        var hadlogin = localStorage.getItem('hadlogin');
		if(hadlogin == null){
			$('.toLogin').html('登录');
		}else{
			$('.toLogin').html('&#xe601;');
		}
        $('.sort_name').eq(0).addClass('active').siblings().removeClass('active')
        console.log(this.id, this.cityID);
        var url = 'https://api.ricebook.com/4/tab/category_product_list.json?category_id=' + this.id + '&sort=1&from_id=0&city_id=' + this.cityID + '&page=0';
        MyAjax.fetch(url, function(re) {
            console.log(re)
            that.proList = re;
            console.log(re)
        }, function(err) { console.log(err) })

        setTimeout(function(){
        	that.isShow=false
        },1800)
    },
    methods: {
        todetail(str) {
            var str = str.split('?')[1];
            this.$router.push({
                name: 'detail',
                query: {
                    id: str
                }
            })
        },
        goLogin() {
            this.$router.push({
                name: 'login'
            })
        },
        backHome(){
            this.$router.push({
                name: 'home'
            })
        },
        tosort() {
            var that = this;
            var flag = that.clicksort;
            var sortShow = that.sortclass;
            if(!sortShow){
                that.clicksort = true;
            }


            if (!flag) {
                $('.icon').html('&#xe600;');
                that. sortclass = true;
            } else {
                $('.icon').html('&#xe605;');
                that.clicksort = false;
            }
        },
        choseSort(index){
            var that = this;
            var arr = that.sortList;
            $('.sort_name').eq(index).addClass('active').siblings().removeClass('active')
            $('.intellSort').html(arr[index]);
            var url = 'https://api.ricebook.com/4/tab/category_product_list.json?category_id=' + this.id + '&sort='+(index+1)+'&from_id=0&city_id=' + this.cityID + '&page=0';
            MyAjax.fetch(url, function(re) {
            that.proList = re;
        }, function(err) { console.log(err) })
            that. sortclass = false;
            $('.icon').html('&#xe605;');
        }
    }
}
</script>

