<template lang="html">
    <div >
        <transition name="_modal" mode="out-in">
            <div class="modal-cover"  v-show="showConfirm" @click.stop="close">
                <div class="modal-content" :style="contentStyle" @click.stop>
                    <section v-html="content"></section>
                    <footer>
                        <button type="button" class="confirm " @click.stop="comfirm">确定</button>
                        <button type="button" class="default " @click.stop="close">取消</button>
                    </footer>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        created() {
            this.that = this;
        },
        data() {
            return {
                showConfirm: false,
                onClose: '',
                content: '',
                that: '',
                config: ''
            }
        },
        methods: {
            show(content, onClose, config) {
                this.showConfirm = true;
                this.content = content;
                if (onClose) {
                    this.onClose = onClose;
                }
                if (config) {
                    this.config = config;
                }
            },
            close() {
                this.showConfirm = false;
            },
            comfirm(){
                this.showConfirm = false;
                if (this.onClose && typeof this.onClose === 'function') {
                    this.onClose();
                }
            }
        },
        computed: {
            contentStyle () {
                if (!this.config) {
                    return '';
                }
                return {
                    width: this.config.width + 'px',
                    height: this.config.height + 'px',
                    marginLeft: -(this.config.width / 2) + 'px',
                    marginTop: -(this.config.height / 2) + 'px'
                }
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
    .modal-cover {
        position: fixed;
        z-index: 3;
        background-color: rgba(0, 0, 0, 0.3);
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        .modal-content {
            width: 300px;
            height: 150px;
            background: #fff;
            border-radius: 4px;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -150px;
            margin-top: -75px;
            padding: 24px;
            box-sizing: border-box;
        }
    }
    section{
        font-size: 12px;
        color: #666;
        height: ~'calc(100% - 33px)';
    }
    footer {
        overflow: hidden;
        button {
            padding: 6px 15px;
            float: right;
            color: #fff;
            transition: all .3s;
            border-radius: 4px;
            font-size: 12px;
            cursor: pointer;
            &.confirm {
                background: #3b79f2;
                &:hover {
                    background: #105AEA;
                }
            }
            &.default {
                background: #fff;
                border: 1px solid #ebebeb;
                color: #666;
                margin-right: 8px;
                &:hover {
                    border-color: #105AEA;
                }
            }
        }
    }
    ._modal-enter-active,
    ._modal-leave-active {
        transition: opacity .3s ease;
    }

    ._modal-enter-active > .modal-content,
    ._modal-leave-active > .modal-content {
        transition: transform .3s ease;
    }

    ._modal-enter,
    ._modal-leave-to {
        opacity: 0;
    }

    ._modal-enter > .modal-content,
    ._modal-leave-to > .modal-content {
        transform: translate3d(0, -120px , 0);
        will-change: transform;
    }
</style>
