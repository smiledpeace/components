import Vue from 'vue';
import YUI from './components';
Vue.use(YUI);
import index from './views/index.vue';
import register from './views/register.vue';
import login from './views/login.vue';
new Vue({
    el: '#app',
    data: {
        title: 'hh',
        demo: 'ghghh'
    },
    components: {
        index,
        register,
        login
    }
});