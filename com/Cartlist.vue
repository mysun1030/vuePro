<template>
    <div id="cartlistPag">
        <div id='cartConent'>
            <div class="cart-empty" id="cart-empty">
                <img src="./../img/cartempty.png">
                <p class="empty">你的购物车空空如也</p>
            </div>
            <div class="cart-full" id="cart-full">
                <ul class="cartlistul">
                    <li class="cartlistli" v-for="(item,index) in cartlistul" :key='index'>
                        <span @click="chose(index)" class="radio">&#xe800;</span>
                        <img :src="item.proImg.img_url">
                        <span class="title">{{item.proTitle}}</span>
                        <span class="price">单价{{item.proPrice/100}}元</span>
                        <span class="singlepri">合计：
                            <span class="sspri">{{item.num*item.proPrice/100}}</span>
                        </span>
                        <div class="btns">
                            <button @click="minus(index)" class="minus button">-</button>
                            <span class="count">{{item.num}}</span>
                            <button @click="add(index)" class="add button">+</button>
                            <span @click="del(index)" class="del">&#xe604;</span>
                        </div>

                    </li>
                </ul>
            </div>
            <div class="Settlement" id="Settlement">
                <span @click="allChose()" class="allchose">&#xe800;</span>
                <span class="class">全选</span>
                <span class="totalprice">合计:
                    <span class="totalmonry"></span>
                </span>
                <span @click="goOrderList()" class="goSettlement">去结算</span>
            </div>
            <div class="gussyoulike">
                <p class="like">猜你喜欢</p>
                <ul>
                    <li v-for="(item,index) in proInfo" :key="index">
                        <img @click=goDetail(item.enjoy_url) :src="item.product_image" />
                        <p class="name">{{item.name}}</p>
                        <p class="price">{{item.price/100}}元/{{item.entity_name}}</p>
                    </li>

                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import MyAjax from './../md/MyAjax';
