<template>
    <aside transition="dui-slide-wrap" :style="slide_style" v-if="show" v-el:slide>
        <slot></slot>
    </aside>
</template>
<script>
    export default{
        ready(){
            this.zIndex && (this.slide_style += `;z-index:${this.zIndex};`);
        },
        data(){
            return {
                isBack: false
            }
        },
        watch: {
            show(val){
                if (val) {
                    document.body.appendChild(this.$els.slide);
                    //----------
                    const slideLength = document.querySelectorAll('.dui-slide-wrap-transition').length;
                    if (slideLength > 1 && !this.zIndex) {
                        this.slide_style += `;z-index:${slideLength + 99};`;
                    }
                    //----------
                    this.$els.slide.addEventListener('transitionend', () => {
                        this.$emit('transitionend');
                    }, false);
                    //----------
                    const _this = this;
                    const nowId = `dui_slide_${Date.now()}`;
                    this.isBack = false;
                    history.replaceState({nowId}, '', '');
                    history.pushState(null, '', '');
                    window.addEventListener('popstate', function backFun(event) {
                        if (!event || !event.state || !event.state.nowId) {
                            console.log(event);
                            return;
                        }
                        if (event.state.nowId === nowId) {
                            _this.isBack = true;
                            _this.show = false;
                            window.removeEventListener('popstate', backFun);
                            _this.$emit('back');
                            if (typeof _this.callBack === 'function') {
                                _this.callBack();
                            }
                        }
                    }, false);
                } else {
                    if (!this.isBack) {
                        window.history.back()
                    }
                }
            }
        },
        props: {
            show: {
                type: Boolean,
                twoWay: true,
                default: false,
                required: true
            },
            callBack: {
                type: Function,
                required: false
            },
            zIndex: {
                type: null
            },
            slide_style: {
                type: null,
                default: ''
            }
        }
    }
</script>
