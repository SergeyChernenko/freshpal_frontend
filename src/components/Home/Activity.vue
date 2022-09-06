

<template>
    <div>
        <div class="menu_activity">
            <div class="component_style" v-on:click="get_like">
                <p v-if="activity == 'like'" style="color: #36d436;" class="text">Лайки <span v-if="count_like != 0" style="color: #36d436;">{{count_like}}</span></p>
                <p v-if="activity != 'like'" class="text">Лайки <span v-if="count_like != 0" style="color: #36d436;">{{count_like}}</span></p>
            </div>
            <div style="margin-left: 10px" class="component_style" v-on:click="get_sub">
                <p v-if="activity == 'sub'" style="color: #36d436;" class="text">Подписки <span v-if="count_sub != 0" style="color: #36d436;">{{count_sub}}</span></p>
                <p v-if="activity != 'sub'" class="text">Подписки <span v-if="count_sub != 0" style="color: #36d436;">{{count_sub}}</span></p>
            </div>
            <div style="margin-left: 10px" class="component_style" v-on:click="get_men">
                <p v-if="activity == 'men'" style="color: #36d436;" class="text">Упоминания <span v-if="count_men != 0" style="color: #36d436;">{{count_men}}</span></p>
                <p v-if="activity != 'men'" class="text">Упоминания <span v-if="count_men != 0" style="color: #36d436;">{{count_men}}</span></p>
            </div>
        </div>
        <div style="margin-top: 30px" v-if="activity == 'like'">
            <div id="div_load_like" style="margin-top: 25px; height: 30px" class="vld-parent">
                <loading :active.sync="isLoadingLike"
                :is-full-page="false"
                :heigh="30"
                :width="30"
                color="#40ff40"
                :opacity="0"
                ></loading>
            </div>
            <div v-for="like in likes">
                <div style="display: flex; margin-bottom: 20px">
                    <a class="sub_link" v-on:click.middle.stop="go_page(like.username__username, true)" v-on:click.stop="go_page(like.username__username, false)">
                    <img v-if="like.username != null" class="img_p" :src="$hostname+'/media/profile/'+like.username+'/'+like.username+'.png'"></a>
                    <div class="flex_2">
                        <a class="sub_link" v-on:click.middle.stop="go_page(like.username__username, true)" v-on:click.stop="go_page(like.username__username, false)">{{like.username__username | truncate(14, '...')}}</a>
                        <span v-if="like.positive == true" class="level_publ_style_true" style="margin: 0px 10px 0px 5px">{{like.level}}</span>
                        <span v-if="like.positive == false" class="level_publ_style_false" style="margin: 0px 10px 0px 5px">{{like.level}}</span>
                        нравится
                        <a style="color: #40ff40 !important; margin: 0px 5px 0px 5px" class="sub_link" v-on:click.middle.stop="go_publ(like.publication, true)" v-on:click.stop="go_publ(like.publication, false)">ваша</a>
                        публикация {{like.datetime}}
                    </div>
                </div>
            </div>
            <div style="display: none" id="no_like_men">
                <p style="margin-top: 70px" class="text_style_2">У вас пока нет лайков</p>
            </div>
            <div v-observe-visibility="handleScrolledToBottom_like"></div>
        </div>
        <div style="margin-top: 30px"  v-if="activity == 'sub'">
            <div id="div_load_sub" style="margin-top: 25px; height: 30px" class="vld-parent">
                <loading :active.sync="isLoadingSub"
                :is-full-page="false"
                :heigh="30"
                :width="30"
                color="#40ff40"
                :opacity="0"
                ></loading>
            </div>
            <div v-for="sub in subs">
                <div style="display: flex; margin-bottom: 20px">
                    <a class="sub_link" v-on:click.middle.stop="go_page(sub.subscriber__username, true)" v-on:click.stop="go_page(sub.subscriber__username, false)">
                    <img v-if="sub.subscriber__id != null" class="img_p" :src="$hostname+'/media/profile/'+sub.subscriber__id+'/'+sub.subscriber__id+'.png'"></a>
                    <div class="flex_2">
                        <a class="sub_link" v-on:click.middle.stop="go_page(sub.subscriber__username, true)" v-on:click.stop="go_page(sub.subscriber__username, false)">{{sub.subscriber__username | truncate(14, '...')}}</a>
                        <span v-if="sub.positive == true" class="level_publ_style_true" style="margin: 0px 10px 0px 5px">{{sub.level}}</span>
                        <span v-if="sub.positive == false" class="level_publ_style_false" style="margin: 0px 10px 0px 5px">{{sub.level}}</span>
                        подписался(ась) на вас {{sub.datetime}}
                    </div>
                </div>
            </div>
            <div style="display: none" id="no_sub_men">
                <p style="margin-top: 70px" class="text_style_2">У вас пока нет подписчиков</p>
            </div>
            <div v-observe-visibility="handleScrolledToBottom_sub"></div>
        </div>
        <div v-if="activity == 'men'">
            <Mention
            :username="username">
            </Mention>
        </div>
    </div>
