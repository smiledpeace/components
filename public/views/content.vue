<template >
    <div style="height: 100%; background: #669;">
        <!-- <h3 class="title">{{ items.title }}</h3>
        <template v-if="(items.content instanceof Array)">
            <p v-for="content in items.content" >{{ content.content }}</p>
        </template>
        <p v-else>
            {{ items.content }}
        </p> -->
        <filp :contents="items" :title="title"></filp>
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
                items: [],
                title: ''
            }
        },
        methods: {
            init (id) {
                let fonts = 300;
                ajaxQuery('getAritcle', {art_id: id}, res => {
                    res.data.content = JSON.parse(decodeURIComponent(res.data.content))

                    console.log(JSON.parse(JSON.stringify(res.data)));

                    document.title = res.data.title;
                    this.title = res.data.title;
                    let tempArr = res.data.content, lastArr;
                    let sum = 0, temp = [];
                    for (var i = 0; i < tempArr.length; i++) {
                        var _item = tempArr[i] ;
                        sum += _item.content.toString().length;
                        temp.push(_item)
                        if (sum > fonts) {
                            this.items.push(temp);
                            sum = 0;
                            temp = [];
                            continue;
                        }
                    }
                    // lastArr = tempArr.splice(0, (tempArr.length - tempArr.length % 19))
                    // while (lastArr.length) {
                    //     this.items.push(lastArr.splice(0, 19));
                    // }
                    // this.items.push(tempArr);
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
