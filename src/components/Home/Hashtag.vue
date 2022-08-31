<template>
    <div>
        <div v-if="hashtag_exact == null" style="margin-top: 10px">
            <div v-for="hash in hashtag">
                <div style="margin-right: 100px; margin-left: 100px">
                    <div style="display: flex; margin-bottom: 5px" v-on:click.middle="hashtag_exact_f(hash.hashtag,true)" v-on:click="hashtag_exact_f(hash.hashtag,false)" class="border_tag_page">
                        <span class="text_tag_page">{{hash.hashtag | truncate(24, '...')}}</span>
                        <div style="flex-grow: 1;"></div>
                        <span class="text_count_page">{{hash.count | number }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="hashtag_exact != null">
            <div id="div_load_hashtag" style="margin-top: 25px; height: 30px" class="vld-parent">
                <loading :active.sync="isLoadingHashtag"
                :is-full-page="false"
                :heigh="30"
                :width="30"
                color="#40ff40"
                :opacity="0"
                ></loading>
            </div>
            <div v-for="(mess,index) in hashtag_once">
                <div style="margin-bottom: 10px" class="border_st public_status"  v-on:click.middle="status(mess.username__username, mess.id, true)" v-on:click="status(mess.username__username, mess.id, false)">
                    <div class="space-edit">
                        <div style="display: flex">
                            <a class="sub_link" v-on:click.middle.stop="go_page(mess.username__username, true)" v-on:click.stop="go_page(mess.username__username, false)">
                                <img v-if="mess.username != null" class="img_p" :src="$hostname+'/media/profile/'+mess.username+'/'+mess.username+'.png'"></a>
                            <div class="username_p">
                                <a class="sub_link" v-on:click.middle.stop="go_page(mess.username__username, true)" v-on:click.stop="go_page(mess.username__username, false)">{{mess.username__username}}</a>
                                <span v-if="mess.positive_user == true" class="level_publ_style_true" style="margin-left: 10px">{{mess.level_user}}</span>
                                <span v-if="mess.positive_user == false" class="level_publ_style_false" style="margin-left: 10px">{{mess.level_user}}</span>
                                <span> · {{mess.datetime}}</span>
                            </div>
                        </div>
                        <div class="username_p" v-if="mess.edit==true">
                            <span class="edit_style">изменено</span>
                        </div>
                    </div>
                    <div v-if="mess.images.length!=0">
                        <div class="mt-10 mb-10" v-on:click.stop="">
                            <lightbox css="h-lg-400" :items="mess.images" :cells="3"></lightbox>
                        </div>
                    </div>
                    <div style="margin-top: 10px" class="just-line-break">
                        <div v-html="mess.message"></div>
                    </div>

                    <div class="flex_like_space">
                        <div style="width: 25px; margin-left: 5px">
                            <p v-if="mess.positive == true"><span class="level_publ_style_true">{{mess.level}}</span></p>
                            <p v-if="mess.positive == false"><span class="level_publ_style_false">{{mess.level}}</span></p>
                        </div>
                        <div v-on:click.stop.prevent="like(mess.id,index)" class="like_mainpage" style="margin-left: 25px">
                            <div v-if="mess.sum_like > 0" style="padding-right: 5px">{{ mess.sum_like | number }}</div>
                            <img v-if="mess.check_like == true" style="margin-top: 1px" width="18" height="18" :src="$hostname+'/media/like_done.svg'">
                            <img v-if="mess.check_like == null" style="margin-top: 1px" width="18" height="18" :src="$hostname+'/media/like.svg'">
                        </div>
                        <div v-on:click.stop.prevent="dislike(mess.id,index)" class="dislike_mainpage" style="margin-left: 35px">
                            <div v-if="mess.sum_dislike > 0" style="padding-right: 5px">{{ mess.sum_dislike | number }}</div>
                            <img v-if="mess.check_dislike == true" style="margin-top: 1px" width="18" height="18" :src="$hostname+'/media/dislike_done.svg'">
                            <img v-if="mess.check_dislike == null" style="margin-top: 1px" width="18" height="18" :src="$hostname+'/media/dislike.svg'">
                        </div>
                        <div style="display: flex; margin-left: 35px">
                            <div style="padding-right: 5px">{{ mess.comments | number }}</div>
                            <img style="margin-top: 1px" width="18" height="18" :src="$hostname+'/media/comment.svg'">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-observe-visibility="handleScrolledToBottom"></div>
        <div style="height: 5px"></div>
    </div>

</template>

<script>

import axios from "axios";
import {autoLink} from "vue-highlights";
import moment from "moment";

export default {
    name: "HashTag",
    components: {

    },
    data() {
        return {
            access_token: localStorage.getItem('access') || null,
            hashtag: [],
            hashtag_once: [],
            hashtag_exact: null,
            last_datetime: null,
            stop_get_subs: 10,
            access: false,
            rating_result:{
                like: null,
                dislike: null,
                level_p: null,
                positive_p: null,
                level_user: null,
                positive_user: null,
            },
            isLoadingHashtag: false
        }
    },
    props: {
        username: Object,
    },
    methods: {

        view_update_rating(index){
            for (var i = 0; i < this.hashtag_once.length; i++){
                if (this.hashtag_once[i].username__username == this.rating_result.username){
                    this.hashtag_once[i].level_user = this.rating_result.level_user
                    this.hashtag_once[i].positive_user = this.rating_result.positive_user
                }
            }
            this.hashtag_once[index].level = this.rating_result.level_p
            this.hashtag_once[index].positive = this.rating_result.positive_p
            if (this.rating_result.like == true){
                this.hashtag_once[index].check_like = true
                this.hashtag_once[index].sum_like = this.hashtag_once[index].sum_like + 1
            }
            if (this.rating_result.like == false){
                this.hashtag_once[index].check_like = null
                this.hashtag_once[index].sum_like = this.hashtag_once[index].sum_like - 1
            }
            if (this.rating_result.dislike == true){
                this.hashtag_once[index].check_dislike = true
                this.hashtag_once[index].sum_dislike = this.hashtag_once[index].sum_dislike + 1
            }
            if (this.rating_result.dislike == false){
                this.hashtag_once[index].check_dislike = null
                this.hashtag_once[index].sum_dislike = this.hashtag_once[index].sum_dislike - 1
            }
        },

        like(id, index){
            if (this.username.username != this.hashtag_once[index].username__username){
                axios.post(this.$hostname + '/api/mainpage/rating/like/', {
                    id: id
                  },
              {
                    headers: {
                        'Authorization': 'Bearer ' + this.access_token,
                    }
                })
                  .then(res => {
                      this.rating_result = res.data;
                      this.view_update_rating(index)
                  })
            }
        },

        dislike(id, index){
            if (this.username.username != this.hashtag_once[index].username__username){
                axios.post(this.$hostname + '/api/mainpage/rating/dislike/', {
                    id: id
                  },
              {
                    headers: {
                        'Authorization': 'Bearer ' + this.access_token,
                    }
                })
                  .then(res => {
                    this.rating_result = res.data;
                    this.view_update_rating(index)
                  })
            }
        },

        go_page(username,middle){
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

        status(username, id, middle){
            var url_page = '/' + username + '/status/' + id;
            if (middle == false){
                this.$router.push(url_page);
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

        handleScrolledToBottom(isVisible){
            if (!isVisible)  { return }
            if (this.hashtag_once == null) { return }
            if (this.last_datetime == null) { return }
            this.get_data_from_tag()
        },

        get_data_from_tag(){
            if (this.stop_get_subs != 0){
                axios.post(this.$hostname + '/api/home/hashtag/get_data_from_tag/', {
                    hashtag: this.hashtag_exact,
                    datetime_request: this.last_datetime,
                  },
              {
                    headers: {
                        'Authorization': 'Bearer ' + this.access_token,
                    }
                })
                  .then(res => {
                      this.stop_get_subs = res.data.length
                      if (res.data != false){
                          this.last_datetime = res.data[res.data.length-1].datetime
                          for (var i = 0; i < res.data.length; i++){
                                res.data[i].message = autoLink(res.data[i].message)
                                res.data[i].datetime = moment(res.data[i].datetime).format('DD MMMM')
                          }
                          this.hashtag_once.push(...res.data);
                          document.getElementById("div_load_hashtag").style.display = "none"
                          this.isLoadingHashtag = false
                      }
                  })
            }
        },

        hashtag_exact_f(tag,middle){
            var url_page = '/hashtag/' + tag;
            if (middle == false){
                this.$router.push(url_page);
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

        get_hashtag(){
            axios.post(this.$hostname + '/api/home/hashtag/get_hashtag_all/', {

              },
          {
                headers: {
                    'Authorization': 'Bearer ' + this.access_token,
                }
            })
              .then(res => {
                  this.hashtag = res.data;
              })
        },

        check_hashtag_url(){
          var currentLocation = window.location + '';
          const encoded = decodeURI(currentLocation);
          let arr = new Array();
          arr = encoded.split('/')
          if (arr.length > 4){
            this.hashtag_exact = arr[arr.length-1]
          }
        },

    },
    created() {
        this.check_hashtag_url()
        if (this.hashtag_exact != null){
            document.title = '#' + this.hashtag_exact
            this.isLoadingHashtag = true
            this.get_data_from_tag()
        }
        else {
            document.title = 'Хэштеги'
            this.get_hashtag()
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

.border_tag_page{
    cursor: pointer;
}



</style>