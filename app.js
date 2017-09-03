import Vue from 'vue';
import VueRouter from 'vue-router';


import App from './com/App.vue';


import routes from './router/router';
import './sass/main.scss';

Vue.use(VueRouter);

var router = new VueRouter({
    routes:routes
})

new Vue({
    el:"#app",
    router:router,
    data:{

    },
    methods:{
            
    },
    components:{
        'v-app':App
    }
})