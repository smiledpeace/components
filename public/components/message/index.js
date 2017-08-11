import Notification from  './notification';

const prefixCls = 'yui-message';

let defaultDuration = 1.5, top, messageInstance, name = 1;

function getMessageInstance() {
    messageInstance = messageInstance || Notification.newInstance({
        prefixCls: prefixCls,
        style: {
            top: `${top}px`
        }
    })
}

function notice(content= '', duration = defaultDuration, type, onClose = function () {}, closable = false) {
    let instance = getMessageInstance();

    instance.notice({
        name: `${prefixKey}${name}`,
        duration: duration,
        styles: {},
        transitionName: 'move-up',
        content: `
            <div class="${prefixCls}-custom-content ${prefixCls}-${type}">
                <span>${content}</span>
            </div>
        `,
        onClose: onClose,
        closable: closable,
        type: 'message'
    });

    return (function () {
        let target = name++;

        return function () {
            instance.remove(`${prefixKey}${target}`);
        };
    })();
}


export default {
    name: 'Message',

    info (options) {
        const type = typeof options;
        if (type === 'string') {
            options = {
                content: options
            };
        }
        return notice(options.content, options.duration, 'info', options.onClose, options.closable);
    },
    success (options) {
        const type = typeof options;
        if (type === 'string') {
            options = {
                content: options
            };
        }
        return notice(options.content, options.duration, 'success', options.onClose, options.closable);
    },
    warning (options) {
        const type = typeof options;
        if (type === 'string') {
            options = {
                content: options
            };
        }
        return notice(options.content, options.duration, 'warning', options.onClose, options.closable);
    },
    error (options) {
        const type = typeof options;
        if (type === 'string') {
            options = {
                content: options
            };
        }
        return notice(options.content, options.duration, 'error', options.onClose, options.closable);
    },
    loading (options) {
        const type = typeof options;
        if (type === 'string') {
            options = {
                content: options
            };
        }
        return notice(options.content, options.duration, 'loading', options.onClose, options.closable);
    },
    config (options) {
        if (options.top) {
            top = options.top;
        }
        if (options.duration) {
            defaultDuration = options.duration;
        }
    },
    destroy () {
        let instance = getMessageInstance();
        messageInstance = null;
        instance.destroy('ivu-message');
    }
};