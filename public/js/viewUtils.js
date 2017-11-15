let toString        = window.toString,
    MAX_ARRAY_INDEX = Math.pow(2,53)-1;
// hack Vue resource 设置时间延时
/*
Vue.http.interceptors.push((request, next) => {
    var timeout;
    // 這裡改用 _timeout ，就不會觸發原本的
    if (request._timeout) {
        // 一樣綁定一個定時器，但是這裡是只要觸發了，就立即返回 response ， 並且這邊自定義了 status 和 statusText
        timeout = setTimeout(() => {
            next(request.respondWith(request.body, {
                 status: 408,
                 statusText: 'Request Timeout'
            }));
        }, request._timeout);
    }

    next((response) => {
        clearTimeout(timeout);
    });
});
 */
const utils = {
    /**
     * 对象的深度复制
     * @param obj
     * @returns {{}}
     */
    objectDepthCopy: function(obj) {
        var temp = null;
        if (obj && !(obj instanceof Array)) {
            temp = {};
            for (var item in obj) {
                if (obj[item] && typeof obj[item] == 'object') {
                    //if(item == '')
                    temp[item] = objectDepthCopy(obj[item]);
                } else {
                    temp[item] = obj[item];
                }
            }
        } else {
            temp = [];
            if (obj) {
                for (var i = 0, _i = obj.length; i < _i; i++) {
                    if (obj[i] && typeof obj[i] == 'object') {
                        temp[i] = objectDepthCopy(obj[i]);
                    } else {
                        temp[i] = obj[i];
                    }
                }
            }
        }
        return temp;
    },
    later: function(fn, delay, immediate) {
        let timer;
        return function() {
            let context = this,
                args = arguments,
                callnow = immediate && !timer;
            clearTimeout(timer);
            timer = setTimeout(function() {
                if (!immediate) {
                    fn.apply(context, args);
                }
                timer = null;
            }, delay);
            if (callnow) {
                fn.apply(context, args);
            }
        };
    },
    //格式化日期,
    formatDate(date, format) {
        var paddNum = function(num) {
            num += "";
            return num.replace(/^(\d)$/, "0$1");
        }
        //指定格式字符
        var cfg = {
            yyyy: date.getFullYear() //年 : 4位
                ,
            yy: date.getFullYear().toString().substring(2) //年 : 2位
                ,
            M: date.getMonth() + 1 //月 : 如果1位的时候不补0
                ,
            MM: paddNum(date.getMonth() + 1) //月 : 如果1位的时候补0
                ,
            d: date.getDate() //日 : 如果1位的时候不补0
                ,
            dd: paddNum(date.getDate()) //日 : 如果1位的时候补0
                ,
            hh: date.getHours() //时
                ,
            mm: date.getMinutes() //分
                ,
            ss: date.getSeconds() //秒
        }
        format || (format = "yyyy-MM-dd hh:mm:ss");
        return format.replace(/([a-z])(\1)*/ig, function(m) {
            return cfg[m];
        });
    },
    //格式化CST日期的字串
    formatCSTDate(strDate, format) {
        if (strDate == '') {
            return '';
        }
        return this.formatDate(new Date(strDate), format);
    },
    isArray: Array.isArray || function(target) {
        return toString.call(target) === '[object Array]';
    },
    //类数组
    isArrayLike(target) {
        let len = target && target.length;
        return len && 'number' === typeof len && 0 <= len && len <= MAX_ARRAY_INDEX;
    },
    isBoolean(target) {
        return target === true || target === false || toString.call(target) === '[object Boolean]';
    },
    isInIframe() {
        try {
            return self.frameElement && self.frameElement.tagName == "IFRAME" ||
                window.frames.length != parent.frames.length || self != top;
        } catch (e) {
            return false;
        }
    },
    isObject(target) {
        return typeof(target) === 'object';
    },
    //键值对象
    isPlainObject(target) {
        return target && this.isobject(target) && Object.getPrototypeOf(target) === Object.prototype;
    },
    isFunction(target) {
        return typeof(target) === 'function';
    },
    isString(target) {
        return typeof(target) === 'string';
    },
    isNumber(target) {
        return typeof(target) === 'number';
    },
    isDate(target) {
        return toString.call(target) === '[object Date]';
    },
    // 获取 css 样式
    getCss(o, key) {
        return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o, false)[key];
    },
    // 数组去重
    heavy(arr) {
        return arr.filter(function(item, index, arr) {
            return arr.indexOf(item) === index;
        })
    },
    extend() {
        var src, copyIsArray, copy, name, options, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        // target 是传入的第一个参数
        // 如果第一个参数是布尔类型，则表示是否要深递归，
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[1] || {};
            // skip the boolean and the target
            // 如果传了类型为 boolean 的第一个参数，i 则从 2 开始
            i = 2;
        }

        // Handle case when target is a string or something (possible in deep copy)
        // 如果传入的第一个参数是 字符串或者其他
        if (typeof target !== "object" && !this.isFunction(target)) {
            target = {};
        }

        // extend jQuery itself if only one argument is passed
        // 如果参数的长度为 1 ，表示是 jQuery 静态方法
        if (length === i) {
            target = this;
            --i;
        }

        // 可以传入多个复制源
        // i 是从 1或2 开始的
        for (; i < length; i++) {
            // Only deal with non-null/undefined values
            // 将每个源的属性全部复制到 target 上
            if ((options = arguments[i]) != null) {
                // Extend the base object
                for (name in options) {
                    // src 是源（即本身）的值
                    // copy 是即将要复制过去的值
                    src = target[name];
                    copy = options[name];

                    // Prevent never-ending loop
                    // 防止有环，例如 extend(true, target, {'target':target});
                    if (target === copy) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    // 这里是递归调用，最终都会到下面的 else if 分支
                    // jQuery.isPlainObject 用于测试是否为纯粹的对象
                    // 纯粹的对象指的是 通过 "{}" 或者 "new Object" 创建的
                    // 如果是深复制
                    if (deep && copy && (this.isPlainObject(copy) || (copyIsArray = this.isArray(copy)))) {
                        // 数组
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && this.isArray(src) ? src : [];

                            // 对象
                        } else {
                            clone = src && this.isPlainObject(src) ? src : {};
                        }

                        // Never move original objects, clone them
                        // 递归
                        target[name] = this.extend(deep, clone, copy);

                        // Don't bring in undefined values
                        // 最终都会到这条分支
                        // 简单的值覆盖
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }

        // Return the modified object
        // 返回新的 target
        // 如果 i < length ，是直接返回没经过处理的 target，也就是 arguments[0]
        // 也就是如果不传需要覆盖的源，调用 $.extend 其实是增加 jQuery 的静态方法
        return target;
    },
    setTitle(title) {
        var $body = $('body');
        document.title = title;
        // hack在微信等webview中无法修改document.title的情况
        var $iframe = $('<iframe src="/images/bitbug_favicon.ico" style="width: 0;height: 0"></iframe>');
        $iframe.on('load', function() {
            setTimeout(function() {
                $iframe.off('load').remove();
            }, 0);
        }).appendTo($body);
    },
    isEmptyObject(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) return false;
        }
        return true;
    },
    // 去重
    dedupe(arr) {
        let unique = {};
        if (!arr.length) return [];
        // 一些可用于 筛选的字段
        arr.forEach(function(gpa) {
            if (!unique[gpa.user_id]) {
                unique[gpa.user_id] = JSON.stringify(gpa);
            }
        });
        arr = Object.keys(unique).map(function(u) {
            try {
                return JSON.parse(unique[u])
            } catch (e) {
                return u
            }
        });
        return arr;
    },
    each(obj, callback, args) {
        var value,
            i = 0,
            length = obj.length,
            isArray = this.isArrayLike(obj); // 判断是不是数组
        // 传了第三个参数
        if (args) {
            if (isArray) {
                for (; i < length; i++) {
                    // 相当于:
                    // args = [arg1, arg2, arg3];
                    // callback(args1, args2, args3)。然后callback里边的this指向了obj[i]
                    value = callback.apply(obj[i], args);

                    if (value === false) {
                        // 注意到，当callback函数返回值会false的时候，注意是全等！循环结束
                        break;
                    }
                }
                // 非数组
            } else {
                for (i in obj) {
                    value = callback.apply(obj[i], args);

                    if (value === false) {
                        break;
                    }
                }
            }

            // A special, fast, case for the most common use of each
        } else {
            // 数组
            // 其实这里代码有点赘余，如果考虑代码的简洁性牺牲一点点性能
            // 在处理数组的情况下，也是可以用 for(i in obj)的
            if (isArray) {
                for (; i < length; i++) {
                    // 相当于callback(i, obj[i])。然后callback里边的this指向了obj[i]
                    value = callback.call(obj[i], i, obj[i]);

                    if (value === false) {
                        break;
                    }
                }
                // 非数组
            } else {
                for (i in obj) {
                    value = callback.call(obj[i], i, obj[i]);

                    if (value === false) {
                        break;
                    }
                }
            }
        }

        return obj;
    },
}
export default utils;
