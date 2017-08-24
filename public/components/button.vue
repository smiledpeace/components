<template>
    <button :class="classes" @click="handleClick" >
        <span><slot></slot></span>
    </button>
</template>
<script>
    const prefix = 'yui';
    export default {
        mounted() {
        },
        data() {
            return {}
        },
        methods: {
            handleClick (event) {
                this.$emit('click', event);
            },
        },
        props: {
            type: {
                default: 'default'
            }
        },
        components: {},
        computed: {
            classes () {
                return [
                    `${prefix}-button`,
                    {
                        [`${prefix}-button-${this.type}`]: this.type
                    }
                ]
            }
        }
    }
</script>
