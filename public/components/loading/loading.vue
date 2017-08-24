<template lang="html">
    <div class="yui-loading-warpper" v-show="showLoader">
        <div class="yui-loader">
            <svg viewBox="0 0 32 32" width="32" height="32">
                <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
            </svg>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Loading',
        data () {
            return {
                showLoader: false
            }
        },
        methods: {
            hide () {
                this.showLoader = false;
            },
            show () {
                this.showLoader = true;
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .yui-loading-warpper {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        .yui-loader {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            #spinner {
                box-sizing: border-box;
                stroke: #673AB7;
                stroke-width: 3px;
                transform-origin: 50%;
                animation: line 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite, rotate 1.6s linear infinite;
            }
        }
    }
    @-webkit-keyframes rotate {
        from {
            -webkit-transform: rotate(0);
            transform: rotate(0);
        }
        to {
            -webkit-transform: rotate(450deg);
            transform: rotate(450deg);
        }
    }
    @keyframes rotate {
        from {
            -webkit-transform: rotate(0);
            transform: rotate(0);
        }
        to {
            -webkit-transform: rotate(450deg);
            transform: rotate(450deg);
        }
    }
    @-webkit-keyframes line {
        0% {
            stroke-dasharray: 2, 85.964;
            -webkit-transform: rotate(0);
            transform: rotate(0);
        }
        50% {
            stroke-dasharray: 65.973, 21.9911;
            stroke-dashoffset: 0;
        }
        100% {
            stroke-dasharray: 2, 85.964;
            stroke-dashoffset: -65.973;
            -webkit-transform: rotate(90deg);
            transform: rotate(90deg);
        }
    }
    @keyframes line {
        0% {
            stroke-dasharray: 2, 85.964;
            -webkit-transform: rotate(0);
            transform: rotate(0);
        }
        50% {
            stroke-dasharray: 65.973, 21.9911;
            stroke-dashoffset: 0;
        }
        100% {
            stroke-dasharray: 2, 85.964;
            stroke-dashoffset: -65.973;
            -webkit-transform: rotate(90deg);
            transform: rotate(90deg);
        }
    }
</style>
