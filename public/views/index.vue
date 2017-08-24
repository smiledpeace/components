<template>
    <div class="yui-editor">
        <!-- <div style="padding: 20px; margin: 50px auto; width: 600px; overflow: auto; height: 800px;">
            <ul v-for="note in lists">
                <li v-for="item in note.roll"><a href="javascript:;" @click="saveData(item)">{{ item.title }}</a></li>
            </ul>

        </div> -->
        <ul class="editor_ul">
            <li v-for="item in notes"><a href="javascript:;" @click="saveData(item)">{{ item.title }}</a></li>
        </ul>

    </div>
</template>
<script>
import {
    mapGetters
} from 'vuex';
export default {
    mounted() {
        this.init();
        let params = {
            company_id: '12312'
        };
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
