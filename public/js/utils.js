const ajaxQuery = function (method, params, sucCB, unsucCB) {
    let noLoading = params.noLoading, queryNum = 0;
    if (params.noLoading) {
        delete  params.noLoading;
    } else {
        // $('#loading').show();
        queryNum += 1;
    }
    $.ajax({
        type: 'POST',
        url: '/query/' + method,
        data: params,
        dataType: 'json',
        success: function (res) {
            if (!noLoading) {
                queryNum -= 1;
                if(!queryNum) {
                    $('#loading').hide();
                }
            }
            console.log(res);
            var resultJson=res;
            if (resultJson.refresh) {
                window.location.reload();
                return false;
            }
            if (resultJson.result == 'ServerError') {
                // unsuccess('操作超时，请重试或刷新页面！');
                return false;
            }
            if (resultJson.result.toUpperCase() == 'TRUE') {
                console.log(41231);
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
        error: function () {
            if (!noLoading) {
                queryNum -= 1;
                if(!queryNum) {
                    $('#loading').hide();
                }
            }
            // unsuccess('操作超时，请重试或刷新页面！');
        }
    });
};