<template >
    <div class="yui-loading-warpper" v-show="showLoader">
        <Loading></Loading>
    </div>
</template>

<script>
import Loading from './loading.vue';
    export default {
        data () {
            return {
                showLoader: false
            }
        },
        components: {
            Loading
        },
        methods: {
            hide () {
                this.showLoader = false;
            },
            show () {
                this.showLoader = true;
            }
        }
    }
</script>
