<template>
    <div>
        <div id="div_load_s" style="margin-top: 25px; height: 30px" class="vld-parent">
            <loading :active.sync="isLoading"
            :is-full-page="false"
            :heigh="30"
            :width="30"
            color="#40ff40"
            :opacity="0"
            ></loading>
        </div>

        <div v-if="all_subs.length > 0">
            <div v-for="(mess,index) in all_subs">
                <div style="margin-bottom: 10px" class="border_st public_status" v-on:click.middle="status(mess.username__username, mess.id, true)" v-on:click="status(mess.username__username, mess.id, false)">
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
                    <div style="margin-top: 10px; max-width: 510px" class="text_publ">
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
                            <div v-if="mess.comments != null" style="padding-right: 5px">{{ mess.comments | number }}</div>
                            <img style="margin-top: 1px" width="18" height="18" :src="$hostname+'/media/comment.svg'">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div style="display: none;" id="no_subs">
            <p style="margin-top: 100px" class="text_style_2">Нет подписок</p>
        </div>
        <div v-observe-visibility="handleScrolledToBottom"></div>
        <div style="height: 5px"></div>
    </div>
</template>

<script>

    import axios from "axios";
    import moment from "moment";
    import VueObserveVisibility from "vue-observe-visibility";
    import Vue from "vue";
    import { autoLink } from 'vue-highlights'

    Vue.use(VueObserveVisibility)

    export default {
        name: "Subscriptions",
        components: {

        },
        data() {
            return {
                access_token: localStorage.getItem('access') || null,
                new_mess: null,
                stop_get_subs: 10,
                last_datetime: null,
                all_subs: [],
                rating_result:{
                    like: null,
                    dislike: null,
                    level_p: null,
                    positive_p: null,
                    level_user: null,
                    positive_user: null,
                },
                isLoading: false
            }
        },
        props: {
          username: Object,
        },
        methods: {

            handleScrolledToBottom(isVisible){
                if (!isVisible)  { return }
                if (this.all_subs == null) { return }
                if (this.last_datetime == null) { return }
                this.get_subs()
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

            view_update_rating(index){
                for (var i = 0; i < this.all_subs.length; i++){
                    if (this.all_subs[i].username__username == this.rating_result.username){
                        this.all_subs[i].level_user = this.rating_result.level_user
                        this.all_subs[i].positive_user = this.rating_result.positive_user
                    }
                }
                this.all_subs[index].level = this.rating_result.level_p
                this.all_subs[index].positive = this.rating_result.positive_p
                if (this.rating_result.like == true){
                    this.all_subs[index].check_like = true
                    this.all_subs[index].sum_like = this.all_subs[index].sum_like + 1
                }
                if (this.rating_result.like == false){
                    this.all_subs[index].check_like = null
                    this.all_subs[index].sum_like = this.all_subs[index].sum_like - 1
                }
                if (this.rating_result.dislike == true){
                    this.all_subs[index].check_dislike = true
                    this.all_subs[index].sum_dislike = this.all_subs[index].sum_dislike + 1
                }
                if (this.rating_result.dislike == false){
                    this.all_subs[index].check_dislike = null
                    this.all_subs[index].sum_dislike = this.all_subs[index].sum_dislike - 1
                }
            },

            like(id, index){
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
            },

            dislike(id, index){
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

            load_sub(){
                if (this.all_subs.length == 0){
                    document.getElementById("no_subs").style.display = "block"
                    document.getElementById("div_load_s").style.display = "none"
                    this.isLoading = false
                }
            },

            get_subs(){
                if (this.stop_get_subs != 0){
                    axios.post(this.$hostname + '/api/home/home/get_subs/', {
                        username: this.username.username,
                        datetime_request: this.last_datetime
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
                              this.all_subs.push(...res.data);
                              document.getElementById("div_load_s").style.display = "none"
                              this.isLoading = false
                          }

                      })
                }
            },

        },
        created() {
            document.title = 'Новости'
            this.isLoading = true
            this.get_subs()
            setTimeout( this.load_sub, 800);
            //setTimeout(() => document.getElementById("no_subs").style.display = "block", 200);
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

</style>