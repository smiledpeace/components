import preview from './showImgDetail.vue';

import Vue from 'vue';

const Instance = new Vue({
    render (h) {
        return h(preview);
    }
});
const component = Instance.$mount();
document.body.appendChild(component.$el);
const loading = Instance.$children[0];

export default {
    showImgDetail (_this) {
        loading.show(_this, event);
    }
};
