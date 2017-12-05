import fn               from './viewUtils.js';

const utils = {};
const install = Vue => {
    
    Vue.prototype.$fn = fn;

    Vue.mixin({
        beforeCreate() {
            this.$fn.vm = this;                //实例引用
        }
    });
};

export default Object.assign(utils, { install });
