<template>
    <label :class="classes">
        <span :class="radioClass">
            <span :class="innerClass"></span>
            <input type="radio" @change="handleRadio" :checked="currentValue" :class="inputClass">
        </span>
        <slot>{{ label }}</slot>
    </label>
</template>
<style lang="less" rel="stylesheet/less" scoped>
</style>
<script>
    const prefix = 'yui-radio';
    import {findComponentUpward} from '../../assets/utils';
    export default {
        name: 'Radio',
        mounted() {
            if (this.parent) this.group = true;

            if (!this.group) {
                this.updateValue();
            } else {
                this.parent.updateValue();
            }
        },
        data() {
            return {
                currentValue: this.value,
                parent: findComponentUpward(this, 'RadioGroup'),
                group: false
            }
        },
        methods: {
            handleRadio (e) {
                const checked = event.target.checked;
                this.currentValue = checked;
                this.$emit('input', checked);
                if (this.group && this.label !== undefined) {
                    this.parent.change({
                        value: this.label,
                        checked: this.value
                    });
                }
                if (!this.group) {
                    this.$emit('on-change', checked);
//                    this.dispatch('FormItem', 'on-form-change', checked);
                }
            },
            updateValue () {
                this.currentValue = this.value;
            }
        },
        props: {
            value: {
                type: Boolean,
                default: false
            },
            label: {
                type: [String, Number]
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        components: {},
        computed: {
            classes () {
                return [
                    `${prefix}-wrapper`,
                    {
                        [`${prefix}-group-item`]: this.group,
                    }
                ]
            },
            radioClass () {
                return [
                    `${prefix}`,
                    {
                        [`${prefix}-checked`]: this.currentValue,
                        [`${prefix}-disabled`]: this.disabled
                    }
                ]
            },
            inputClass () {
                return `${prefix}-input`;
            },
            innerClass () {
                return `${prefix}-inner`;
            }

        },
        watch: {
            value (val) {
                console.log(val);
                this.updateValue();
            }
        }
    }
</script>
