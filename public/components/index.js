import Input from './input.vue';
import Button from './button.vue';
import Message from  './message'

const YUI = {
    YInput: Input,
    YButton: Button,
};

const install = Vue => {
    Object.keys(YUI).map(item => {
        Vue.component(item, YUI[item]);
    });
    Vue.prototype.$Message = Message;
};

module.exports = Object.assign(YUI, {install});