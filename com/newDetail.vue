<template>
	<div id="detailPag">
		<div id='detailHeader'>
			<span class="header-item">首页</span>
			<div class="middle">
				<img src="./../img/logo.png" />
				<span class="city"></span>
			</div>
			<span class='toLogin'>登录</span>
			<span class="search">&#xe651;</span>
			<ul class="logined-panel">
				<li>我的订单</li>
				<li>我的礼卷</li>
				<li>登出</li>
			</ul>
		</div>
		<div class="detailContent">
			<div class="searchBtn">
				<input class="searchInput" type="text" placeholder="搜索本地精选 / 送货到家" />
				<span @click="searchRes()">搜索</span>
			</div>
			
			<div class="swiper-container" id="swiper">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="(img,index) in product_images" :key="index">
						<img :src="img.img_url" />
					</div>
				</div>
				<div class="swiper-pagination"></div>
			</div>
			<div id='info'>
                <p class="title">{{basic.short_name}}-{{basic.spec}}</p>
                <span  class="heart" @click="islove()">&#xe629;</span>
                <p class='desc'>{{basic.description}}</p>
                <p class="price">
                    <span class="r-price">{{basic.price/100}}元 /{{basic.show_entity_name}}</span>
                    <span class="o-price">￥{{basic.origin_price/100}}</span>
                    <span class="status">
                        <span class="gap"></span>
                        <span>随时退</span>
                    </span>
                </p>
                <div class='tags'>
                    <span>城市招聘</span>
                </div>
            </div>
            <div class="panel-gap"></div>
            
            
            <div id="">
            	
            </div>
            
		</div>
	</div>
</template>

<script>
	import MyAjax from './../md/MyAjax.js';
	export default {
		data() {
			return {
				basic: [],
				product_images: [],
				modules: []
			}
		},
		updated() {
			var swiper = new Swiper('.swiper-container', {
				pagination: '.swiper-pagination',
				paginationClickable: true,
				loop: true,
				autoplay: 2000
			});
		},
		mounted() {
			var that = this;
			var url = 'https://api.ricebook.com/product/info/product_detail.json?product_id=1008749';
			MyAjax.fetch(url, function(res) {
				console.log(res)
				that.basic = res.basic;
				that.product_images = res.basic.product_images;
				that.modules = res.modules;
				console.log(that.basic, that.modules)
			}, function(err) {
				console.log(err)
			})
		}
	}
</script>

<style>

</style>