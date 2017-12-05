import comfirm from './comfirm.vue';

import Vue from 'vue';

const Instance = new Vue({
    render (h) {
        return h(comfirm);
    }
});
const component = Instance.$mount();
document.body.appendChild(component.$el);
const _comfirm = Instance.$children[0];

export default {
    showConfirm (content, onClose, config) {
        _comfirm.show(content, onClose, config);
    }
};
