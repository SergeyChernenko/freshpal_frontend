
<template>
    <div v-if="username != null">
        <div v-if="access==true">

                <Textarea
                    @message="SavePubl"
                    :description="description"
                    :username_id="username.id"
                    :edit="false"
                    :limit="2000"
                />
            <hr>
        </div>
        <div id="div_load_m" style="margin-top: 25px; height: 30px" class="vld-parent">
            <loading :active.sync="isLoading"
            :is-full-page="false"
            :heigh="30"
            :width="30"
            color="#40ff40"
            :opacity="0"
            ></loading>
        </div>
        <div id="div_load_publ" style="display: none">
            <div style="margin-top: 25px; height: 30px" class="vld-parent">
                <loading :active.sync="isLoadingPubl"
                :is-full-page="false"
                :heigh="30"
                :width="30"
                color="#40ff40"
                :opacity="0"
                ></loading>
            </div>
            <p style="margin-top: 20px" class="text_style_2">Подождите, пожалуйста! Идет загрузка публикации.</p>
        </div>

        <div v-for="(mess,index) in all_data">
            <div style="margin-bottom: 10px" class="border_st public_status" v-on:click="status(mess.id, false)" v-on:click.middle="status(mess.id,true)">
                <div class="space-edit">
                    <div style="display: flex">
                        <a class="sub_link"><img v-if="username.username_id != null" class="img_p" :src="$hostname+'/media/profile/'+username_url_id+'/'+username_url_id+'.png'"></a>
                        <div class="username_p">
                            <a>{{username_url}}</a> · {{mess.datetime}}
                        </div>
                    </div>
                    <div class="username_p" v-if="mess.edit==true">
                        <span class="edit_style">изменено</span>
                    </div>
                </div>
                <div v-if="mess.images.length!=0">
                    <div class="mt-10 mb-10" v-on:click.stop.prevent="">
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
                    <div style="display: flex; margin-left: 35px;">
                        <div v-if="mess.comments != null" style="padding-right: 5px">{{ mess.comments | number }}</div>
                        <img style="margin-top: 1px" width="18" height="18" :src="$hostname+'/media/comment.svg'">
                    </div>
                </div>

            </div>
        </div>
        <div id="div_load" style="display: none" v-if="all_data.length == 0">
            <p style="margin-top: 70px" class="text_style_2">Нет публикации</p>
        </div>

        <div v-observe-visibility="handleScrolledToBottom"></div>
        <div style="height: 5px"></div>
    </div>

</template>

<script>

    import Vue from 'vue'
    import TextareaAutosize from 'vue-textarea-autosize'
    import axios from "axios";
    import moment from "moment";
    import VueObserveVisibility from "vue-observe-visibility";
    import '@morioh/v-lightbox/dist/lightbox.css';
    import Lightbox from '@morioh/v-lightbox'
    import { autoLink } from 'vue-highlights'
    import 'vue-loading-overlay/dist/vue-loading.css';


    Vue.use(Lightbox);
    Vue.use(TextareaAutosize)
    Vue.use(VueObserveVisibility)


    export default {
        name: "Publications",



    data(){
      return{
        access_token: localStorage.getItem('access') || null,
        username_url: this.$route.params.username,
        access: false,
        all_data: [],
        last_datetime: null,
        stop_get_pudl: 10,
        description: 'Что у вас нового?',
        rating_result:{
            like: null,
            dislike: null,
            level_p: null,
            positive_p: null,
            level_user: null,
            positive_user: null,
        },
        isLoading: false,
        isLoadingPubl: false,
      }
    },
    props: {
      username: Object,
      username_url_id: Number,
    },
    methods: {

        plus_publ(){
            this.$emit('plus_publ', 1);
        },

        view_update_rating(index){
            this.$emit('update_rating', this.rating_result.level_user, this.rating_result.positive_user);
            this.all_data[index].level = this.rating_result.level_p
            this.all_data[index].positive = this.rating_result.positive_p
            if (this.rating_result.like == true){
                this.all_data[index].check_like = true
                this.all_data[index].sum_like = this.all_data[index].sum_like + 1
            }
            if (this.rating_result.like == false){
                this.all_data[index].check_like = null
                this.all_data[index].sum_like = this.all_data[index].sum_like - 1
            }
            if (this.rating_result.dislike == true){
                this.all_data[index].check_dislike = true
                this.all_data[index].sum_dislike = this.all_data[index].sum_dislike + 1
            }
            if (this.rating_result.dislike == false){
                this.all_data[index].check_dislike = null
                this.all_data[index].sum_dislike = this.all_data[index].sum_dislike - 1
            }
        },

        like(id, index){
            if (this.username.username != this.username_url){
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
            if (this.username.username != this.username_url){
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

        handleScrolledToBottom(isVisible){
            if (!isVisible)  { return }
            if (this.all_data == null) { return }
            if (this.last_datetime == null) { return }
            this.get_publ()
        },

        go_page(){
                var url_page = '/' + this.username_url;
                this.$router.push(url_page).catch(()=>{});;

        },

        status(id, middle){
            var url_page = '/' + this.username_url + '/status/' + id;
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

        load_publ(){
            if (this.all_data.length == 0){
                document.getElementById("div_load").style.display = "block"
                document.getElementById("div_load_m").style.display = "none"
                this.isLoading = false
            }
        },

        get_publ(){
            if (this.stop_get_pudl != 0){
                axios.post(this.$hostname + '/api/mainpage/publ/get_publ/', {
                    username: this.username_url,
                    datetime_request: this.last_datetime
                  },
              {
                    headers: {
                        'Authorization': 'Bearer ' + this.access_token,
                    }
                })
                  .then(res => {
                      this.stop_get_pudl = res.data.length
                      if (res.data != false){
                          this.last_datetime = res.data[res.data.length-1].datetime
                          for (var i = 0; i < res.data.length; i++){
                                res.data[i].message = autoLink(res.data[i].message)
                                res.data[i].datetime = moment(res.data[i].datetime).format('DD MMMM YY')
                          }
                          this.all_data.push(...res.data);
                          document.getElementById("div_load_m").style.display = "none"
                          this.isLoading = false
                      }

                  })
            }
        },

        SavePubl(message,images){
            if (message != '' || images.length != 0){
                this.isLoadingPubl = true
                document.getElementById("div_load_publ").style.display = "block"
                this.stop_get_pudl = 10
                this.last_datetime = null
                this.all_data = []
                axios.post(this.$hostname + '/api/mainpage/publ/save_publ/', {
                    message: message,
                    images: images,
                  },
              {
                    headers: {
                        'Authorization': 'Bearer ' + this.access_token,
                    }
                })
                  .then(res => {
                      this.isLoadingPubl = false
                      document.getElementById("div_load_publ").style.display = "none"
                      this.get_publ()
                      this.plus_publ()

                  })

            }
        },

        back_home(){
                var url_page = '/' + this.username_url;
                this.$router.push(url_page).catch(()=>{});
        },

        timeout(){
        if ( this.username != null ) {
            if (this.username.username == this.username_url){
              this.access = true;
          }
        } else {
            setTimeout( this.timeout, 100);
        }
    },

    },
    created() {
        this.timeout()
        this.isLoading = true
        this.get_publ()
        setTimeout( this.load_publ, 800);

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

<style lang="scss">




</style>