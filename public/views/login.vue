<template>
    <div class="yui-register">
        <div>
            <label for="nickname">昵称</label> <input type="text" v-model="nickname" id="nickname">
        </div>
        <div>
            <label for="pwd">密码</label> <input type="password" v-model="password" id="pwd">
        </div>

        <button @click="submit">保存</button>
    </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>

</style>
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
                    return;
                }
                let pramas = {
                    nickname: this.nickname,
                    password: this.password,
                };
                ajaxQuery('login', pramas , function (res) {
                    console.log(2312);
                    location.href = '/index';
                })
            }
        },
        props: [],
        components: {}
    }
</script>