export default {
    data() {
        return {
            proInfo: [],
            cartlistul: [],
            shosed: true,
            allchose: true,
            choseArr: []
        }
    },
    mounted() {
    	localStorage.setItem("allgoods",true)
        var that = this;
        var totalmoneyarr = JSON.parse(localStorage.getItem('pro'));
        var choseArr = that.choseArr;
        console.log(totalmoneyarr)
        for (var i in totalmoneyarr) {
            choseArr.push(true)
        }
        var carthHasPro = JSON.parse(localStorage.getItem('pro'));
        if (carthHasPro == null) {
            $('#cart-empty').css('display', 'block');
            $('#cart-full').css('display', 'none');
            $('#Settlement').css('display', 'none');
            var timer = setTimeout(function () {
                $('.like').css('display', 'block')
                var url = 'https://api.ricebook.com/3/enjoy_product/cart_recommend_product.json?city_id=1';
                MyAjax.fetch(url, function (re) {
                    that.proInfo = re.content;
                }, function (err) { console.log(err) })
                clearTimeout(timer)
            }, 2000)
        } else {
            var proArr = JSON.parse(localStorage.getItem('pro'));
            that.cartlistul = proArr;
            var waitMoney = 0;
            for (var i in proArr) {
                waitMoney = waitMoney + proArr[i].proPrice / 100 * proArr[i].num;
            }
            $('.totalmonry').html(waitMoney);
            localStorage.setItem('TotalMoney', waitMoney);
            $('#cart-empty').css('display', 'none');
            $('#cart-full').css('display', 'block');
            $('#Settlement').css('display', 'block');
            $('.like').css('display', 'block');
            var url = 'https://api.ricebook.com/3/enjoy_product/cart_recommend_product.json?city_id=1';
            MyAjax.fetch(url, function (re) {
                that.proInfo = re.content;
            }, function (err) { console.log(err) })
        }
    },
    methods: {
        minus(index) {
            var waitMoney = localStorage.getItem('TotalMoney');
            var pro = JSON.parse(localStorage.getItem('pro'));
            var currentpro = pro[index];
            var num = currentpro.num;
            if (currentpro.num > 1) {
                currentpro.num--;
                waitMoney = waitMoney - currentpro.proPrice / 100;
                $('.totalmonry').html(waitMoney);
                localStorage.setItem('TotalMoney', waitMoney);
                $('.minus').css('color', '#ff3939');
            } else if (currentpro.num == 1) {
                currentpro.num = 1;
                $('.cartlistli').eq(index).find('.minus').css('color', '#000');
            }
            var pri = currentpro.num * currentpro.proPrice / 100;

            $('.cartlistli').eq(index).find('.sspri').html(pri);
            $('.cartlistli').eq(index).find('.count').html(currentpro.num);
            var afterStr = JSON.stringify(pro);
            localStorage.setItem('pro', afterStr)
        },
        add(index) {
            var pro = JSON.parse(localStorage.getItem('pro'));
            var waitMoney = localStorage.getItem('TotalMoney');
            var toNum = Number(waitMoney);
            var currentpro = pro[index];
            $('.cartlistli').eq(index).find('.minus').css('color', '#ff3939');
            currentpro.num++;
            var pri = currentpro.num * currentpro.proPrice / 100;
            toNum = toNum + currentpro.proPrice / 100;
            $('.totalmonry').html(toNum);
            localStorage.setItem('TotalMoney', toNum);
            $('.cartlistli').eq(index).find('.sspri').html(pri);
            $('.cartlistli').eq(index).find('.count').html(currentpro.num);
            var afterAddStr = JSON.stringify(pro);
            localStorage.setItem('pro', afterAddStr);
        },
        del(index) {
            var that = this;
            var choseArr = that.choseArr;
            var pro = JSON.parse(localStorage.getItem('pro'));
            var waitMoney = localStorage.getItem('TotalMoney');
            var currentpri = Number($('.cartlistli').eq(index).find('.sspri').html());
            waitMoney = waitMoney - currentpri;
            localStorage.setItem('TotalMoney', waitMoney);
            $('.totalmonry').html(waitMoney);
            var newArr = pro.splice(index, 1);
            that.choseArr = choseArr.splice(index,1)
            if (pro.length == 0) {
                $('#cart-empty').css('display', 'block');
                $('#cart-full').css('display', 'none');
                $('#Settlement').css('display', 'none');
                localStorage.removeItem('pro');
            } else {
                var afaterStr = JSON.stringify(pro);
                localStorage.setItem('pro', afaterStr);
                $('.cartlistul').find('li').eq(index).css('display', 'none');
            }
        },
        chose(index) {
            var that = this;
            var flag = that.shosed;
            var choseArr = that.choseArr;

            var allgoods = localStorage.getItem('allgoods');
            var waitMoney = localStorage.getItem('TotalMoney');
            var currentpri = Number($('.cartlistli').eq(index).find('.sspri').html());
            if (choseArr[index] == true) {
                choseArr[index] = false;
                $('.cartlistli').eq(index).find('.radio').html('&#xe642;');
                $('.cartlistli').eq(index).find('.button').attr('disabled', 'disabled');
                $('.cartlistli').eq(index).find('.button').css('color', '#000');
                waitMoney = waitMoney - currentpri;
                $('.totalmonry').html(waitMoney);
                localStorage.setItem('TotalMoney', waitMoney);
            } else {
                choseArr[index] = true;
                $('.cartlistli').eq(index).find('.radio').html('&#xe800;');
                $('.cartlistli').eq(index).find('.button').css('color', '#ff3939');
                $('.cartlistli').eq(index).find('.button').removeAttr('disabled');
                var toNum = Number(waitMoney);
                toNum = toNum + currentpri;
                $('.totalmonry').html(toNum);
                localStorage.setItem('TotalMoney', toNum);
            }
            if (choseArr.indexOf(false) == -1) {
                $('.allchose').html('&#xe800;');
                localStorage.setItem('allgoods','true')
            }
            if (choseArr.indexOf(true) == -1) {
                $('.goSettlement').css('background', '#BDC0C5');
                localStorage.removeItem('allgoods');
            } else {
                $('.goSettlement').css('background', '#ff3939');
                localStorage.setItem('allgoods', 'false');
            }
            for (var i in choseArr) {
                if (choseArr[i] == false) {
                    $('.allchose').html('&#xe642;');
                    
                }
            }
        },
        allChose() {
            var that = this;
            var flag = that.allchose;
            var choseArr = that.choseArr;
            console.log(choseArr);
            var waitMoney = localStorage.getItem('TotalMoney');
            choseArr.forEach(function (item, index) {
                if (item == false) {
                    choseArr[index] = true;
                    $('.cartlistli').find('.radio').html('&#xe800;');
                    $('.cartlistli').find('.button').css('color', '#ff3939');
                    $('.cartlistli').find('.button').removeAttr('disabled');
                    $('.allchose').html('&#xe800;');
                    $('.totalmonry').html(waitMoney);
                    $('.goSettlement').css('background', '#ff3939');
                    localStorage.setItem('allgoods', 'true');
                } else {
                    choseArr[index] = false;
                    $('.allchose').html('&#xe642;');
                    $('.cartlistli').find('.radio').html('&#xe642;');
                    $('.cartlistli').find('.button').attr('disabled', 'disabled');
                    $('.cartlistli').find('.button').css('color', '#000');
                    $('.totalmonry').html(0);
                    $('.goSettlement').css('background', '#BDC0C5');
                     localStorage.removeItem('allgoods');
                }
            })
        },
        goOrderList() {
            var that = this;
            var arr  = that.choseArr;
            var proarr =JSON.parse(localStorage.getItem('pro'));
            var arrordlist =JSON.parse(localStorage.getItem('payGoods'));
            
            var payarr = [];
            console.log(arr)
            arr.forEach(function(item,index){
                if(item == true){
                    payarr.push(proarr[index])
                }
            })
            var payStr = JSON.stringify(payarr);
            localStorage.setItem('payGoods',payStr)
            var allgoods = localStorage.getItem('allgoods');
            var hasChoseGoodsObj = {};
            if (allgoods != null) {
                this.$router.push({
                    name: 'orderlist',
                    query:{
                        state:100
                    }
                })
            }
        },
        goDetail(str){
            var id  = str.split('?')[1];
            this.$router.push({
                name:'detail',
                query:{
                    id:id
                }
            })
        }
    }
}
</script>

<style>

</style>
