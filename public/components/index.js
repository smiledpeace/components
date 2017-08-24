import Input from './input.vue';
import Button from './button.vue';
import Message from  './message';
import Upload from './uploadFile.vue';
import Radio from './radio';

import Loading from './loading';

import {Select, Option} from './select';


const YUI = {
    YInput: Input,
    YButton: Button,
    YUpload: Upload,
    YRadio: Radio,
    YRadios: Radio.Group,
    YSelect: Select,
    YOption: Option,
    // YLoading: Loading
};

const install = Vue => {
    Object.keys(YUI).map(item => {
        Vue.component(item, YUI[item]);
    });
    Vue.prototype.$Message = Message;
    Vue.prototype.$Loading = Loading;
};

module.exports = Object.assign(YUI, {install});
