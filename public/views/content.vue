<template >
    <div class="yui-article">
        <h3 class="title">{{ items.title }}</h3>
        <template v-if="(items.content instanceof Array)">
            <p v-for="content in items.content" >{{ content.content }}</p>
        </template>
        <p v-else>
            {{ items.content }}
        </p>
    </div>
</template>

<script>
    export default {
        created () {
            let id = document.querySelector('#param1').value;
            this.init(id);
        },
        data () {
            return {
                items: ''
            }
        },
        methods: {
            init (id) {
                ajaxQuery('getAritcle', {art_id: id}, res => {
                    res.data.content = JSON.parse(decodeURIComponent(res.data.content))
                    document.title = res.data.title;
                    this.items = res.data;
                    // console.log(this.items.content.toString());
                    console.log(this.items.content);
                })
            }
        }
    }
</script>
