<template>
	<div id="discPag">
		<div id='discHeader'>
			<span class="header-item" @click="goHome()">首页</span>
			<div class="middle">
				<img src="./../img/logo.png" />
				<span class="city">{{cityObj.cityName}}</span>
			</div>
			<span class='toLogin' @click="goLogin()">登录</span>
			<span class="search"  @click="goSearch()">&#xe651;</span>
		</div>

		<div id="discContent">
			<div class="searchBtn">
				<input class="searchInput" type="text" placeholder="搜索本地精选 / 送货到家" />
				<span @click="searchRes()">搜索</span>
			</div>

			<div class="selected-recommend">
				<div class="caption">
					<p class='title'>{{proInfo0title}}</p>
					<p class="sub-title">{{proInfo0desc}}</p>
				</div>

				<div class="swiper-container" id='swiper'>
					<div class="swiper-wrapper">
						<div v-for="(item,index) in proInfo0swiper" :key="index" class="swiper-slide">
							<img :src="item.url" />
							<p class="tips">{{item.tag}}</p>
							<p class="title">{{item.title}}</p>
							<p class="sub-title">{{item.desc}}</p>
						</div>
					</div>
				</div>

				<div class='side-slip-column'>
					<div class="swiper-container" id="swipert">
						<div class="swiper-wrapper">
							<div v-for="(item,index) in proInfo1swiper" :key="index" class="swiper-slide">
								<p class="title">{{item.title}}</p>
								<p class="sub-title">{{item.desc}}</p>
							</div>
						</div>
					</div>
				</div>

				<div class="sku-shelf">
					<h3>{{proInfo2title}}</h3>
					<p>{{proInfo2desc}}</p>
					<span class="viewMore">{{proInfo2enjoytext}}</span>
					<ul>
						<li v-for="(item,index) in proInfo2tabs" :key="index">
							<img @click="geDetail(item.enjoy_url)" :src="item.url" />
						</li>
					</ul>
				</div>

				<div class="sku-shelf">
					<h3>{{proInfo3title}}</h3>
					<p>{{proInfo3desc}}</p>
					<span class="viewMore">{{proInfo3enjoytext}}</span>
					<ul>
						<li v-for="(item,index) in proInfo3tabs" :key="index">
							<img :src="item.url" />
						</li>
					</ul>
				</div>

				<div class="sku-shelf">
					<h3>{{proInfo4title}}</h3>
					<p>{{proInfo4desc}}</p>
					<span class="viewMore">{{proInfo4enjoytext}}</span>
					<ul>
						<li v-for="(item,index) in proInfo4tabs" :key="index">
							<img :src="item.url" />
						</li>
					</ul>
				</div>

			</div>
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
			cityObj: [],
			proInfo: [],
			proInfo0title: [],
			proInfo0desc: [],
			proInfo0swiper: [],
			proInfo0: [],
			proInfo1: [],
			proInfo1swiper: [],
			proInfo2: [],
			proInfo2title: [],
			proInfo2desc: [],
			proInfo2enjoytext: [],
			proInfo2tabs: [],
			proInfo3: [],
			proInfo3title: [],
			proInfo3desc: [],
			proInfo3enjoytext: [],
			proInfo3tabs: [],
			proInfo4: [],
			proInfo4title: [],
			proInfo4desc: [],
			proInfo4enjoytext: [],
			proInfo4tabs: []
		}
	},
	mounted() {
		var that = this;
		var cityObj = JSON.parse(localStorage.getItem('cityInfo'));
		this.cityObj = cityObj;
		var hadlogin = localStorage.getItem('hadlogin');
		if (hadlogin == null) {
			$('.toLogin').html('登录');
		} else {
			$('.toLogin').html('&#xe601;');
		}
		var cityID = this.cityObj.cityID;
		var url = 'https://api.ricebook.com/hub/home/v1/web/explore.json?city_id=' + cityID;
		MyAjax.fetch(url, function (re) {
			that.proInfo = re;
			that.proInfo0 = re[0];
			that.proInfo0title = re[0].data.group_section.title;
			that.proInfo0desc = re[0].data.group_section.desc;
			that.proInfo0swiper = re[0].data.tabs;
			that.proInfo1 = re[1];
			that.proInfo1swiper = re[1].data.tabs;
			that.proInfo2 = re[2];
			that.proInfo2title = re[2].data.group_section.title;
			that.proInfo2desc = re[2].data.group_section.desc;
			that.proInfo2enjoytext = re[2].data.group_section.enjoy_url_text;
			that.proInfo2tabs = re[2].data.tabs;
			that.proInfo3 = re[3];
			that.proInfo3title = re[3].data.group_section.title;
			that.proInfo3desc = re[3].data.group_section.desc;
			that.proInfo3enjoytext = re[3].data.group_section.enjoy_url_text;
			that.proInfo3tabs = re[3].data.tabs;
			that.proInfo4 = re[4];
			that.proInfo4title = re[4].data.group_section.title;
			that.proInfo4desc = re[4].data.group_section.desc;
			that.proInfo4enjoytext = re[4].data.group_section.enjoy_url_text;
			that.proInfo4tabs = re[4].data.tabs;
		}, function (err) { console.log(err) })
	},
	updated() {
		var swiper = new Swiper('#swiper', {
			paginationClickable: true,
			spaceBetween: 30,
			loop: true,
			autoplay: 2000,
			autoplayDisableOnInteraction: false
		});
		var swiper = new Swiper('#swipert', {
			slidesPerView: 2,
			centeredSlides: true,
			paginationClickable: true,
			spaceBetween: 30
		});
	},
	methods: {
		goHome() {
			this.$router.push({
				name: 'home'
			})
		},
		goSearch() {
			var that = this;
			$('.searchBtn').toggle();
		},
		goLogin(){
			var hadlogin = localStorage.getItem('hadlogin');
			if(hadlogin == null){
				this.$router.push({
					name:'login'
				})
			}
		},
		geDetail(str){
		    var sid = str.split('?')[1];
			var id = sid.replace(/-/g,'_');
			this.$router.push({
				name:'detail',
				query:{
					id:id
				}
			})
		},
		searchRes() {
			var that = this;
			var $inputVal = $('.searchInput').val();
			var cityID = that.cityObj.cityID;
			if ($inputVal != '') {
				this.$router.push({
					name: 'search',
					query: { keyword: $inputVal, cityID: cityID }
				})
			}
		}
	},
	components: {
		'v-footer': Footer
	}
}
</script>

<style lang="scss" scoped>

</style>
