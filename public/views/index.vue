<template>
    <div class="yui-editor">
        <!-- <div style="padding: 20px; margin: 50px auto; width: 600px; overflow: auto; height: 800px;">
            <ul v-for="note in lists">
                <li v-for="item in note.roll"><a href="javascript:;" @click="saveData(item)">{{ item.title }}</a></li>
            </ul>

        </div> -->
        <button type="button" name="button" class="yui-button" @click="goFilp">Go To Filp</button>
        <ul class="editor_ul">
            <li v-for="item in notes"><a href="javascript:;" @click="saveData(item)">{{ item.title }}</a></li>
        </ul>
    </div>
</template>
<script>
import {
    mapGetters
} from 'vuex';

import viewUtils from '../js/viewUtils.js'
export default {
    mounted() {
        this.init();
        let params = {
            company_id: '12312'
        };
        viewUtils.each({name: 'Tom', age: 1}, (item, key) => {
            console.log(item);
        })
        let obj = viewUtils.extend({}, {name: 'Tom', age: 1})
        console.log(obj);
        console.log(viewUtils);
    },
    data() {
        return {
            url: '',
            options: ['123', '345', '3432'],
            favorite: '',
            favorite2: '',
            items: '',
            lists: []
        }
    },
    methods: {
        init() {
            ajaxQuery('getAllList', "", res => {
                this.items = res.data;
                this.$store.dispatch('setList', res);
            });
        },
        add() {
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
            ajaxQuery('addPost', post, function(res) {})
        },
        addNote(e) {
            this.$store.dispatch('addNote', e);
        },
        saveData(item) {
            ajaxQuery('getAllList', {
                url: item.url,
                title: item.title
            }, res => {
                location.href = `/aritcle/${res.data}`;
            })
        },
        goFilp() {
            location.href = `/filp`;
        }
    },
    props: [],
    components: {},
    computed: {
        notes() {
            return this.$store.getters.getNotes;
        }
    },
}
</script>
