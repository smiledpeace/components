import Input from './input.vue';
import Button from './button.vue';
import Message from  './message';
import Upload from './uploadFile.vue';
import Radio from './radio';
import Toggle from './toggle';

import Loading from './loading';
import preview          from '../preview/index.js';
import confirm          from '../comfirm/index.js';
import {Select, Option} from './select';


const YUI = {
    YInput: Input,
    YButton: Button,
    YUpload: Upload,
    YRadio: Radio,
    YRadios: Radio.Group,
    YSelect: Select,
    YOption: Option,
    YToggle: Toggle,
    // YLoading: Loading
};

const install = Vue => {
    Object.keys(YUI).map(item => {
        Vue.component(item, YUI[item]);
    });
    Vue.prototype.$Message = Message;
    Vue.prototype.$Loading = Loading;
    Vue.prototype.$preview = preview; // 可传img对象 和 文件 url
    
    Vue.prototype.$confirm = confirm; // 可自定以宽高 {width: 300, height: 150}
};

module.exports = Object.assign(YUI, {install});
