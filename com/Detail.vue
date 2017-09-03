<template>
    <div id="detailPag">
        <div id='detailHeader'>
            <span class="header-item" @click="backHome()">首页</span>
            <div class="middle">
                <img src="./../img/logo.png" />
                <span class="city"></span>
            </div>
            <span class='toLogin' @click="tologin()">登录</span>
            <span class="search" @click="goSearch()">&#xe651;</span>
            <ul class="logined-panel">
                <li>我的订单</li>
                <li>我的礼卷</li>
                <li @click="singOut()">登出</li>
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
                <span class="heart" @click="islove()">&#xe629;</span>
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
            <div class="storInfo">
                <p class="menu">MENU</p>
                <div class="menu-list" v-if="modulesFlag">
                    <div class="menu-one" v-for="(item,index) in modules" :key="index">
                        <p class="warm">-{{item.sub_title}}-</p>
                        <p class="pitem" v-for='(pitem,index) in item.text' :key="index">{{pitem}}</p>
                    </div>
                    <div class="menu-two" v-if="lightFlag">
                        <div class="menu-two-info" v-for="(item,index) in light" :key="index">
                            <img :src="item.img_url" />
                            <p class="title">{{item.title}}</p>
                            <p class="content">{{item.content}}</p>
                        </div>
                    </div>
                    <div class="menu-three" v-if="usewarmFlag">
                        <p class="usewarm">使用提示</p>
                        <ul>
                            <li v-for='(item,index) in usewarm' :key="index">{{item.text}}</li>
                        </ul>
                        <div class="addFri" @click="shoeImg()">联系客服</div>
                        <div v-show="showImg" class="codeImg">
                            <span @click="hiddenImg()">&#xe61a;</span>
                            <img src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504246793314&di=85b84f03896533edf1c457c22c483a48&imgtype=0&src=http%3A%2F%2Fi1.img.969g.com%2Fnews%2Fimgx2013%2F10%2F10%2F196_112203_a1af2_lit.jpg' />
                        </div>
                    </div>
                    <div class="menu-four" v-if="gussLikeFlag">
                        <p class="like">-猜你喜欢-</p>
                        <ul>
                            <li v-for="(item,index) in gussLike" :key="index" @click="godetail(item.enjoy_url)">
                                <img :src="item.product_image_url" />
                                <div class="desc">
                                    <p class="product_name">{{item.product_name}}</p>
                                    <p class="price">{{item.price/100}}元/位</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <img v-if="isShow" class="loading-img" src="/img/loading.gif" />
        </div>

        <div id="sub-more">
            <p class="hasChose">已选择：{{basic.spec}}
                <span>({{proNum}} 份)</span>
            </p>
            <span @click="heightUp()" class="changeGoods">
                <span class="changletitlt">切换商品</span>
                <span class="changecon">&#xe60e;</span>
            </span>
            <div class="morediv">
                <ul>
                    <li v-for="(item,index) in sub_product_array" :key='index'>
                        <p class="spec">{{item.spec}}</p>
                        <p class="price">{{item.price/100}}元/位</p>
                    </li>
                </ul>
            </div>
            <div class="count">
                <span>选择数量</span>
                <button class="minus" @click="minus">-</button>
                <span class="shuliang">{{proNum}}</span>
                <button class="add" @click="add">+</button>
            </div>
        </div>
        <div id="sub">
            <span @click="goCartList()" class="cartBtn">&#xe62a;</span>
            <span @click="addCart()" class="addCart">加入购物车</span>
            <span @click="buyNow()" class="buy">即可购买</span>
        </div>
        <div class="confirm" @click="confirm">确定</div>
        <div class="toast"></div>
    </div>
</template>

