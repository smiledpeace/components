<template >
    <div class="yui-article">
        <!-- <h3 class="title">{{ items.title }}</h3>
        <template v-if="(items.content instanceof Array)">
            <p v-for="content in items.content" >{{ content.content }}</p>
        </template>
        <p v-else>
            {{ items.content }}
        </p> -->
        <filp :contents="items"></filp>
    </div>
</template>

<script>
    import filp from '../components/flipPages/index.vue';
    export default {
        created () {
            let id = document.querySelector('#param1').value;
            this.init(id);
        },
        data () {
            return {
                items: []
            }
        },
        methods: {
            init (id) {
                ajaxQuery('getAritcle', {art_id: id}, res => {
                    res.data.content = JSON.parse(decodeURIComponent(res.data.content))
                    document.title = res.data.title;
                    let tempArr = res.data.content, lastArr;
                    lastArr = tempArr.splice(0, (tempArr.length - tempArr.length % 19))
                    while (lastArr.length) {
                        this.items.push(lastArr.splice(0, 19));
                    }
                    this.items[0].title = res.data.title;
                    this.items.push(tempArr);
                    console.log(JSON.parse(JSON.stringify(this.items)));
                })
            },
            gcd( a, b = 2 ) {
                // if ( a % b != 0 ) {
                //     b++;
                //     this.gcd(a, b);
                // }else {
                //     return b;
                // }

            }
        },
        components: {
            filp
        }
    }
</script>
