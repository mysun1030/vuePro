<template>
    <div id='addPag'>
        <ul v-if="isaddress" class="address">
            <li v-for="(item,index) in addressArr" :key="index" @click="shezhimoren(index)">
                <span class="name">{{item.name}}</span>
                <span class="phone">{{item.phone}}</span>
                <p class="address">{{item.address}}</p>
                <span class="deladd" @click="deladd(index)">&#xe604;</span>
            </li>
        </ul>
        <div class="address-add">
            <form>
                <input class="info" v-model="name" type="text" placeholder="收货人姓名">
                <input class="info" v-model="phone" type="text" placeholder="手机号">
                <input class="info" v-model="mail" type="text" placeholder="邮编（选填）">
                <input class="info" v-model="address" type="text" placeholder="详细地址">
                <div class="submit-content clearfix">
                    <span class="save" @click="saveAddress">保存并返回</span>
                    <span @click='cancel' class="cancel">返回</span>
                </div>
            </form>
        </div>
        <!-- <p v-if="isshow" class="addTips">你目前还没有收藏地址</p> -->
        <div class="add" @click="addAddres">添加新地址</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            phone: '',
            mail: '',
            address: '',
            addressArr: [],
            addID: 0,
            isaddress: false,
            isshow:true
        }
    },
    mounted() {
        var address = JSON.parse(localStorage.getItem('address'));
        if (address != null) {
            this.isaddress = true;
            this.isshow = false
        } else {
            this.isaddress = false;
            this.isshow = true
        }
        this.addressArr = address;
        
    },
    updated(){
    	var address = JSON.parse(localStorage.getItem('address'));
    	for (var i in address) {
        	if (address[i].addID==0) {
        		console.log(i)
        		$(".address li").eq(i).css({"background":"#FF6666","color":"#fff"});
        	}
        }
    },
    methods: {
    	shezhimoren(index){
    		$(".address li").eq(index).css({"background":"#FF6666","color":"#fff"}).siblings().css({"background":"#fff","color":"#76797E"});
    		var address = JSON.parse(localStorage.getItem('address'));
    		var obj=address[index];
    		for (var i in address) {
    			address[i].addID=1
    		}
    		address[index].addID=0;
    		address=JSON.stringify(address);
    		localStorage.setItem("address",address)
    		var arr=[];
    		arr.push(obj);
    		var str=JSON.stringify(arr);
    		localStorage.setItem("morenAddr",str)
    		console.log(arr)
    		this.$router.back(-1)
    	},
        addAddres() {
            var that = this;
            $('.address-add').toggle();
            $('.add').toggle();
            that.isaddress = false;
            that.isshow = false
        },
        cancel() {
            var that = this;
            $('.address-add').toggle();
            $('.add').toggle();
            that.isaddress = true
        },
        saveAddress() {
            function isexit(currentobj, exitarr) {
                for (var i in exitarr) {
                    if (currentobj.addID == exitarr[i].addID) {
                        return exitarr[i]
                    }
                }
                return false;
            }
            var that = this;
            that.addID++;
            function isexit(currentobj, exitarr) {
                for (var i in exitarr) {

                }
            }
            var address = JSON.parse(localStorage.getItem('address'));
            var arr = [];
            var obj = {
                name: this.name,
                phone: this.phone,
                mail: this.mail,
                address: this.address,
                addID: this.addID
            }
            if (address == null) {
                arr.push(obj);
                localStorage.setItem('address', JSON.stringify(arr));
            } else {
                var flag = isexit(obj, address);
                if (!flag) {
                    obj.addID = that.addID;
                    address.push(obj)
                }
                localStorage.setItem('address', JSON.stringify(address));
            }
            $('.address-add').toggle();
            that.isaddress = true;
            window.location.reload();
        },
        deladd(index) {
            var that = this;
            var arr =JSON.parse(localStorage.getItem('address'));
            var newarr = arr.splice(index, 1);
            var afaterStr = JSON.stringify(arr);
            localStorage.setItem('address', afaterStr);
            $('.address').find('li').eq(index).css('display', 'none');
        }
    }
}
</script>
