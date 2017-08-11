<template>
    <div class="wrapper">
        fffasdasd
        sdfsdfsdfsdsasdasdasdasds

        <button @click="add">CLick Me</button>

        <section>
            <article>1231</article>
        </section>
    </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
    @bc: #3b3;
    .wrapper {
        color: @bc;
        font-size: 20px;
        border: 1px solid @bc;
        width: 300px;
        height: 200px;
        border-radius: 5px;
        font-family: sans-serif;
    }

    section {
        display: grid;
    }
</style>
<script>
    export default {
        mounted () {
            let params = {
                company_id: '12312'
            };
            ajaxQuery('getAllList', params, function (res) {
            })
        },
        data() {
            return {}
        },
        methods: {
            add () {
                let post = {
                    company_id: '12312',
                    title: 'text',
                    author: 'Young',
                    cover: '',
                    content: 'hahahhahaha',
                    category: 'list',
                    status: '0',
                };
                return;
                ajaxQuery('addPost', post , function (res) {
                    console.log(res);
                })
            }
        },
        props: [],
        components: {}
    }
</script>
