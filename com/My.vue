<template>
    <div id="myPag">
    	<div id="myContent">
    		<div id="avatar">
    			<div class="logoImg">
    				<img src="https://image.ricebook.com/avatar/1?imageView2/1/w/140/h/140" />
					<p>{{username}}</p>
    			</div>
				
    		</div>

			<ul class="nav-item">
					<li>Code 消费码</li>
					<li>我的礼卷</li>
					<li @click="goAddress">地址管理</li>
				</ul>
    	</div>
    	<div id='homeFooter'>
			<v-footer></v-footer>
		</div>
    </div>
</template>

<script>
import Footer from './MainFooter.vue';
	
export default {
	data(){
		return {
			username:''
		}
	},
	mounted(){
		var login = localStorage.getItem('hadlogin');
		if(login == null){
			this.$router.push({
				name:'login'
			})
		}
		var username = localStorage.getItem('username');
			this.username = username;
	},
	methods:{
		goAddress(){
			this.$router.push({
				name:'address'
			})
		}
	},
	components: {
		'v-footer': Footer
	}
}
</script>

