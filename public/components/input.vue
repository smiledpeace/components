<template>
    <div class="yui-form-item">
        <label :class="classes" :for="`yui-${nowId}`"><span class="yui-dot" v-if="is_option">*</span>{{label}} </label>

        <input :type="type"
               :value="value"
               :id="`yui-${nowId}`"
               :placeholder="placeholder"
               @input="handleInput"
        >
    </div>
</template>
<script>
    const prefix = 'yui';
    export default {
        mounted() {

        },
        data() {
            return {

            }
        },
        methods: {
            handleInput (e) {
                let val = e.target.value;
                this.$emit('input', val);
            }
        },
        props: {
            type: {
                default: 'text',
            },
            value: '',
            placeholder: '',
            label: '',
            is_option: ''
        },
        components: {},
        computed: {
            nowId (){
                return +new Date();
            },
            classes () {
                return [
                    `${prefix}-label`,
                    {
                        [`${prefix}-label-top`]: this.top,
                    }
                ]
            }
        }
    }
</script>
