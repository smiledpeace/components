<template>
    <div class="yui-register">
        <h3>惊觉相思不露</h3>
        <form class="yui-form">
            <y-input v-model="nickname" :is_option="1" label="姓名"></y-input>

            <y-input v-model="password" type="password" label="密码" :is_option="1"></y-input>
        </form>

        <y-button @click="submit" type="primary">注册</y-button>
    </div>
</template>
<script>
    export default {
        mounted() {
        },
        data() {
            return {
                nickname: '',
                password: '',
            }
        },
        methods: {
            submit () {
                console.log(1243);
                if (this.nickname === '' || this.password === '') {
                    this.$Message.error('错误');
                    return;
                }
                let pramas = {
                    nickname: this.nickname,
                    password: this.password,
                };
                ajaxQuery('register', pramas , function () {
                    location.href = '/login';
                })
            }
        },
        props: [],
        components: {}
    }
</script>
