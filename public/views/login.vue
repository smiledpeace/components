<template>
    <div class="yui-register">
        <h3>原来只因已入骨</h3>
        <form class="yui-form">
            <y-input v-model="nickname" :is_option="1" placeholder="昵称"></y-input>

            <y-input v-model="password" type="password" placeholder="密码" :is_option="1" @keydown.enter="submit"></y-input>
        </form>
        <div style="margin: 16px 24px;">
            <y-button @click="submit" type="primary">登录</y-button>
        </div>
    </div>
</template>
<script>
    export default {
        mounted() {
        },
        data() {
            return {
                nickname: '',
                password: ''
            }
        },
        methods: {
            submit () {
                if (this.nickname === '' || this.password === '') {
                    this.$Message.warning('请完善内容');
                    return;
                }
                let pramas = {
                    nickname: this.nickname,
                    password: this.password,
                };
                ajaxQuery('login', pramas , (res) => {
                    this.$Message.success('登录成功');
                    setTimeout(() => {
                        location.href = '/index';
                    }, 1000);
                }, res => {
                    this.$Message.error(res.msg);
                })
            }
        },
        props: [],
        components: {}
    }
</script>
