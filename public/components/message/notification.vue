<template>
    <div class="yui-cover">
        <Notice
                v-for="notice in notices"
                :key="notice.name"
                :content="notice.content"
                :duration="notice.duration"
                :name="notice.name"
                :on-close="notice.onClose"
                :prefix-cls="prefixCls"
                :transition-name="notice.transitionName"
                :styles="styles">
        </Notice>
    </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
</style>
<script>
    import Notice from './notice.vue';
    let seed = 0;

    const now = Date.now();

    function getUuid () {
        return 'yui-message-key-' + now + '-' + (seed++);
    }

    export default {
        mounted() {
        },
        data() {
            return {
                notices: []
            }
        },
        methods: {
            add (notice) {
                const name = notice.name || getUuid();

                let _notice = Object.assign({
                    styles: {
                        right: '50%'
                    },
                    content: '',
                    duration: 1.5,
                    closable: false,
                    name: name
                }, notice);
                this.notices.push(_notice);
            },
            close (name) {
                const notices = this.notices;
                for (let i = 0; i < notices.length; i++) {
                    if (notices[i].name === name) {
                        this.notices.splice(i, 1);
                        break;
                    }
                }

                this.$nextTick(() => {
                    if (document.querySelector('.yui-cover')) {
                        document.querySelector('.yui-cover').style.height = '0';
                    }
                })
            },
            closeAll () {
                this.notices = [];
            }
        },
        props: {
            prefixCls: {},
            styles: {}
        },
        components: {
            Notice
        }
    }
</script>
