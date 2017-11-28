var ajaxQuery = function(method, params, sucCB, unsucCB) {
    var noLoading = params.noLoading,
        queryNum = 0;
    if (params.noLoading) {
        delete params.noLoading;
    } else {
        queryNum += 1;
        window.YVue.$Loading.showLoading();
    }
    $.ajax({
        type: 'POST',
        url: '/query/' + method,
        data: params,
        dataType: 'json',
        success: function(res) {
            if (!noLoading) {
                queryNum -= 1;
                if (!queryNum) {
                    window.YVue.$Loading.hideLoading();
                }
            }
            var resultJson = res;
            if (resultJson.refresh) {
                window.location.reload();
                return false;
            }
            if (resultJson.result == 'ServerError') {
                // unsuccess('操作超时，请重试或刷新页面！');
                return false;
            }
            if (resultJson.result.toUpperCase() == 'TRUE') {
                if (typeof sucCB !== "undefined" && sucCB !== null) {
                    sucCB(resultJson);
                } else {
                    // success();
                }
            } else {
                if (typeof unsucCB !== "undefined" && unsucCB !== null) {
                    unsucCB(resultJson);
                } else {
                    // unsuccess();
                }
            }
        },
        error: function() {
            if (!noLoading) {
                queryNum -= 1;
                if (!queryNum) {
                    $('#loading').hide();
                }
            }
            // unsuccess('操作超时，请重试或刷新页面！');
        }
    });
};
/**
 * 对象的深度复制
 * @param obj
 * @returns {{}}
 */
var objectDepthCopy = function(obj) {
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
}
