<template>
    <div id="wrapper">
        <header>
            <h1></h1>
            <h2>
              <span>＜</span>
              <span>＞</span>
          </h2>
            <div class="search">
                <input type="text" v-model="value" @keyup.enter="search">
                <i @click="search"></i>
            </div>
            <div></div>
        </header>
        <aside>
            <div class="top"></div>
            <div class="detail">
                <div class="pic"><img v-if="detail" :src="detail.al.picUrl" alt=""></div>
                <div class="name">
                    <span>{{detail ? detail.name : ''}}</span>
                    <span>{{detail ? detail.ar[0].name : ''}}</span></div>
                <div class="share"></div>
            </div>
        </aside>
        <article>
            <search-list :search-result="value"></search-list>
        </article>
        <footer>
            <div>
                <span class="prev" @click="prevSong"></span>
                <span class="play pausePic" @click="play"></span>
                <span class="next" @click="nextSong"></span>
            </div>
            <div class="progress">
                <div class="playtime">{{currentTime | get-time}}</div>
                <input type="range" id="gress" min="0" max="0">
                <div class="totalTime">{{detail.dt | get-time}}</div>
            </div>
            <div class="voice">
                <div class="pic voicePic"></div>
                <input type="range" id="volume" min="0" max="100">
            </div>
            <div></div>
        </footer>
        <audio id="audio" :src="url" controls="controls" @ended="nextSong" @timeupdate=""></audio>
    </div>
</template>
<style scoped lang="less" rel="stylesheet/less">
.ellipsis(@w: auto) {
    text-overflow: ellipsis;
    overflow: hidden;
    width: @w;
    white-space: nowrap;
}

