;(function(global, factory){
    'use strict';
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = global.document ?
            factory(global, true) :
            function(w) {
                if (!w.document) {
                    throw new Error("D need You!")
                }
                return factory(w)
            };
    } else {
        factory(global);
    }
})(typeof window !== 'undefined' ? window : this, function(window, noGlobal) {
    function TimerManager() {
        this.timer = [];
        this.args = [];
        this.isFiring = false;
    }
// 创建实例 静态方法
    TimerManager.makeInstance = function (element) {
        if (!element.__TimerManager__ || element.__TimerManager__.constructor !== TimerManager) {
            element.__TimerManager__ = new TimerManager();
        }
    };
    // push 到动画队列
    TimerManager.prototype.add = function (timer, args) {
        this.timer.push(timer);
        this.args.push(args);
        this.fire();

    };
    // 判断执行动画
    TimerManager.prototype.fire = function () {
        if (!this.isFiring) {
            var timer = this.timer.shift(),
                arg = this.args.shift();
            if (timer && arg) {
                this.isFiring = true;
                timer(arg[0]);
            }else {
                console.log(1);
            }
        }
    };
    // 重置 执行下一个动画
    TimerManager.prototype.next = function () {
        this.isFiring = false;
        if (this.timer.length) this.fire();
    };

    if (!noGlobal) {
        window.TimerManager = window.$TimerManager = TimerManager;
    }
    return TimerManager;
});
