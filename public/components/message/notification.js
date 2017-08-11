import Notice from './notice.vue';
import Vue from 'vue';

Notice.newInstance = properties => {
    let _prop = properties || {};
    const Instance = new Vue({
        data: _prop,
        render (h) {
            return h(Notice, {
                props: _prop
            })
        }
    });

    const component = Instance.$mount();
    document.body.appendChild(component.$el);
    const notification = Instance.$children[0];

    return {
        notice (noticeProps) {
            notification.add(noticeProps);
        },
        remove (name) {
            notification.close(name);
        },
        component: notification,
        destroy (element) {
            notification.closeAll();
            setTimeout(function() {
                document.body.removeChild(document.getElementsByClassName(element)[0]);
            }, 500);
        }
    }
};

export default Notice;