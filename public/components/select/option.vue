<template >
    <li :class="classes" :value="value" @click="update(value)"><slot></slot></li>
</template>

<script>
    const prefix = 'yui-select-ul-item'
    export default {
        name: 'Option',
        computed: {
            classes ()  {
                return [
                    `${prefix}`,
                    {
                        [`${prefix}-active`]: this.currentValue === this.$parent.currentValue
                    }
                ]
            }
        },
        props: {
            value: '',
            label: ''
        },
        methods: {
            update (value) {
                console.log(this.$parent.multiple);
                if (this.$parent.multiple) {

                }else {
                    this.currentValue = value;
                    this.$parent.update(value);
                }
                this.$parent.handleClick();
            }
        },
        data () {
            return {
                currentValue: '1'
            }
        }
    }
</script>

<style lang="css">
</style>
