<template>
    <div id="kindPag">
        <div id='kindHeader'>
            <span class="header-item" @click="backHome()">首页</span>
            <div class="middle" @click="choseCity()">
                <img src="./../img/logo.png" />
                <span class="city"></span>
                <span class="sel">&#xe603;</span>
            </div>
            <span class='toLogin' @click="toLginOrPer()"></span>
            <span class="search" @click="showSearch()">&#xe651;</span>
            
            <ul  class="logined-panel">
				<li>我的订单</li>
				<li>我的礼卷</li>
				<li @click="singOut()">登出</li>
			</ul>
            
            
        </div>
        <div class="kindContent">
            <div class="cate-list">
                <div class="cate-section" v-for="(item,index) in cityInfo" :key="index">
                    <p class="caption">{{item.name}}</p>
                    <ul>
                        <li v-for='(liItem,index) in item.sub_category_list' @click="golist(liItem.id)" :border-s="index" :id="liItem.id" :key="index">{{liItem.name}}</li>
                    </ul>
                </div>
            </div>

            <div class="kindSearchBtn">
				<input class="searchInput" type="text" placeholder="搜索本地精选 / 送货到家" />
				<span @click="searchRes()">搜索</span>
			</div>

            <ul class="cityList">
                <p>本地服务开通的城市</p>
                <li @click="cityCategory($event)" v-for="(city,index) in cityList" :name='city.city' :cityID='city.city_id' :key="index">{{city.city}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import MyAjax from './../md/MyAjax';
export default {
    data() {
        return {
            cityInfo: [],
            cityList: [],
            cityID: this.$route.query.cityID,
            show: true
        }
    },
    methods: {
        backHome() {
            this.$router.push({
                name: 'home'
            })
        },
        singOut(){
        	localStorage.clear()
        },
        toLginOrPer(){
            var hadlogin = localStorage.getItem('hadlogin');
            if(hadlogin == null){
                this.$router.push({
                    name:'login'
                })
            }else{
                $(".logined-panel").toggle();
            }
        },
        golist(id){
            var that = this;
            var cityID = that.cityID;
            var liatObj = {
                cityID:cityID,
                id:id
            }
            this.$router.push({
                name:'list',
                query:{
                    cityID:cityID,
                    id:id
                }
            })
        },
        cityCategory(ev) {
            var that = this;
            var cityID = ev.target.getAttribute('cityID');
            var cityName =  ev.target.getAttribute('name');
            $('.city').html(cityName)
            var url = 'https://api.ricebook.com/hub/home/v1/virtual/category.json?city_id=' + cityID + '&is_new_local=true';
            MyAjax.fetch(url, function (res) {
                
                that.cityInfo = res;
            }, function (err) { console.log(err) })
            $('.cate-list').css('display', 'block');
            $('.cityList').css('display', 'none')
        },
        choseCity() {
            var that = this;
            var flag = that.show;
            if (flag) {
                $('.cate-list').css('display', 'none');
                $('.cityList').css('display', 'block')
                that.show = false;
            }
            if (!flag) {
                $('.cate-list').css('display', 'block');
                $('.cityList').css('display', 'none');
                that.show = true;
            }
            var url = './../add.json';
            MyAjax.fetch(url, function (re) {
                that.cityList = re.citys;
            }, function (err) { console.log(err) })
        },
        showSearch(){
            $('.kindSearchBtn').toggle();
        },
        searchRes(){
            var that = this;
			var $inputVal = $('.searchInput').val();
			var cityID = that.cityID;
				if($inputVal != ''){
					this.$router.push({
					name: 'search',
					query: { keyword: $inputVal ,cityID: cityID}
				})
			}
        }
    },
    mounted() {
        var that = this;
        var cityID = that.cityID;
        var cityName = this.$route.query.cityVal;
        var hadlogin = localStorage.getItem('hadlogin')
        if(hadlogin == null){
            $('.toLogin').html('登录')
        }else{
             $('.toLogin').html('&#xe654;')
        }

        $('.city').html(cityName);
        var url = 'https://api.ricebook.com/hub/home/v1/virtual/category.json?city_id=' + cityID + '&is_new_local=true';
        MyAjax.fetch(url, function (res) {
            that.cityInfo = res;
            console.log(res)
        }, function (err) { console.log(err) })
    }
}
</script>

<style>

</style>
