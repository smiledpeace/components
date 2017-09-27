<template lang="html">
    <div :class="classes">
        <div :class="headClass">
            {{{ title }}}
        </div>
        <div :class="bodyClass">
            {{{ content }}}
        </div>
        <div :class="footClass">
            {{{ footer }}}
        </div>
    </div>
</template>

<script>
    const prefix = 'yui-modal';
    export default {
        computed: {
            classes() {
                return [
                    `${prefix}-warpper`,
                ]
            },
            headClass() {
                return [
                    `${prefix}-header`,
                ]
            },
            bodyClass() {
                return [
                    `${prefix}-body`,
                ]
            },
            footClass() {
                return [
                    `${prefix}-footer`,
                ]
            }
        }
    }
</script>

<style lang="less" rel="stylesheet" scoped>

</style>
