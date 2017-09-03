<template>
	<div id="invitePag">
		<div id='inviteContent'>
			<img class="banner" src="/img/banner.jpg" />
			<div class="desc">
				邀请好友加入ENJOY，给TA发放价值50元礼券。好友完成首单消费后，你亦可获得价值50元礼券。
			</div>
			<button class="invite-btn">
				即刻邀请
			</button>
		</div>

		<div id='homeFooter'>
			<v-footer></v-footer>
		</div>
	</div>
</template>

<script>
import Footer from './MainFooter.vue';
export default {
	data() {
		return {

		}
	},
	mounted() {
		var login = localStorage.getItem('hadlogin');
		if (login == null) {
			this.$router.push({
				name: 'login'
			})
		}
	},
	components: {
		'v-footer': Footer
	}
}
</script>