#wrapper {
    width: 1022px;
    height: 670px;
    background: #16181c;
    position: relative;
    top: 50%;
    left: 50%;
    margin-left: -511px;
    margin-top: -335px;
    header {
        position: absolute;
        height: 47px;
        width: 100%;
        border-bottom: 2px solid #730909;
        background-color: #222225;
        display: flex;
        z-index: 2;
        h1 {
            width: 147px;
            height: 47px;
            background: url("../static/images/logo.png");
            background-size: cover;
        }
        h2 {
            width: 53px;
            height: 22px;
            margin: 12px 10px 0 50px;
            border: 1px solid #18181a;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            line-height: 22px;
            span {
                display: inline-block;
                box-sizing: border-box;
                height: 100%;
                color: #cfd0d1;
                font-size: 12px;
                text-align: center;
                width: 50%;
                &:first-child {
                    border-right: 1px solid #18181a;
                }
            }
        }
        .search {
            height: 22px;
            position: relative;
            margin-top: 12px;
            input {
                background: #161618;
                width: 220px;
                height: 22px;
                border-radius: 22px;
                color: #cfd0d1;
                font-size: 12px;
                padding: 0 10px;
                box-sizing: border-box;
            }
            i {
                display: inline-block;
                width: 12px;
                height: 13px;
                background: url("../static/images/search.png");
                position: absolute;
                right: 10px;
                top: 4px;
                cursor: pointer;
            }
        }
    }
    aside {
        position: absolute;
        top: 49px;
        bottom: 48px;
        width: 200px;
        border-right: 1px solid #23262c;
        background-color: #191b1f;
        display: flex;
        flex-direction: column;
        .top {
            flex: 1;
        }
        .detail {
            width: 200px;
            height: 60px;
            box-sizing: border-box;
            border: 1px solid #23262c;
            display: flex;
            border-left: none;
            .pic {
                width: 58px;
                height: 58px;
                img {
                    width: 100%;
                    height: auto;
                }
            }
            .name {
                width: 110px;
                height: 100%;
                color: #dcdde4;
                padding: 10px;
                box-sizing: border-box;
                span {
                    .ellipsis();
                    font-size: 12px;
                    display: block;
                    &:last-child {
                        margin-top: 5px;
                    }
                }
            }
            .share {
                flex: 1;
            }
        }
    }
    footer {
        position: absolute;
        height: 49px;
        border-top: 1px solid #23262c;
        width: 100%;
        bottom: 0;
        background-color: #222225;
        display: flex;
        align-items: center;
        #audio {
            display: none;
        }
        div {
            height: 100%;
        }
        div:first-child {
            width: 200px;
            display: flex;
            padding: 0 20px;
            box-sizing: border-box;
            justify-content: space-around;
            align-items: center;
            span {
                display: inline-block;
                cursor: pointer;
            }
            span.prev,
            span.next {
                width: 30px;
                height: 30px;
                border-radius: 100%;
                border: 1px solid #636366;
            }
            span.prev {
                background: url("../static/images/prev.png") center center no-repeat;
            }
            span.next {
                background: url("../static/images/next.png") center center no-repeat;
            }
            span.play {
                width: 34px;
                height: 34px;
                border-radius: 100%;
                border: 1px solid #636366;
            }
            span.playPic {
                background: url("../static/images/pause.png") center center no-repeat;
            }
            span.pausePic {
                background: url("../static/images/play.png") center center no-repeat;
            }
            span:hover {
                border-color: #cfd0d1;
            }
        }
        div.progress {
            width: 530px;
            display: flex;
            color: #dcdde4;
            align-items: center;
            .playtime {
                width: 40px;
                text-align: center;
                height: 24px;
                line-height: 24px;
                font-size: 12px;
            }
            input[type=range] {
                width: 438px;
            }
            .totalTime {
                flex: 1;
                text-align: center;
                height: 24px;
                line-height: 24px;
                font-size: 12px;
            }
        }
        div.voice {
            width: 140px;
            display: flex;
            align-items: center;
            cursor: pointer;
            .voicePic {
                width: 16px;
                height: 12px;
                background: url("/static/images/voiceBig.png") no-repeat 20px center;
            }
            .small {
                width: 8px;
                height: 12px;
                background: url("/static/images/voiceSmall.png") no-repeat 20px center;
            }
            input[type=range] {
                width: 100px;
            }
        }
        div:last-child {
            flex: 1;
        }
    }
    article {
        position: absolute;
        top: 47px;
        left: 201px;
        bottom: 48px;
        right: 0;
        overflow: auto;
        z-index: 1;
    }
}
</style>
<script>
import { mapGetters } from 'vuex'
import searchList from './components/searchList.vue';
import { getTime } from './assets/js/filters';
export default {
    name: 'app',
    mounted() {
        const _this = this;
        this.$store.dispatch('setAudio', document.querySelector('#audio'));
        document.querySelector('#gress').value = 0;
        this.$store.dispatch('setGress', document.querySelector('#gress'));
        this.$store.dispatch('setVolume', document.querySelector('#volume'));
        this.loading();
    },
    data() {
        return {
            value: '',
            volume: 0
        }
    },
    methods: {
        loading() {
            const _this = this;
            let volume = document.querySelector('#volume');
            let pic = document.querySelector('.voice .pic');
            _this.audio.volume = volume.value / 100;
            _this.audio.volume = volume.value / 100;
            let value = volume.value;
            volume.style.backgroundSize = `${volume.value}% 100%`;
            volume.oninput = function() {
                _this.audio.volume = this.value / 100;
                value = this.value;
                this.style.backgroundSize = `${this.value}% 100%`;
                if (this.value == 0) {
                    pic.className = 'pic small';
                } else {
                    pic.className = 'pic voicePic';
                }
            };
            pic.addEventListener('click', function() {
                if (this.className.indexOf('voicePic') !== -1) {
                    pic.className = 'pic small';
                    _this.audio.muted = true;
                    volume.value = 0;
                    volume.style.backgroundSize = `0 100%`;
                    _this.audio.volume = volume.value / 100;
                } else {
                    pic.className = 'pic voicePic';
                    _this.audio.muted = false;
                    volume.value = value;
                    _this.audio.volume = volume.value / 100;
                    volume.style.backgroundSize = `${value}% 100%`;
                }
            })
        },
        search() {
            let params = {
                search_type: '',
                search_key: this.value,
                offset: 0,
            };
            this.$store.dispatch('search', params);
        },
        play() {
            if (this.audio.paused) {
                this.audio.play();
                document.querySelector('.play').className = 'play playPic';
            } else {
                this.audio.pause();
                document.querySelector('.play').className = 'play pausePic';
            }
        },
        nextSong() {
            this.$store.dispatch('setNextIndex');
            let item = this.getList.songs[this.getIndex];
            let params = {
                id: item.id
            };
            document.querySelector('.play').className = 'play pausePic';
            this.$store.dispatch('getSong', params).then(() => {
                this.audio.play();
                document.querySelector('.play').className = 'play playPic';
                this.$store.dispatch('getSongDetail', this.getList.songs[this.getIndex]);
                this.$store.dispatch('setCurrentTime');
            });
        },
        prevSong() {
            this.$store.dispatch('setPrevIndex');
            let item = this.getList.songs[this.getIndex];
            let params = {
                id: item.id
            };
            document.querySelector('.play').className = 'play pausePic';
            this.$store.dispatch('getSong', params).then(() => {
                this.audio.play();
                document.querySelector('.play').className = 'play playPic';
                this.$store.dispatch('getSongDetail', this.getList.songs[this.getIndex]);
                this.$store.dispatch('setCurrentTime');
            });
        }
    },
    components: {
        searchList
    },
    computed: {
        ...mapGetters({
            url: 'getSongUrl',
            getList: 'getList',
            getIndex: 'getIndex',
            audio: 'getAudio',
            is_play: 'getStatus',
            detail: 'getDetail',
            currentTime: 'getCurrentTime',
            progress: 'getProgress'
        })
    },
    watch: {
        detail(val) {
            console.log(val);
        }
    },
    filters: {
        getTime: getTime
    }

}
</script>