
// 引入路由
import Home      from './../com/Home.vue';
import Category  from './../com/Category.vue';
import Search    from './../com/Search.vue';
import Detail    from './../com/Detail.vue';
import Login     from './../com/Login.vue';
import Person    from './../com/Person.vue';
import Cartlist  from './../com/Cartlist.vue';
import Orderlist from './../com/Orderlist.vue';
import Discovery from './../com/Discovery.vue';
import Invite    from './../com/Invite.vue';
import My        from './../com/My.vue';
import List      from './../com/ClassList.vue';
import newDetail from './../com/newDetail.vue';
import Address   from './../com/Address.vue';
//定义路由

const routes = [
    { path: '/',           name: 'home', component: Home },
    { path: '/category',   name: 'category', component: Category },
    { path: '/search',     name: 'search', component: Search },
    { path: '/detail',     name: 'detail', component: Detail },
    { path: '/login',      name: 'login', component: Login },
    { path: '/person',     name: 'person', component: Person },
    { path: '/cartlist',   name: 'cartlist', component: Cartlist },
    { path: '/order',      name: 'orderlist', component: Orderlist },
    { path: '/discovery',  name: 'discovery', component: Discovery },
    { path: '/invite',     name: 'invite', component: Invite },
    { path: '/my',         name: 'my', component: My },
    { path: '/list',       name: 'list', component: List },
    { path: '/address',    name: 'address',component:Address} 


]

export default routes;
