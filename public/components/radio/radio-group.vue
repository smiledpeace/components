<template>
    <div :class="classes">
        <slot></slot>
    </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
</style>
<script>
    import { findComponentsDownward } from '../../assets/utils';
    const prefix = 'yui-radio-group';
    export default {
        name: 'RadioGroup',
        mounted() {

        },
        data() {
            return {
                currentValue: this.value,
                childrens: []
            }
        },
        methods: {
            updateValue () {
                const value = this.currentValue;
                this.childrens = findComponentsDownward(this, 'Radio');
                if (this.childrens) {
                    this.childrens.forEach(child => {
                        child.currentValue = value === child.label;
                        child.group = true;
                    });
                }
            },
            change (data) {
                this.currentValue = data.value;
                this.updateValue();
                this.$emit('input', data.value);
                this.$emit('on-change', data.value);
//                this.dispatch('FormItem', 'on-form-change', data.value);
            }
        },
        props: {
            value: {
                type: [String, Number],
                default: false
            },
        },
        components: {},
        computed: {
            classes () {
                return [
                    `${prefix}`
                ]
            }
        }
    }
</script>
