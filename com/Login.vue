<template>
    <div id="loginPag">
        <div id="loginContent">
            <div @click="backHome()" class="logoImg">
                <img src="./../img/login.png">
            </div>

            <div class="loginBox">
                <input @blur="usernameBlur()" class="username" type="text" placeholder="手机号">
                <input @blur="codeBlur()" class="verificationCode" type="text" placeholder="验证码">
                <span class="code" @click="changenum()">6666</span>
                <span @click="logined()" class="goLogin">登录</span>
                <p class="tips">未注册用户登录后自动创建账户</p>
                <p class="tips">登录即表示你同意用户协议</p>
            </div>

            <div class="toast"></div>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            userflag: false
        }
    },
    methods: {
    	changenum(){
    		var num=Math.floor(Math.random()*9000) + 1000;
    		$(".code").html(num)
    	},
        backHome() {
            this.$router.push({
                name:'home'
            })
        },
        logined() {
            var that = this;
            var flag = that.userflag;
            var haslogin = localStorage.getItem('login');
            if (flag) {
                var username = $('.username').val();
                $('.toast').html('登录成功');
                $('.toast').css('display', 'block');
                localStorage.setItem('hadlogin', 'success');
                localStorage.setItem('username', username);
                var timer = setTimeout(function () {
                    $('.toast').css('display', 'none');
                    that.$router.go(-1)
                    clearTimeout(timer)
                }, 2000)
            } else {
                $('.toast').html('您输入的信息有误');
                $('.toast').css('display', 'block');
                var timer = setTimeout(function () {
                    $('.toast').css('display', 'none');
                    clearTimeout(timer)
                }, 2000)
            }
        },
        usernameBlur() {
            var that = this;
            var username = $('.username').val();
            if (!/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(username)) {
                $('.toast').html('请输入正确的手机号');
                $('.toast').css('display', 'block')
                var timer = setTimeout(function () {
                    $('.toast').css('display', 'none');
                    clearTimeout(timer)
                }, 2000)
                that.userflag = false;
            } else {
                $('.toast').css('display', 'none');
                console.log('okkkk')
                that.userflag = true;
            }
        },
        codeBlur() {
            var that = this;
            var verificationCode = $('.verificationCode').val();
            var code = $('.code').html();
            if (code != verificationCode) {
                $('.toast').html('请输入正确的验证码');
                $('.toast').css('display', 'block');
                var timer = setTimeout(function () {
                    $('.toast').css('display', 'none');
                    clearTimeout(timer)
                }, 2000)
                that.userflag = false;
            } else {
                $('.toast').css('display', 'none');
                that.userflag = true;
            }
        }
    }

}
</script>