</template>

<script>

import axios from "axios";
import {autoLink} from "vue-highlights";
import moment from "moment";

export default {
    name: "Notification",

    data() {
        return {
            access_token: localStorage.getItem('access') || null,
            url: window.location + '',
            likes_datetime: null,
            sub_datetime: null,
            stop_get_like: 15,
            stop_get_sub: 15,
            likes: [],
            subs: [],
            activity: 'like',
            count_like: 0,
            count_sub: 0,
            count_men: 0,
            isLoadingLike: false,
            isLoadingSub: false,
        }
    },
    props: {
        username: Object,
        type_men: String,
    },

    methods: {

        get_men() {
            var url_page = '/activity/mention';
            this.$router.push(url_page).catch(()=>{});
            this.activity = 'men'
        },

        go_publ(id, middle){
            var url_publ = '/'+ this.username.username + '/status/' + id;
            if (middle == false){
                this.$router.push(url_publ).catch(()=>{});
            }
            if (middle == true){
                document.body.onmousedown = function(e) {
                    if(e.button == 1) {
                        e.preventDefault();
                        return false;
                    }
                }
                let routeData = this.$router.resolve(url_publ);
                window.open(routeData.href, '_blank');
            }
        },

        go_page(username, middle){
            var url_page = '/' + username;
            if (middle == false){
                this.$router.push(url_page).catch(()=>{});
            }
            if (middle == true){
                document.body.onmousedown = function(e) {
                    if(e.button == 1) {
                        e.preventDefault();
                        return false;
                    }
                }
                let routeData = this.$router.resolve(url_page);
                window.open(routeData.href, '_blank');
            }
         },

        handleScrolledToBottom_like(isVisible){
            if (!isVisible)  { return }
            if (this.likes.length == 0) { return }
            if (this.likes_datetime == null) { return }
            this.get_like()
        },

        handleScrolledToBottom_sub(isVisible){
            if (!isVisible)  { return }
            if (this.subs.length == 0) { return }
            if (this.sub_datetime == null) { return }
            this.get_sub()
        },

        get_sub(){
           var url_page = '/activity/sub';
           this.$router.push(url_page).catch(()=>{});
           this.activity = 'sub'
            axios.post(this.$hostname + '/api/home/activity/get_sub/', {
                sub_datetime: this.sub_datetime,
              },
          {
                headers: {
                    'Authorization': 'Bearer ' + this.access_token,
                }
            })
              .then(res => {
                  if (res.data != false){
                      this.stop_get_sub = res.data.length
                      this.sub_datetime = res.data[res.data.length-1].datetime
                      for (var i = 0; i < res.data.length; i++){
                            res.data[i].datetime = moment(res.data[i].datetime).format('DD.MM.YY')
                      }
                      this.subs.push(...res.data);
                      this.isLoadingSub = false
                      document.getElementById("div_load_sub").style.display = "none"

                  }
              });
        },

        get_like(){
            var url_page = '/activity/like';
            this.$router.push(url_page).catch(()=>{});
            this.activity = 'like'
            axios.post(this.$hostname + '/api/home/activity/get_like/', {
                likes_datetime: this.likes_datetime,
              },
          {
                headers: {
                    'Authorization': 'Bearer ' + this.access_token,
                }
            })
              .then(res => {
                  if (res.data != false){
                      this.stop_get_like = res.data.length
                      this.likes_datetime = res.data[res.data.length-1].datetime
                      for (var i = 0; i < res.data.length; i++){
                            res.data[i].datetime = moment(res.data[i].datetime).format('DD.MM.YY')
                      }
                      this.likes.push(...res.data);
                      this.isLoadingLike = false
                      document.getElementById("div_load_like").style.display = "none"
                  }
              });

        },

        get_count(){
           this.count_like = this.$store.getters.getLike
           this.count_sub = this.$store.getters.getSub
           this.count_men = this.$store.getters.getMention
           this.$store.dispatch('fetchCount',0)
           this.$store.dispatch('fetchLike',0)
           this.$store.dispatch('fetchSub',0)
           this.$store.dispatch('fetchMention',0)
        },

        last_visit(){
            axios.post(this.$hostname + '/api/mainpage/user_profile/last_visit/', {
              },
          {
                headers: {
                    'Authorization': 'Bearer ' + this.access_token,
                }
            })
              .then(res => {
              });
          },

        no_load_like(){
            if (this.likes.length == 0){
                document.getElementById("no_like_men").style.display = "block"
                document.getElementById("div_load_like").style.display = "none"
                this.isLoadingLike = false
            }
        },

        no_load_sub(){
            if (this.subs.length == 0){
                document.getElementById("no_sub_men").style.display = "block"
                document.getElementById("div_load_sub").style.display = "none"
                this.isLoadingSub = false
            }
        },

    },
    created() {
        document.title = 'Активность'
        let arr = new Array();
        const encoded = decodeURI(this.url);
        arr = encoded.split('/')
        if (arr[arr.length-1] != 'activity'){
            this.url = arr[arr.length-1]
            if (this.url == 'like'){
                this.isLoadingLike = true
                this.get_like()
                setTimeout( this.no_load_like, 800);
            }
            if (this.url == 'sub'){
                this.isLoadingSub = true
                this.get_sub()
                setTimeout( this.no_load_sub, 800);
            }
            if (this.url == 'mention'){
                this.get_men()
            }
            this.get_count()
            this.last_visit()
        }
        else{
            var url_page = '/activity/like';
            this.$router.push(url_page).catch(()=>{});
        }

    },
    filters: {
        number: function(num) {
            if (String(num).length < 5) {
                return Math.floor(num);
            }
            if (String(num).length < 7 && String(num).length > 4) {
                return Math.floor(num/1000) + 'т';
            }
            if (String(num).length < 9 && String(num).length > 6) {
                return Math.floor(num/1000000) + 'м';
            }
        }
    }
}
</script>

<style scoped>

    .menu_activity{
        margin-top: 10px;
        display: flex;
        /*justify-content: space-evenly;*/
        height: 100%;
    }

    .component_style{
        cursor: pointer;
        height: 35px;
        width: 160px;
        background: #111111; /* Цвет фона */
        border-radius: 30px;
    }


    .component_style:hover {
        color: #40ff40;
    }

    .text{
        text-align:center;
        font-family: 'Open Sans', sans-serif;
        font-size: 17px; /* Размер текста */
        font-weight: lighter; /* Светлое начертание */
        cursor: pointer;
        padding: 5px 0px 5px 0px;
    }

    .flex_2{
        margin: 10px 0px 0px 10px;
        display: flex;
    }

</style>