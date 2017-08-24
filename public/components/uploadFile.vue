<template>

    <form id="frmUploader" enctype="multipart/form-data" action="/query/upload" method="post">
        <input type="file" name="imgUploader" multiple />
        <input type="submit" name="submit" id="btnSubmit" value="Upload" />
    </form>
</template>
<style lang="less" rel="stylesheet/less" scoped>
</style>
<script>
    export default {
        mounted() {
        },
        data() {
            return {}
        },
        methods: {
            uploadFile () {
                let fileInput = document.createElement('input'), _this = this;
                fileInput.setAttribute('type', 'file');
                fileInput.click();
                fileInput.onchange = function () {
                    let formData = new FormData();
                    formData.append('file', fileInput.files[0]);
                    $.ajax({
                        type: 'POST',
                        url: '/query/upload',
                        data: fileInput.files[0],
                        processData: false,
                        contentType: false,
                        cache: false,
                        dataType: 'json',
                        success: function (res) {

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
                        error: function (err) {
                            console.log(err);
                            // unsuccess('操作超时，请重试或刷新页面！');
                        }
                    });
                }
            }
        },
        props: [],
        components: {}
    }
</script>
