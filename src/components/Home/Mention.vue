<template>
    <div>
        <hr>
        <div style="margin-bottom: 30px" class="menu_activity">
            <div class="component_style" v-on:click="get_publ">
                <p v-if="activity == 'publ'" style="color: #36d436;" class="text">Публикации</p>
                <p v-if="activity != 'publ'" class="text">Публикации</p>
            </div>
            <div style="margin-left: 10px" class="component_style" v-on:click="get_comment">
                <p v-if="activity == 'comment'" style="color: #36d436;" class="text">Комментарии</p>
                <p v-if="activity != 'comment'" class="text">Комментарии</p>
            </div>
        </div>
        <div v-if="activity == 'publ'">
            <div v-for="(mess,index) in mention_publ">
                <div style="margin-bottom: 10px" class="border_st public_status" v-on:click.middle="status(mess.publ_username, mess.publ_id, true)" v-on:click="status(mess.publ_username, mess.publ_id, false)">
                    <div class="space-edit">
                        <div style="display: flex">
                            <a class="sub_link" v-on:click.middle.stop="go_page(mess.publ_username, true)" v-on:click.stop="go_page(mess.publ_username, false)">
                                <img v-if="mess.publ_user_id != null" class="img_p" :src="$hostname+'/media/profile/'+mess.publ_user_id+'/'+mess.publ_user_id+'.png'"></a>
                            <div class="username_p">
                                <a class="sub_link" v-on:click.middle.stop="go_page(mess.publ_username, true)" v-on:click.stop="go_page(mess.publ_username, false)">{{mess.publ_username}}</a>
                                <span v-if="mess.positive_user == true" class="level_publ_style_true" style="margin-left: 10px">{{mess.level_user}}</span>
                                <span v-if="mess.positive_user == false" class="level_publ_style_false" style="margin-left: 10px">{{mess.level_user}}</span>
                                <span> · {{mess.publ_datetime}}</span>
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
                        <div v-on:click.stop.prevent="like_publ(mess.publ_id,index)" class="like_mainpage" style="margin-left: 25px">
                            <div v-if="mess.sum_like > 0" style="padding-right: 5px">{{ mess.sum_like | number }}</div>
                            <img v-if="mess.check_like == true" style="margin-top: 1px" width="18" height="18" :src="$hostname+'/media/like_done.svg'">
                            <img v-if="mess.check_like == null" style="margin-top: 1px" width="18" height="18" :src="$hostname+'/media/like.svg'">
                        </div>
                        <div v-on:click.stop.prevent="dislike_publ(mess.publ_id,index)" class="dislike_mainpage" style="margin-left: 35px">
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
            <div v-observe-visibility="handleScrolledPubl"></div>
            <div style="height: 5px"></div>
        </div>

        <div v-if="activity == 'comment'">
            <div v-for="(mess,index) in mention_comment">
                <div style="margin-bottom: 10px" class="border_st public_status" v-on:click.middle="status(mess.publ_username, mess.publ_id, true)" v-on:click="status(mess.publ_username, mess.publ_id, false)">
                    <div class="space-edit">
                        <div style="display: flex">
                            <a class="sub_link" v-on:click.middle.stop="go_page(mess.publ_username, true)" v-on:click.stop="go_page(mess.publ_username, false)">
                                <img v-if="mess.publ_user_id != null" class="img_p" :src="$hostname+'/media/profile/'+mess.publ_user_id+'/'+mess.publ_user_id+'.png'"></a>
                            <div class="username_p">
                                <a class="sub_link" v-on:click.middle.stop="go_page(mess.publ_username, true)" v-on:click.stop="go_page(mess.publ_username, false)">{{mess.publ_username}}</a>
                                <span v-if="mess.positive_user == true" class="level_publ_style_true" style="margin-left: 10px">{{mess.level_user}}</span>
                                <span v-if="mess.positive_user == false" class="level_publ_style_false" style="margin-left: 10px">{{mess.level_user}}</span>
                                <span> · {{mess.publ_datetime}}</span>
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
                        <div v-on:click.stop.prevent="like_comment(mess.publ_id,index)" class="like_mainpage" style="margin-left: 25px">
                            <div v-if="mess.sum_like > 0" style="padding-right: 5px">{{ mess.sum_like | number }}</div>
                            <img v-if="mess.check_like == true" style="margin-top: 1px" width="18" height="18" :src="$hostname+'/media/like_done.svg'">
                            <img v-if="mess.check_like == null" style="margin-top: 1px" width="18" height="18" :src="$hostname+'/media/like.svg'">
                        </div>
                        <div v-on:click.stop.prevent="dislike_coment(mess.publ_id,index)" class="dislike_mainpage" style="margin-left: 35px">
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
            <div v-observe-visibility="handleScrolledComment"></div>
            <div style="height: 5px"></div>
        </div>
    </div>
