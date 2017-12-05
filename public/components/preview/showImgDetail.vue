<template lang="html">
    <div id="popImg">
        <div class="popImgBox">

        </div>
        <div class="download">

        </div>
    </div>
</template>

<script>
export default {
    methods: {
        show(obj, event, isThumbnail) {
            var ev = event || window.event;
            if (ev && ev.stopPropagation) {
                ev.stopPropagation();
            }
            if (typeof obj === 'string') {
                var url = obj
            }else {
                if (isThumbnail) {
                    var url = $(obj).attr('src');
                } else {
                    var url = $(obj).attr('src');
                }
            }

            var orgurl = url;
            url = url.replace('!normal', '').replace('!thumbnail', '');
            const _this = this;
            var image = new Image();
            image.src = url;
            image.setAttribute('data-original', url);
            image.style.display = 'none';
            this.$DLoading.showLoading();
            if (!-[1, ]) { //ie
                image.onreadystatechange = function() {
                    if (image.readyState == "complete") {
                        _this.$DLoading.hideLoading();
                        $('#popImg .popImgBox').empty().append(image);
                        $('#popImg').show().find('img').click(function() {
                            if (!document.querySelector('.viewer-container')) {
                                var viewer = new Viewer(document.querySelector('.popImgBox'), {
                                    title: false,
                                    transition: false,
                                    hidden: function() {
                                        $('#popImg').hide();
                                        $('.dibox').append($('#popImg .download'));
                                    },
                                    shown: function() {
                                        $('.viewer-navbar').empty().append($('#popImg .download'));
                                        if ($('.viewer-prev')[0]) {
                                            $('.viewer-toolbar')[0].removeChild($('.viewer-prev')[0]);
                                        }
                                        if ($('.viewer-play')[0]) {
                                            $('.viewer-toolbar')[0].removeChild($('.viewer-play')[0]);
                                        }
                                        if ($('.viewer-next')[0]) {
                                            $('.viewer-toolbar')[0].removeChild($('.viewer-next')[0]);
                                        }
                                        $('.viewer-toolbar').css('width', '200px');
                                        $('.viewer-canvas').unbind().click(function(e) {
                                            e.stopPropagation();
                                            if ($(e.target).is("img")) {
                                                return false;
                                            }
                                            viewer.destroy();
                                            $('#popImg').hide();
                                        });
                                    }
                                });
                            }
                        }).trigger('click');
                    }
                };
            } else {
                //firefox
                image.onload = function() {
                    if (image.complete == true) {
                        _this.$DLoading.hideLoading();
                        $('#loading').hide();
                        $('#popImg .popImgBox').empty().append(image);
                        $('#popImg').show().find('img').click(function() {
                            if (!document.querySelector('.viewer-container')) {
                                var viewer = new Viewer(document.querySelector('.popImgBox'), {
                                    title: false,
                                    transition: false,
                                    hidden: function() {
                                        $('#popImg').hide();
                                        $('.dibox').append($('#popImg .download'));
                                    },
                                    shown: function() {
                                        $('.viewer-navbar').empty().append($('#popImg .download'));
                                        if ($('.viewer-prev')[0]) {
                                            $('.viewer-toolbar')[0].removeChild($('.viewer-prev')[0]);
                                        }
                                        if ($('.viewer-play')[0]) {
                                            $('.viewer-toolbar')[0].removeChild($('.viewer-play')[0]);
                                        }
                                        if ($('.viewer-next')[0]) {
                                            $('.viewer-toolbar')[0].removeChild($('.viewer-next')[0]);
                                        }
                                        $('.viewer-toolbar').css('width', '200px');
                                        $('.viewer-canvas').unbind().click(function(e) {
                                            e.stopPropagation();
                                            if ($(e.target).is("img")) {
                                                return false;
                                            }
                                            viewer.destroy();
                                            $('#popImg').hide();
                                        });
                                    }
                                });
                            }
                        }).trigger('click');
                    }
                }
            }
        }
    }
}
</script>

<style lang="css">
</style>
