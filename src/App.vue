<template>
    <div id="nav" class="container" style="width: 1300px;margin-left: 141px">
        <div class="row">
            <div class="col-lg-12 bd">
                <form class="form-inline" style="margin-left:-135px">
                    <div class="form-group">
                        <label class="sr-only" for="exampleInputAmount">Amount (in dollars)</label>
                        <div class="input-group">
                            <input style="font-style: oblique" type="text" class="form-control" id="exampleInputAmount"
                                   v-model="keyword" placeholder="音乐的力量">
                        </div>
                    </div>
                    <button type="button" style="font-style: oblique" class="btn btn-danger" @click="searchMusic">搜歌曲
                    </button>
                </form>
            </div>
        </div>
        <div class="row" style=" text-align:left;">
            <div>
                <span id="song1"
                      style="margin-left: 5px;font-weight: bold;font-size: 17px;color: #D9534F; font-style: oblique">歌单：</span><br>
                <div class="col-lg-2 bd menu" style="height: 610px;overflow: auto;margin-top: 26px">
                    <ul class="list-group">
                        <li class="list-group-item" v-for="s in songs" v-bind:key="s">
                            <a href="#" title="播放" style="text-decoration:none;" id="a1" @click="getMusic(s.id)">{{s.name}} </a>
                            <span id="a2" v-show="s.mvid!=0" title="MV" @click="openMV(s.id)"
                                  class="el-icon-video-play"></span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-lg-6 bd menu" style="height: 580px">
                <img :src="musicCover" v-bind:class="{ 'playC': isActive }"
                     style="height: 550px;weight:800px;margin-left:80px;border-radius: 300px;margin-top: 10px;margin-bottom: 10px">

                <div class="col-lg-12 myborder" v-show="flagshow" style="margin-top: 13px">
                    <audio :src="musicSrc" autoplay controls loop
                           style="margin-left: 200px;outline: none;color:#D9534F " @pause="switch1"
                           @play="switch1"></audio>
                </div>
            </div>
            <span style="margin-left: 107px;font-weight: bold;color: #D9534F; font-size: 17px;font-style: oblique">网易云热评：</span>
            <div class="col-lg-4 bd menu" style="height: 614px; width:300px;margin-left: 90px;overflow: auto">

                <ul class="list-group">
                    <li id="content1" class="list-group-item" v-for="s in content" v-bind:key="s">
                        <br><span style="color:#C9302C ">{{s.user.nickname}} ：</span>{{s.content}}<br><br>
                    </li>
                </ul>
            </div>

            <video :src="mvUrl" v-if="isActive2" style="width: 764px;height: 440px" autoplay controls loop
                   @blur="close1" id="video1"></video>

        </div>


    </div>


</template>

<script>

    const axios = require("axios")

    export default {
        name: 'App',
        data() {
            return {
                keyword: "赵雷",
                songs: [],
                musicSrc: '',
                mvSrc: '',
                musicCover: '',
                flagshow: false,
                content: [],
                isActive: true,
                isActive2: false,
                mvUrl: "",
            }
        },

        methods: {
            //获取歌曲列表
            searchMusic: function () {
                const url = "https://musicapi.leanapp.cn/search?keywords=" + this.keyword + "&limit=100"
                axios.get(url).then(res => {
                    // let result = res.data.result.songs
                    //this.songs = res.data.result.songs
                    //歌单置空
                    this.songs = []
                    // if (result.length > 14) {
                    //     for (let i = 0; i < 14; i++) {
                    //         this.songs.push(result[i])
                    //     }
                    // } else {
                    this.songs = res.data.result.songs
                    // }
                })
            },
            // 根据歌曲id获取歌曲
            getMusic: function (id) {

                //显示播放框
                this.flagshow = true;
                // 获取id
                const url = "https://autumnfish.cn/song/url?id=" + id
                axios.get(url).then(res => {
                    this.musicSrc = res.data.data[0].url;
                })

                const url2 = "https://autumnfish.cn/song/detail?ids=" + id;
                axios.get(url2).then(res => {
                    // console.log(res.data.songs[0].al.picUrl)
                    this.musicCover = res.data.songs[0].al.picUrl
                })

                const url3 = "https://autumnfish.cn/comment/hot?type=0&id=" + id;
                axios.get(url3).then(res => {
                    this.content = res.data.hotComments
                })
            },
            // mv
            openMV: function (id) {
                this.isActive2 = true

                const url4 = "https://autumnfish.cn/song/detail?ids=" + id
                axios.get(url4).then(res => {
                    var mvid = res.data.songs[0].mv
                    const url5 = "https://autumnfish.cn/mv/url?id=" + mvid
                    axios.get(url5).then(res => {
                        this.mvUrl = res.data.data.url
                        document.getElementById('video1').focus()
                    })
                })

            },

            close1: function () {
                this.isActive2 = false
            },


            switch1: function () {
                if (this.isActive == true) {
                    this.isActive = false
                } else {
                    this.isActive = true
                }
            }
        },
    }


</script>


<style>
    #app {
        text-align: center;
        color: #2c3e50;
    }

    * {
        margin: 0;
        padding: 0;
    }

    #nav {
        padding: 10px;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }

    .playC {
        -webkit-animation-play-state: paused;
    }

    img {
        -webkit-animation: run 16s linear 0s infinite;
    }

    img:hover {
        -webkit-animation-play-state: paused;
    }

    @-webkit-keyframes run {
        from {
            -webkit-transform: rotate(0deg);
        }
        to {
            -webkit-transform: rotate(360deg);
        }
    }

    body {
        background-image: url("assets/bg.jpg");
        background-size: cover;
    }

    ::-webkit-scrollbar {
        display: none;
    }

    ul {
        filter: alpha(opacity=60);
        -moz-opacity: 1;
        opacity: 0.7;
    }

    #content1 {
        text-align: left;
    }

    #song1 {
        position: absolute;
        left: 148px;
        top: 66px;
    }

    #a1:hover {
        color: #C9302C;
    }

    #a2:hover {
        font-size: 18px;
    }

    #a2 {
        position: absolute;
        left: 160px;
        color: #C9302C;
        font-size: larger;
    }

    #video1 {
        position: absolute;
        left: 345px;
        top: 92px;
        outline: none;
    }
</style>
