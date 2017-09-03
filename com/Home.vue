<template>
	<div id="homePag" @scroll="scroll()" ref='scroll'>
		<div id='homeHeader'>
			<span class="header-item" @click="goCategory()">分类</span>
			<div class="middle" @click="showCityList()">
				<img src="./../img/logo.png" />
				<span class="city">北京</span>
				<span class="sel">&#xe603;</span>
			</div>
			<span class='toLogin' @click="goLogin()" >登录</span>
			<span class="search" @click="goSearch()">&#xe651;</span>
			
			<ul  class="logined-panel">
				<li>我的订单</li>
				<li>我的礼卷</li>
				<li @click="singOut()">登出</li>
			</ul>
		</div>
		
		
		<div id="homeContent">
			<div class="searchBtn">
				<input class="searchInput" type="text" placeholder="搜索本地精选 / 送货到家" />
				<span @click="searchRes()">搜索</span>
			</div>
			<div class="index-list" v-for='(item,index) in proList' :key='index'>
				<span class="name">{{item.group_section.title}}</span>
				<span class="updataTime">{{item.group_section.desc}}</span>
				<ul class="goodsList">
					<li  v-for='(imgs,index) in item.tabs'  :key="index">
						<img class="loading" v-show="isloading" src="/img/loading.gif"/>
						<img v-show="loaded"  @click="goDetail($event)" :enjoy-url='imgs.enjoy_url' :src="imgs.url" />
						<p v-show="loaded" class="title">{{imgs.title}}</p>
						<span v-show="loaded" class="discou">{{imgs.desc}}</span>
					</li>
				</ul>
			</div>


			
			<ul class="cityList">
				<p>本地服务开通的城市</p>
				<li @click="backHome($event)" :cityID='city.city_id' :name='city.city' v-for="(city,index) in cityList" :key="index">{{city.city}}</li>
			</ul>
			<span class="gotop" @click="gotop()">top</span>
			<span class="gocar" @click="gocar()">&#xe62a;</span>
			
			
		</div>
		<div id='homeFooter'>
			<v-footer></v-footer>
		</div>
		
	</div>
	
</template>

<script>
import Footer from './MainFooter.vue';
import MyAjax from './../md/MyAjax';
export default {
	data() {
		return {
			proList: [],
			cityList: [],
			page: 0,
			cityID: 140,
			show:true,
			panel:false,
			isloading:true,
			loaded:false
		}
	},
	mounted() {
		var that = this;
		var page = that.page;
		var cityID = that.cityID;
		var cityObj = {
			cityID:cityID,
			cityName:'北京'
		}
		var cityStr = JSON.stringify(cityObj);
		localStorage.setItem('cityInfo',cityStr);
		var hadlogin = localStorage.getItem('hadlogin');
		if(hadlogin == null){
			$('.toLogin').html('登录');
		}else{
			$('.toLogin').html('&#xe601;');
		}
		var url = ' https://api.ricebook.com/hub/home/v1/web/week_choice.json?city_id=' + cityID + '&page=0';
		MyAjax.fetch(url, function (res) {
			that.proList = res;
			that.isloading = false;
			that.loaded = true;
			$(".city").html('北京');
			that.load = false;
		}, function (err) {
			console.log(err)
		})
	},
	methods: {
		gocar(){
			this.$router.push({
				name:"cartlist"
			})
		},
		gotop(){
			var hh=$("#homePag").scrollTop(0);
		},
		backHome(ev) {
			var that = this;
			$(".city").html(ev.target.getAttribute('name'));
			that.cityID = ev.target.getAttribute('cityID');
			var cityObj = JSON.parse(localStorage.getItem('cityInfo'));
				cityObj.cityID = that.cityID;
				cityObj.cityName = ev.target.getAttribute('name');
			var cityStr = JSON.stringify(cityObj);
			localStorage.setItem('cityInfo',cityStr);
			var url = ' https://api.ricebook.com/hub/home/v1/web/week_choice.json?city_id=' + that.cityID + '&page=0';
			MyAjax.fetch(url, function (res) {
				that.proList = res;
			}, function (err) {
				console.log(err)
			})
			$('.index-list').css('display', 'block');
			$("#homeFooter").css('display', 'block');
			$('.cityList').css('display', 'none');
		},
		
		scroll(){
			var outTop =Math.floor(this.$refs.scroll.scrollTop);
			var scrollHeight = this.$refs.scroll.scrollHeight;
			var windowHeight = this.$refs.scroll.offsetHeight;
			var a = scrollHeight-2000;
			var b = outTop+windowHeight;
			if(a<=b){
				var that = this;
				that.page++;
				var cityID = that.cityID;
				var url = ' https://api.ricebook.com/hub/home/v1/web/week_choice.json?city_id='+cityID+'&page=' + that.page;
				MyAjax.fetch(url, function (res) {
					that.proList = that.proList.concat(res);
				}, function (err) {
					console.log(err)
				})
			}
		},
		goLogin(){
			var that = this;
			var hadlogin = localStorage.getItem('hadlogin');
			if(hadlogin == null){
				this.$router.push({
					name:'login'
				})
			}else{
				$(".logined-panel").toggle();
			}
		},
		singOut(){
			localStorage.clear();
			window.location.reload();
		},
		goSearch(){
			var that = this;
			$('.searchBtn').toggle();
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
		},
		goCategory() {
			var that = this;
			var cityID = that.cityID;
			var cityVal = $('.city').html();
			this.$router.push({
				name: 'category',
				query: { cityVal: cityVal,cityID: cityID}
			})
		},
		goDetail(ev){
			var enjoy_url = ev.target.getAttribute('enjoy-url');
			var str = enjoy_url.split('?')[1];
			var id = str.replace(/-/g,'_');
			var cityName = $('.city').html();
			this.$router.push({
				name:'detail',
				query: {id:id,city:cityName}
			})
		},
		showCityList() {
			var that = this;
			var flag = that.show;
			if (flag) {
				$('.index-list').css('display', 'none');
				$("#homeFooter").css('display', 'none')
				$('.cityList').css('display', 'block')
				that.show = false;
			}
			if (!flag) {
				$('.index-list').css('display', 'block');
				$("#homeFooter").css('display', 'block')
				$('.cityList').css('display', 'none')
				that.show = true;
			}
			var url = './../add.json';
			MyAjax.fetch(url, function (res) {
				that.cityList = res.citys;
			}, function (err) {
				console.log(err)
			})
		}
	},
	components: {
		'v-footer': Footer
	}
}
</script>
