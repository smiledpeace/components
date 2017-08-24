<template>
    <div class="yui-register">
        <h3>惊觉相思不露</h3>
        <form class="yui-form">
            <y-input v-model="nickname" :is_option="1" placeholder="昵称"></y-input>

            <y-input v-model="password" type="password" placeholder="密码" :is_option="1" @keydown.enter="submit"></y-input>

            <!--<y-radio v-model="sex2" label="南"></y-radio>-->
            <y-radios v-model="sex" class="yui-form-item">
                <y-radio label="name"></y-radio>
                <y-radio label="sex"></y-radio>
            </y-radios>
            <!--<y-upload></y-upload>-->

        </form>

        <div style="margin: 16px 24px;">
            <y-button @click="submit" type="primary">注册</y-button>
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
                password: '',
                sex: '',
                sex2: false
            }
        },
        methods: {
            submit () {
                const _this = this;
                if (this.nickname === '' || this.password === '') {
                    this.$Message.warning('请完善内容');
                    return;
                }
                let pramas = {
                    nickname: this.nickname,
                    password: this.password,
                };
                ajaxQuery('register', pramas , function () {
                    _this.$Message.success('注册成功');
                    setTimeout(() => {
                        location.href = '/login';
                    }, 1000);
                }, function () {
                    _this.$Message.error('用户已存在');
                });
            }
        },
        props: [],
        components: {}
    }
</script>
