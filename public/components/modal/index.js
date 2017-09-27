import Modal from './modal.vue';
import Vue from 'vue';

Modal.newInstance = properties => {
    let _prop = properties || {};
    const Instance = new Vue({
        data: _props,
        render (h) {
            return h(Modal, {
                props: _props
            })
        }
    });
    const component = Instance.$mount();
    document.body.appendChild(component.$el);
    const modal = Instance.$children[0];

    return {
        show(modalProps) {
            modal.show(modalProps);
        }
    }
}
