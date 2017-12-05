<template>
    <label class="yui-toggle" for="yui-toggle-input">
        <input type="checkbox" class="yui-toggle-input" id="yui-toggle-input" v-model="checked">
        <div class="yui-toggle-path" :class="classes">
            <div class="yui-toggle-dot" :class="classes" ></div>
        </div>
    </label>
</template>
<script>
	const prefix = 'yui';
	export default {
	    mounted() {

	    },
	    data() {
	        return {
	        	checked: false
	        }
	    },
	    methods: {
	    	handleClick() {
	    		console.log(this.checked);
	    	}
	    },
	    props: {

	    },
	    components: {},
	    computed: {
	        nowId() {
	            return +new Date()
	        },
	        classes() {
	        	console.log(1313);
	        	return [
	        		this.checked ? 'checked' : '' 
	        	]
	        }
	    }
	}
</script>