import Toast  from './loading.vue';
import Vue from 'vue';

const Instance = new Vue({
    render (h) {
        return h(Toast);
    }
});
const component = Instance.$mount();
document.body.appendChild(component.$el);
const loading = Instance.$children[0];
export default {
    hideLoading () {
        loading.hide();
    },
    showLoading () {
        loading.show();
    }
};
