<template>
    <div class="yui-cover">
        <div class="yui-message">
            <div v-html="content"></div>
        </div>
    </div>
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
            content: ''
        },
        components: {}
    }
</script>
