<template>
    <div >
        <Notice
                v-for="notice in notices"
                :key="notice.name"
                :content="notice.content">
        </Notice>
    </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
</style>
<script>
    import Notice from './notice.vue'
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
            },
            closeAll () {
                this.notices = [];
            }
        },
        props: [],
        components: {
            Notice
        }
    }
</script>
