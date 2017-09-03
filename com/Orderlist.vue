<template>
    <div id="settlePag">
        <div id="settleContent">
			<div class="address" @click="goAddress()">
				<p>收货地址:</p>
				<p class="addressDetail">{{list.name}}---{{list.phone}}---{{list.address}}</p>
			</div>
            <div class="product-group">
                <p class="item-bar group-title">本地精选</p>
                <ul class="prolist">
                    <li v-for="(item,index) in prolist" :key="index">
                        <span class='proShortName'>{{item.proShortName}}</span>
                        <span class="proSepcName">{{item.proSecName}} </span>
                        <span v-if="item.proTitle" class='proSpec'>{{item.proTitle}}</span>
                        <span class="product-price">{{item.proPrice/100}} X {{item.num}}</span>
                    </li>
                </ul>
                <div class="totalpri">
                    <span>商品金额</span>
                    <span class="money">{{totalpri}} 元</span>
                </div>
            </div>

            <div class="gopay">
            	<span class="gohome" @click="gohome()">
            		去首页再看看
            	</span>
                <span class="tipmo">合计：
                    <b>{{totalpri}}</b> 元</span>
                <span @click="payBtn()" class="paybtn">去支付 </span>
            </div>

            <div v-show="showPay" class='payway'>
                <div>
                    <span class="quxiao" @click="hidden()">X</span>
                    <span class="ok" @click="paySuccess()">ok</span>
                    <img src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504841511&di=770b72e1664b8d27410506c9758f064f&imgtype=jpg&er=1&src=http%3A%2F%2Fi1.img.969g.com%2Fnews%2Fimgx2013%2F10%2F10%2F196_112203_a1af2_lit.jpg' />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            prolist: [],
            showPay: false,
            totalpri: '',
            buynowpri:'',
            list:""
        }
    },
    mounted() {
        var state = this.$route.query.state;
        var buynow = JSON.parse(localStorage.getItem('buynow'));
        
        var totalpri = localStorage.getItem('TotalMoney');
        this.totalpri = totalpri;
        var orderlist = JSON.parse(localStorage.getItem('payGoods'));
        if(state == 100){
            this.prolist = orderlist;
            this.totalpri = totalpri;
        }else if(state == 200){
        	var buynowpri = buynow[0].num*buynow[0].proPrice/100;
            this.totalpri = buynowpri;
            this.prolist = buynow;
        }
        
        var str2=localStorage.getItem("morenAddr");
        var arr2=JSON.parse(str2);
        if (str2!=null) {
        	this.list=arr2[0]
        }else{
        	var obj={
        		name:"",
        		phone:"",
        		address:""
        	};
        	this.list=obj
        }
        
    },
    methods:{
    	paySuccess(){
    		var arrordlist =JSON.parse(localStorage.getItem('payGoods'));
    		var arrall =JSON.parse(localStorage.getItem('pro'));
    		for (var i in arrall) {
    			if (arrall[i].proID==arrordlist[0].proID) {
    				arrall.splice(i,1)
    				var str=JSON.stringify(arrall);
    				localStorage.setItem("pro",str)
    			}
    		}
    		this.$router.push({
    			name:'cartlist'
    		})
    		
    	},
    	gohome(){
    		this.$router.push({
    			name:'/'
    		})
    	},
        payBtn(){
            var that = this;
            that.showPay = true;
        },
        hidden(){
            var that = this;
            that.showPay = false;
        },
        goAddress(){
        	this.$router.push({
        		name:"address"
        	})
        	
        }
    }
}
</script>

<style scoped>
	.address{
		height: 80px;
		width: 90%;
		padding: 10px 5%;
		border-bottom: 1px solid #dcdcdc;
	}
	.addressDetail{
		margin-top: 5px;
		height: 50px;
		background: #FF6666;
		text-indent: 10px;
		color: #fff;
	}
	.gohome{
		background: #ff3939;
		width: 30%;
		height: 50px;
		color: #fff;
		display: block;
		float: left;
		text-align: center;
		line-height: 50px;
	}
</style>