<script>
import MyAjax from './../md/MyAjax';
export default {
    data() {
        return {
            id: this.$route.query.id,
            basic: [],
            modules: [],
            modulesFlag: true,
            light: [],
            lightFlag: true,
            usewarm: [],
            usewarmFlag: true,
            product_images: [],
            product_id: '',
            gussLike: [],
            gussLikeFlag: true,
            sub_product_array: [],
            lovearr: [],
            showImg: false,
            heightUpState: false,
            islovegoods: false,
            proNum: 1,
            isShow:true,
            goodsid:""
        }
    },
    updated() {
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            loop: true,
            autoplay: 2000
        });
        var shoucangStr=localStorage.getItem('shoucang');
        var shoucangArr = JSON.parse(shoucangStr);
        if(shoucangStr!=null){
        	for(var i in shoucangArr){
        		if(shoucangArr[i].loveid==this.goodsid){
        			 $('.heart').css('color', '#ff3939');
        		}
        	}
        	
        }
        
    },
    mounted() {
    	
    	var hash = document.location;
    	console.log(hash);
        var hadlogin = localStorage.getItem('hadlogin');
        if (hadlogin == null) {
            $('.toLogin').html('登录');
        } else {
            $('.toLogin').html('&#xe601;');
        }
        var that = this;
        var id = this.$route.query.id;
        var cityName = this.$route.query.city;
        $('.city').html(cityName);
        var url = 'https://api.ricebook.com/product/info/product_detail.json?product_' + id;

        MyAjax.fetch(url, function(re) {

            that.basic = re.basic;
            that.goodsid=that.basic.product_id,
            that.modules = re.modules;
            console.log(that.modules,that.goodsid)
            that.product_id = re.basic.product_id;

            if (re.modules[1] != undefined) {
                that.modules = re.modules[1].data.contents;
            } else {
                that.modulesFlag = false
            }
            if (re.modules[2] != undefined) {
                that.light = re.modules[2].data.lights;
            } else {
                that.lightFlag = false
            }
            if (re.modules[3] != undefined) {
                that.usewarm = re.modules[3].data.contents;
            } else {
                that.usewarmFlag = false
            }
            if (re.modules[4] != undefined) {
                that.gussLike = re.modules[4].data.recommend;
            } else {
                that.gussLikeFlag = false
            }
            that.product_images = re.basic.product_images;
            that.sub_product_array = re.basic.sub_product_array;
        }, function(err) { console.log(err) })
        var that=this;
        setTimeout(function(){
        	that.isShow=false
        },1800)
		
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        "$route": "fetchDate"
    },
    methods: {
        backHome() {
            this.$router.push({
                name: 'home'
            })
        },
        add() {
            var that = this;
            that.proNum++;
        },
        minus() {
            var that = this;
            if (that.proNum > 1) {
                that.proNum--
            } else {
                that.proNum = 1
            }
        },
        confirm() {
            var that = this;
            console.log('ss')
            $('#sub-more').animate({
                bottom: -300
            });
            $('.confirm').toggle();
            $('.changecon').html('&#xe60e;');
            $('.changletitlt').html('切换商品');
            that.heightUpState = false;
        },
        buyNow() {
            var that = this;
            var currentobj = that.basic;
            var proNum = that.proNum;
            var arr = [];
            console.log(currentobj)
            var obj = {
                proShortName: currentobj.short_name,
                proSecName: currentobj.spec,
                proPrice: currentobj.price,
                num: proNum
            }
            arr.push(obj);
            var str = JSON.stringify(arr);
            localStorage.setItem('buynow', str);
            this.$router.push({
                name: 'orderlist',
                query: {
                    state: 200
                }
            })
        },
        fetchDate() {
            window.location.reload();
            var that = this;
            var id = this.$route.query.id;
            var url = 'https://api.ricebook.com/product/info/product_detail.json?product_' + id;

            MyAjax.fetch(url, function(re) {

                that.basic = re.basic;
                that.modules = re.modules;
                console.log(that.modules)
                that.product_id = re.basic.product_id;

                if (re.modules[1] != undefined) {
                    that.modules = re.modules[1].data.contents;
                } else {
                    that.modulesFlag = false
                }
                if (re.modules[2] != undefined) {
                    that.light = re.modules[2].data.lights;
                } else {
                    that.lightFlag = false
                }
                if (re.modules[3] != undefined) {
                    that.usewarm = re.modules[3].data.contents;
                } else {
                    that.usewarmFlag = false
                }
                if (re.modules[4] != undefined) {
                    that.gussLike = re.modules[4].data.recommend;
                } else {
                    that.gussLikeFlag = false
                }
                that.product_images = re.basic.product_images;
                that.sub_product_array = re.basic.sub_product_array;
            }, function(err) { console.log(err) })
        },
        goSearch() {
            var that = this;
            $('.searchBtn').toggle();
        },
        godetail(str) {
            var that = this;
            var id = str.split('?')[1];
            // that.$route.query.id = id;
            this.$router.push({
                name: 'detail',
                query: {
                    id: id
                }
            })
        },
        searchRes() {
            var cityID = JSON.parse(localStorage.getItem('cityInfo')).cityID;
            console.log(cityID)
            var that = this;
            var $inputVal = $('.searchInput').val();
            if ($inputVal != '') {
                this.$router.push({
                    name: 'search',
                    query: { keyword: $inputVal, cityID: cityID }
                })
            }
        },
        islove() {
            var that = this;
            var shoucangStr=localStorage.getItem('shoucang');
            var shoucangArr = JSON.parse(shoucangStr);
            var obj = {
                lovenaem: that.basic.short_name,
                loveid: that.basic.product_id,
                loveprice: that.basic.price / 100,
                loveimg: that.product_images[0].img_url,
                num:1
            }
            if (shoucangStr==null) {
                $('.heart').css('color', '#ff3939');
                var arr=[];
                arr.push(obj);
                var lovestr = JSON.stringify(arr);
                localStorage.setItem('shoucang', lovestr);
            } else {
            	for(var i in shoucangArr){
            		if(shoucangArr[i].loveid==obj.loveid){
            			shoucangArr.splice(i,1)
            			shoucangStr=JSON.stringify(shoucangArr);
            			localStorage.setItem('shoucang', shoucangStr);
            			obj.num=0;
            			$('.heart').css('color', '#000');
            		}
            		
            	}
            	if(obj.num!=0){
            		shoucangArr.push(obj);
            		shoucangStr=JSON.stringify(shoucangArr);
            		localStorage.setItem('shoucang', shoucangStr);
            		$('.heart').css('color', '#ff3939');
            	}
            	
            }
        },
        shoeImg() {
            this.showImg = true;
        },
        hiddenImg() {
            this.showImg = false;
        },
        tologin() {
            var that = this;
            var hadlogin = localStorage.getItem('hadlogin');
            if (hadlogin == null) {
                this.$router.push({
                    name: 'login'
                })
            } else {
                $(".logined-panel").toggle();
            }
        },
        heightUp() {
            var that = this;
            var flag = that.heightUpState;
            if (!flag) {
                $('#sub-more').animate({
                    bottom: 0
                })
                $('.confirm').toggle();
                $('.changecon').html('&#xe605;');
                $('.changletitlt').html('关闭');
                that.heightUpState = true;
            } else if (flag) {
                $('#sub-more').animate({
                    bottom: -300
                })
                $('.confirm').toggle();
                $('.changecon').html('&#xe60e;');
                $('.changletitlt').html('切换商品');
                that.heightUpState = false;
            }
        },
        goCartList() {
            this.$router.push({
                name: 'cartlist'
            })
        },
        addCart() {
            function isexit(currentproduct, arrayy) {
                for (var i = 0; i < arrayy.length; i++) {
                    if (currentproduct.proID == arrayy[i].proID) {
                        return arrayy[i];
                    }
                }
                return false;
            }
            var that = this;
            var islogin = localStorage.getItem('hadlogin');
            var iscartHasGoods = localStorage.getItem('pro');
            var goodsid = that.id;
            var proObj = that.basic;
            var id = goodsid.split('&')[0];
            var productid = id.split('=')[1];
            var obj = {
                proImg: proObj.product_images[0],
                proTitle: proObj.spec,
                proPrice: proObj.price,
                proID: productid,
                proShortName: proObj.name,
                proSecName: proObj.spec_name
            }
            if (islogin == null) {
                this.$router.push({
                    name: 'login'
                })
            } else {
                if (iscartHasGoods == null) {
                    var proarr = [];
                    obj.num = 1;
                    proarr.push(obj);
                    var prostr = JSON.stringify(proarr);
                    localStorage.setItem('pro', prostr);
                    $('.toast').html('成功加入购物车');
                    $('.toast').css('display', 'block');
                    var timer = setTimeout(function() {
                        $('.toast').css('display', 'none');
                        clearTimeout(timer)
                    }, 2000)
                } else {
                    var nowproarr = JSON.parse(iscartHasGoods);
                    var exitflag = isexit(obj, nowproarr);
                    if (exitflag) {
                        exitflag.num++;
                        $('.toast').html('成功加入购物车');
                        $('.toast').css('display', 'block');
                        var timer = setTimeout(function() {
                            $('.toast').css('display', 'none');
                            clearTimeout(timer)
                        }, 2000)
                    } else {
                        obj.num = 1;
                        nowproarr.push(obj);
                        $('.toast').html('成功加入购物车');
                        $('.toast').css('display', 'block');
                        var timer = setTimeout(function() {
                            $('.toast').css('display', 'none');
                            clearTimeout(timer)
                        }, 2000)
                    }
                    var nowproarrstr = JSON.stringify(nowproarr);
                    localStorage.setItem('pro', nowproarrstr)
                }
            }
        }
    }

}
</script>


