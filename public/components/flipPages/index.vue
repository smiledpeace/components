<template lang="html">
    <div class="yui-filp" @touchstart="startFun" @touchmove="moveFun" @touchend="endFun">
        <div class="page one" >
            <span >1</span>
        </div>
        <div class="page two" >
            <span >2</span>
        </div>
        <div class="page three">
            <span >3</span>
        </div>
    </div>
</template>

<script>
    // import
    const getCss = function (o, key) {
        return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o, false)[key];
    }
    const MaxLength = parseInt(getCss(document.querySelector('#app'), 'height'));
    export default {
        mounted() {
            let slice = Array.prototype.slice;
            this.$nextTick(() => {
                this.allPages = slice.call(document.querySelectorAll('.page'));
                this.allPages.forEach((item, index, arr) => {
                    item['next'] = arr[index + 1];
                    item['prev'] = arr[index - 1];
                    item['cur'] = item;
                });
                this.currentPage = this.allPages[0];
                console.log(this.allPages);
            });
            this.maxLenght = MaxLength / 3;
            this.lastLength = MaxLength - this.maxLenght;
        },
        data() {
            return {
                maxLenght: 0,
                lastLength: 0,
                startDistanceY: 0,
                endDistanceY: 0,
                gap: 0,
                currentPage: '',
                activepage: '',
                allPages: ''
            }
        },
        methods: {
            startFun(evt) {
                let touches = evt.touches[0];
                this.startDistanceY = touches.pageY;
            },
            hasClass(el, className) {
                return el.classList.contains(className)
            },
            removeClass(el, className) {
                el.classList.remove(className);
            },
            addClass(el, className) {
                el.classList.add(className);
            },
            moveFun(evt) {
                let touches = evt.touches[0];
                this.endDistanceY = touches.pageY;
                let gap = this.endDistanceY - this.startDistanceY;
                let prev = this.currentPage.prev, next = this.currentPage.next;
                console.log(gap);
                //gap < 0 往上滑
                //gap > 0 往下滑
                if (gap > 0 && prev) { // 往下滑
                    // if (this.hasClass(prev, 'leave')) {
                    //     this.removeClass(prev, 'leave');
                    // }
                    console.log(this.currentPage);
                    if (this.hasClass(prev, 'leave')) {
                        this.removeClass(prev, 'leave');
                        // this.addClass(this.currentPage, 'active')
                    }
                    prev.style.transform = `translate3d(0, ${gap - MaxLength}px, 0)`
                    this.currentPage.style.transform = `translate3d(0, ${gap}px, 0)`;
                }else{
                    this.currentPage.style.transform = `translate3d(0, ${gap}px, 0)`;
                }
            },
            endFun(evt) {
                this.renderFun(this.endDistanceY - this.startDistanceY);
            },
            renderFun(gap) {
                //gap < 0 往上滑
                //gap > 0 往下滑
                this.currentPage.style.transition = "transform .3s ease";
                if (this.currentPage.prev) {
                    this.currentPage.prev.style.transition = "transform .3s ease";
                }

                if (gap < 0) {
                    this.activepage = this.currentPage.next ? this.currentPage.next : this.currentPage;
                    if (Math.abs(gap) > this.maxLenght) {
                        if (this.currentPage.next) {
                            this.currentPage.style.transform = `translate3d(0, -100%, 0)`
                        }else {
                            this.currentPage.style.transform = `translate3d(0, 0, 0)`;
                        }
                        setTimeout(() => {
                            this.currentPage.style = '';
                            if (this.currentPage.next) {
                                this.currentPage.className += " leave";
                            }
                            this.currentPage = this.activepage;
                        }, 300);
                    }else {
                        this.currentPage.style.transform = `translate3d(0, 0, 0)`;
                        setTimeout(() => {
                            this.currentPage.style = '';
                        }, 300);
                    }
                }else if (gap > 0) {
                    this.activepage = this.currentPage.prev ? this.currentPage.prev : this.currentPage;
                    if (Math.abs(gap) > this.maxLenght) {
                        if (this.currentPage.prev) {
                            this.currentPage.prev.style.transform = `translate3d(0, 0, 0)`;
                        }else {
                            this.currentPage.style.transform = `translate3d(0, 0 , 0)`;
                        }
                        setTimeout(() => {
                            this.currentPage.style = '';
                            if (this.currentPage.prev) {
                                if (this.hasClass(this.currentPage, 'active')) {
                                    this.removeClass(this.currentPage, 'active')
                                }
                                this.currentPage.className += " leave"
                            }
                            this.currentPage = this.activepage;
                        }, 300);
                    }else {
                        this.currentPage.style.transform = `translate3d(0, 0 , 0)`;
                        if (this.currentPage.prev) {
                            this.currentPage.prev.style.transform = `translate3d(0, -100% , 0)`;
                            this.currentPage.prev.className += " leave"
                        }
                        setTimeout(() => {
                            this.currentPage.style = '';
                            if (this.currentPage.prev) {
                                this.currentPage.prev.style = '';
                            }
                        }, 300);
                    }
                }
            }
        }
    }
</script>
