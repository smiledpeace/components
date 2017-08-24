<template>
    <div :class="wrapClass">
        <div :class="classes" @click.stop="handleClick">
            <div :class="inputClass" @change="update" v-if="!search">{{ currentValue }}</div>
            <input type="text" name="" :value="currentValue" :class="inputClass" v-if="search" @input="queryData">
        </div>
        <transition :name="transitionName" >
            <ul :class="ulClasses" v-show="showOption">
                <slot></slot>
            </ul>
        </transition>
    </div>
</template>

<script>
    const prefix = 'yui-select'
    export default {
        data () {
            return {
                showOption: false,
                currentValue: ''
            }
        },
        methods: {
            update (value) {
                this.currentValue = value;
                this.$emit('input', value);
            },
            handleClick () {
                this.showOption = !this.showOption;
            },
            queryData (e) {
                let search_key = e.target.value;
                // this.$emit('on-select-search', search_key);
                // if (this.search) {
                //     this.$parent.options
                // }
                console.log(search_key);
                const childs = this.$children.filter(child => {
                    return child.value.indexOf(search_key) === -1;
                });
                childs.map(item => {
                    return item.$el.style.display = 'none';
                })
                console.log(childs);
            },
            handleKeydown (e) {
                const keyCode = e.keyCode
            }
        },
        props: {
            readonly: {
                default: true
            },
            multiple: {
                default: false
            },
            search: ''
        },
        mounted () {
            let _this = this;
            document.addEventListener('click', function clickSelect() {
                if (_this.showOption) {
                    _this.showOption = false;
                }
            })
        },
        beforeDestory () {
            document.removeEventlistener('clickSelect');
        },
        computed: {
            classes () {
                return [
                    `${prefix}`,
                    {
                        [`${prefix}-active`]: this.showOption
                    }
                ]
            },
            wrapClass () {
                return `${prefix}-wrapper`
            },
            ulClasses () {
                return `${prefix}-ul`;
            },
            transitionName () {
                return 'slide-up';
            },
            inputClass () {
                return `${prefix}-input`;
            }
        }
    }
</script>
