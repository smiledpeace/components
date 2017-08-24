<template>
    <transition :name="transitionName">
        <div :class="baseClass" :style="styles">
            <div :class="[baseClass + '-content' ]" v-html="content"></div>
        </div>
    </transition>
</template>
<script>
    export default {
        mounted() {
            this.clearCloseTimer();

            if (this.duration !== 0) {
                this.closeTimer = setTimeout(() => {
                    this.close();
                }, this.duration * 1000);
            }
        },
        beforeDestroy () {
            this.clearCloseTimer();
        },
        data() {
            return {
                closeTimer: null
            }
        },
        methods: {
            clearCloseTimer () {
                if (this.closeTimer) {
                    clearTimeout(this.closeTimer);
                    this.closeTimer = null;
                }
            },
            close () {
                this.clearCloseTimer();
                this.onClose();
                this.$parent.close(this.name);
            }
        },
        props: {
            content: '',
            onClose: {
                type: Function,
                default: function () {
                    
                }
            },
            duration: {
                type: Number
            },
            name: {
                type: String,
                required: true
            },
            prefixCls: {},
            transitionName: {},
            styles: {}
        },
        components: {},
        computed: {
            baseClass () {
                return [
                    `${this.prefixCls}-base`
                ];
            }
        }
    }
</script>