</template>

<script>

import axios from "axios";
import moment from "moment";
import {autoLink} from "vue-highlights";

export default {
    name: "Mention",
    components: {

    },
    data() {
        return {
            access_token: localStorage.getItem('access') || null,
            mention_publ: [],
            mention_comment: [],
            stop_get_publ: 15,
            stop_get_comment: 15,
            datetime_publ: null,
            datetime_comment: null,
            activity: '',
            rating_result_publ:{
                like: null,
                dislike: null,
                level_p: null,
                positive_p: null,
                level_user: null,
                positive_user: null,
            },
            rating_result_comment:{
                like: null,
                dislike: null,
                level_p: null,
                positive_p: null,
                level_user: null,
                positive_user: null,
            },
        }
    },
    props: {
        username: Object,
    },
    methods: {

        view_update_rating_comment(index){
            for (var i = 0; i < this.mention_comment.length; i++){
                if (this.mention_comment[i].publ_username == this.rating_result_comment.username){
                    this.mention_comment[i].level_user = this.rating_result_comment.level_user
                    this.mention_comment[i].positive_user = this.rating_result_comment.positive_user
                }
            }
            this.mention_comment[index].level = this.rating_result_comment.level_p
            this.mention_comment[index].positive = this.rating_result_comment.positive_p
            if (this.rating_result_comment.like == true){
                this.mention_comment[index].check_like = true
                this.mention_comment[index].sum_like = this.mention_comment[index].sum_like + 1
            }
            if (this.rating_result_comment.like == false){
                this.mention_comment[index].check_like = null
                this.mention_comment[index].sum_like = this.mention_comment[index].sum_like - 1
            }
            if (this.rating_result_comment.dislike == true){
                this.mention_comment[index].check_dislike = true
                this.mention_comment[index].sum_dislike = this.mention_comment[index].sum_dislike + 1
            }
            if (this.rating_result_comment.dislike == false){
                this.mention_comment[index].check_dislike = null
                this.mention_comment[index].sum_dislike = this.mention_comment[index].sum_dislike - 1
            }
        },

        like_comment(id, index){
            axios.post(this.$hostname + '/api/mainpage/rating/like/', {
                id: id
              },
          {
                headers: {
                    'Authorization': 'Bearer ' + this.access_token,
                }
            })
              .then(res => {
                  this.rating_result_comment = res.data;
                  this.view_update_rating_comment(index)
              })
        },

        dislike_coment(id, index){
            axios.post(this.$hostname + '/api/mainpage/rating/dislike/', {
                id: id
              },
          {
                headers: {
                    'Authorization': 'Bearer ' + this.access_token,
                }
            })
              .then(res => {
                this.rating_result_comment = res.data;
                this.view_update_rating_comment(index)
              })
        },

        view_update_rating_publ(index){
            for (var i = 0; i < this.mention_publ.length; i++){
                if (this.mention_publ[i].publ_username == this.rating_result_publ.username){
                    this.mention_publ[i].level_user = this.rating_result_publ.level_user
                    this.mention_publ[i].positive_user = this.rating_result_publ.positive_user
                }
            }
            this.mention_publ[index].level = this.rating_result_publ.level_p
            this.mention_publ[index].positive = this.rating_result_publ.positive_p
            if (this.rating_result_publ.like == true){
                this.mention_publ[index].check_like = true
                this.mention_publ[index].sum_like = this.mention_publ[index].sum_like + 1
            }
            if (this.rating_result_publ.like == false){
                this.mention_publ[index].check_like = null
                this.mention_publ[index].sum_like = this.mention_publ[index].sum_like - 1
            }
            if (this.rating_result_publ.dislike == true){
                this.mention_publ[index].check_dislike = true
                this.mention_publ[index].sum_dislike = this.mention_publ[index].sum_dislike + 1
            }
            if (this.rating_result_publ.dislike == false){
                this.mention_publ[index].check_dislike = null
                this.mention_publ[index].sum_dislike = this.mention_publ[index].sum_dislike - 1
            }
        },

        like_publ(id, index){
            axios.post(this.$hostname + '/api/mainpage/rating/like/', {
                id: id
              },
          {
                headers: {
                    'Authorization': 'Bearer ' + this.access_token,
                }
            })
              .then(res => {
                  this.rating_result_publ = res.data;
                  this.view_update_rating_publ(index)
              })
        },

        dislike_publ(id, index){
            axios.post(this.$hostname + '/api/mainpage/rating/dislike/', {
                id: id
              },
          {
                headers: {
                    'Authorization': 'Bearer ' + this.access_token,
                }
            })
              .then(res => {
                this.rating_result_publ = res.data;
                this.view_update_rating_publ(index)
              })
        },

        handleScrolledPubl(isVisible){
            if (!isVisible)  { return }
            if (this.mention_publ == null) { return }
            if (this.datetime_publ == null) { return }
            this.get_publ()
        },

        handleScrolledComment(isVisible){
            if (!isVisible)  { return }
            if (this.mention_comment == null) { return }
            if (this.datetime_comment == null) { return }
            this.get_comment()
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

        get_publ(){
            this.activity = 'publ'
            this.mention_comment = []
            this.stop_get_comment = 15
            this.datetime_comment = null
            if (this.stop_get_publ != 0){
                axios.post(this.$hostname + '/api/home/activity/get_mention/', {
                    men_datetime: this.datetime_publ,
                    comment: false
                  },
              {
                    headers: {
                        'Authorization': 'Bearer ' + this.access_token,
                    }
                })
                  .then(res => {
                      this.stop_get_publ = res.data.length
                      if (res.data != false){
                          this.datetime_publ = res.data[res.data.length-1].datetime
                          for (var i = 0; i < res.data.length; i++){
                            res.data[i].message = autoLink(res.data[i].message)
                            res.data[i].publ_datetime = moment(res.data[i].publ_datetime).format('DD.MM.YY')
                          }
                          this.mention_publ.push(...res.data);
                      }
                  });
            }
        },

        get_comment(){
            this.activity = 'comment'
            this.mention_publ = []
            this.stop_get_publ = 15
            this.datetime_publ = null
            if (this.stop_get_comment != 0){
                axios.post(this.$hostname + '/api/home/activity/get_mention/', {
                    men_datetime: this.datetime_comment,
                    comment: true
                  },
              {
                    headers: {
                        'Authorization': 'Bearer ' + this.access_token,
                    }
                })
                  .then(res => {
                      this.stop_get_comment = res.data.length
                      if (res.data != false){
                          this.datetime_comment = res.data[res.data.length-1].datetime
                          for (var i = 0; i < res.data.length; i++){
                            res.data[i].message = autoLink(res.data[i].message)
                            res.data[i].publ_datetime = moment(res.data[i].publ_datetime).format('DD.MM.YY')
                          }
                          this.mention_comment.push(...res.data);
                      }
                  });
            }
        }


    },
    created() {
        this.get_publ()

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

</style>