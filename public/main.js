import Vue from 'vue';
import YUI from './components';
import Vuex from 'vuex';
import store from './vuex/store';
Vue.use(YUI);
import index from './views/index.vue';
import register from './views/register.vue';
import login from './views/login.vue';
import aritcle from './views/content.vue';
import filp from './views/filp.vue';
new Vue({
    el: '#app',
    data: {

    },
    components: {
        index,
        register,
        login,
        aritcle,
        filp
    },
    created () {
        window.YVue = this;
    },
    store
});
