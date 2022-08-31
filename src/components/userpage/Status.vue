<template>
    <div>
        <Header
        :username="username">
        </Header>
        <div class="background_main">
            <div class="center">
                <div style="height: 15px"></div>
                    <div style="display: flex;">
                        <div class="left_menu">
                            <LeftMenu
                            :username="username">
                            </LeftMenu>
                        </div>
                        <div class="home_style">
                            <div v-if="check_publ == true">
                                <div v-if="data_mess.parent_id != 0" style="margin-bottom: 10px;">
                                    <a class="a_style" v-on:click="back_home()">Назад</a>
                                </div>
                                <div v-if="edit==false" class="border_st">
                                    <div v-if="data_mess.remote == false">
                                        <div class="space-edit">
                                            <div style="display: flex">
                                                 <a class="sub_link" v-on:click.middle="go_page(data_mess.username, true)" v-on:click="go_page(data_mess.username, false)"><img v-if="data_mess.username_id != null" class="img_p" :src="$hostname+'/media/profile/'+data_mess.username_id+'/'+data_mess.username_id+'.png'"></a>
                                                <div class="username_p">
                                                    <a class="sub_link" v-on:click.middle="go_page(data_mess.username, true)" v-on:click="go_page(data_mess.username, false)">{{data_mess.username}}</a>
                                                    <span v-if="data_mess.positive_user == true" class="level_publ_style_true" style="margin-left: 10px">{{data_mess.level_user}}</span>
                                                    <span v-if="data_mess.positive_user == false" class="level_publ_style_false" style="margin-left: 10px">{{data_mess.level_user}}</span>
                                                </div>


                                            </div>
                                            <div v-if="data_mess.access==true" style="display: flex">
                                                <span v-on:click="show_edit_menu" class="select">&hellip;</span>
                                                      <div v-click-outside="onClickOutside" style="display: none;" id="div_id_edit" class="div_edit">
                                                          <div v-on:click="edit_publ" style="cursor: pointer; height: 40px" class="border_menu_header_1"><p style="color: #40ff40" class="text_menu_header">Редактировать</p></div>
                                                          <div v-on:click="show_modal_remove" style="cursor: pointer; height: 40px" class="border_menu_header_2"><p style="color: #f9185f" class="text_menu_header">Удалить</p></div>
                                                      </div>


                                            </div>

                                        </div>
                                        <div v-if="data_mess.images.length!=0">
                                            <div class="mt-20 mb-20">
                                                <lightbox css="h-lg-400" :items="data_mess.images" :cells="3"></lightbox>
                                            </div>
                                        </div>
                                        <div style="margin-top: 15px" class="just-line-break">
                                            <div v-html="data_mess.message"></div>
                                        </div>
                                        <div style="display: flex; margin-top: 12px" class="just-line-break">
                                            {{data_mess.datetime}}
                                            <div class="edir_purl_style" v-if="data_mess.edit==true">
                                                <span class="edit_style">изменено</span>
                                            </div>
                                        </div>
                                        <hr>
                                        <div style="margin-top: 12px" class="flex_like_space_once">
                                            <div style="width: 25px; margin-left: 5px                   ">
                                                <p v-if="data_mess.positive == true"><span class="level_publ_style_true">{{data_mess.level}}</span></p>
                                                <p v-if="data_mess.positive == false"><span class="level_publ_style_false">{{data_mess.level}}</span></p>
                                            </div>
                                            <div class="like_once_style" v-on:click.stop="like()" style="margin-left: 35px">
                                                <div v-if="data_mess.sum_like > 0" style="padding-right: 5px">{{ data_mess.sum_like | number }}</div>
                                                <img v-if="data_mess.check_like == true" style="margin-top: 1px" width="18" height="18" :src="$hostname+'/media/like_done.svg'">
                                                <img v-if="data_mess.check_like == null" style="margin-top: 1px" width="18" height="18" :src="$hostname+'/media/like.svg'">
                                            </div>
                                            <div class="dislike_once_style" v-on:click.stop="dislike()" style="margin-left: 35px">
                                                <div v-if="data_mess.sum_dislike > 0" style="padding-right: 5px">{{ data_mess.sum_dislike | number }}</div>
                                                <img v-if="data_mess.check_dislike == true" style="margin-top: 1px" width="18" height="18" :src="$hostname+'/media/dislike_done.svg'">
                                                <img v-if="data_mess.check_dislike == null" style="margin-top: 1px" width="18" height="18" :src="$hostname+'/media/dislike.svg'">
                                            </div>
                                            <div v-on:click.stop="" style="margin-left: 35px; display: flex; padding: 0px 8px 0px 8px;">
                                                <div v-if="data_mess.comments != null" style="padding-right: 5px">{{ data_mess.comments | number }}</div>
                                                <img style="margin-top: 1px" width="18" height="18" :src="$hostname+'/media/comment.svg'">
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="data_mess.remote == true">
                                        <p style="margin: 50px; margin-bottom: 50px" class="text_style_2">Публикация удалена</p>
                                    </div>
                                    <hr>

                                    <div style="display: flex">
                                         <Textarea
                                             @message="SavePubl"
                                             :description="description"
                                             :username_id="username.username_id"
                                             :edit="false"
                                         />
                                    </div>
                                    <div v-if="all_comment.length > 0">
                                        <hr>
                                        <div style="display: flex">
                                            <div style="flex-grow: 1;"></div>
                                            <span v-on:click="show_edit_comment" class="select">&hellip;</span>
                                              <div v-click-outside="onClickOutsideComment" style="display: none; margin-left: 530px;" id="div_id_comment" class="div_type_comment">
                                                  <div v-if="type_comment == true" v-on:click="first_comment(true)" style="cursor: pointer; height: 40px" class="border_menu_header_1"><p style="color: #40ff40" class="text_menu_header">Сначала старые</p></div>
                                                  <div v-if="type_comment == false" v-on:click="first_comment(true)" style="cursor: pointer; height: 40px" class="border_menu_header_1"><p class="text_menu_header">Сначала старые</p   ></div>
                                                  <div v-if="type_comment == true" v-on:click="first_comment(false)" style="cursor: pointer; height: 40px" class="border_menu_header_2"><p class="text_menu_header">Сначала новые</p></div>
                                                  <div v-if="type_comment == false" v-on:click="first_comment(false)" style="cursor: pointer; height: 40px" class="border_menu_header_2"><p style="color: #40ff40" class="text_menu_header">Сначала новые</p></div>
                                              </div>
                                         </div>
                                    </div>
                                    <div v-for="(mess, index) in all_comment">

                                        <div style="cursor: pointer;" v-on:click.middle="status(mess.username__username, mess.id, true)" v-on:click="status(mess.username__username, mess.id, false)">
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
                                                    <span class="edit_style">изм</span>
                                                </div>
                                            </div>
                                            <div v-if="mess.images.length!=0">
                                                <div class="mt-20 mb-20">
                                                    <div class="col-10" v-on:click.stop="">
                                                        <lightbox css="h-lg-300" :items="mess.images" :cells="3"></lightbox>
                                                    </div>
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
                                                <div v-on:click.stop.prevent="like_comment(mess.id,index)" class="like_mainpage" style="margin-left: 25px">
                                                    <div v-if="mess.sum_like > 0" style="padding-right: 5px">{{ mess.sum_like | number }}</div>
                                                    <img v-if="mess.check_like == true" style="margin-top: 1px" width="18" height="18" :src="$hostname+'/media/like_done.svg'">
                                                    <img v-if="mess.check_like == null" style="margin-top: 1px" width="18" height="18" :src="$hostname+'/media/like.svg'">
                                                </div>
                                                <div v-on:click.stop.prevent="dislike_comment(mess.id,index)" class="dislike_mainpage" style="margin-left: 35px">
                                                    <div v-if="mess.sum_dislike >0" style="padding-right: 5px">{{ mess.sum_dislike | number }}</div>
                                                    <img v-if="mess.check_dislike == true" style="margin-top: 1px" width="18" height="18" :src="$hostname+'/media/dislike_done.svg'">
                                                    <img v-if="mess.check_dislike == null" style="margin-top: 1px" width="18" height="18" :src="$hostname+'/media/dislike.svg'">
                                                </div>
                                                <div style="display: flex; margin-left: 35px">
                                                    <div v-if="mess.comments != null" style="padding-right: 5px">{{ mess.comments | number }}</div>
                                                    <img style="margin-top: 1px" width="18" height="18" :src="$hostname+'/media/comment.svg'">
                                                </div>
                                            </div>
                                         </div>
                                        <hr>
                                    </div>

                                </div>

                                <div v-if="edit==true">
                                    <Textarea
                                     @save_edit="save_edit_publ"
                                     @cancel_edit="cancel_edit_mess"
                                     :description="description"
                                     :username_id="Number(data_mess.username_id)"
                                     :edit="true"
                                     :message_edit="clean_mess"
                                     :images = "data_mess.images"/>
                                </div>
                            </div>
                            <div v-if="check_publ == false">
                                <p style="margin-top: 100px" class="text_style_2">Публикации не существует</p>
                            </div>
                        </div>
                        <div class="right_menu">
                            <RighMenu/>
                        </div>
                    </div>
                <div v-observe-visibility="handleScrolledToBottom"></div>
            </div>
        </div>
        <modal name="remove_publ"
               :width="250"
               :height="122"
               :pivot-y="0.5"
               :adaptive="false"
               styles="border-radius: 17px; background: #191919; box-shadow: 0 0 1px 1px #393939"
               transition="nice-modal-fade">
                <p class="remove_publ">Вы действительно хотите удалить?</p>
                <div class="space_remove_publ">
                    <button style="background: #1bc612;" class="button_style_remove" v-on:click="remove_publ">Да</button>
                    <button style="background: #cb144d;" class="button_style_remove" v-on:click="hide_model_remove">Нет</button>
                </div>
            </modal>
    </div>
</template>

<script>
    import vClickOutside from 'v-click-outside'
    import Vue from 'vue'
    import VModal from 'vue-js-modal';
    import TextareaAutosize from 'vue-textarea-autosize'
    import axios from "axios";
    import VueObserveVisibility from 'vue-observe-visibility'
    import moment from 'moment'
    import { autoLink } from 'vue-highlights'
    Vue.use(VueObserveVisibility)
    Vue.use(TextareaAutosize)
    Vue.use(VModal);



    moment.locale('ru')
    export default {
        name: "Status",
        components: {

        },
        directives: {
          clickOutside: vClickOutside.directive
        },
        data() {
            return {
                clean_mess: null,
                access_token: localStorage.getItem('access') || null,
                id_url: null,
                username_url: null,
                data_mess: {
                    message: null,
                    datetime: null,
                    edit: null,
                    access: null,
                    parent_id: null,
                    images: [],
                    check_like: null,
                    level: null,
                    positive: null,
                    sum_like: null,
                    sum_dislike: null,
                },
                edit: false,
                message: null,
                username: {
                    username: null,
                    username_id: null,
                },
                comment: null,
                all_comment: [],
                last_datetime: null,
                stop_get_comment: 10,
                description: 'Добавьте комментарий...',
                check_publ: Boolean,
                rating_result:{
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
                    username: null,
                },
                stop_close: true,
                stop_close_comment: true,
                type_comment: true,
            }
        },
        methods: {

            first_comment(type){
                this.type_comment = type
                this.all_comment = []
                this.last_datetime = null
                this.stop_get_comment = 10
                this.get_comment()
                document.getElementById("div_id_comment").style.display = "none"
            },

            show_edit_comment(){
                this.stop_close_comment = false
                setTimeout(() => this.stop_close_comment = true, 100);
                if (document.getElementById("div_id_comment").style.display == "none"){
                    document.getElementById("div_id_comment").style.display = "block"
                    return 0
                }
                if (document.getElementById("div_id_comment").style.display == "block"){
                    document.getElementById("div_id_comment").style.display = "none"
                    return 0
                }
            },

            onClickOutsideComment (event){
                if (document.getElementById("div_id_comment").style.display == "block" && this.stop_close_comment == true){
                    document.getElementById("div_id_comment").style.display = "none"
                }
            },


            onClickOutside (event){
                if (document.getElementById("div_id_edit").style.display == "block" && this.stop_close == true){
                    document.getElementById("div_id_edit").style.display = "none"
                }
            },

            show_edit_menu(){
                this.stop_close = false
                setTimeout(() => this.stop_close = true, 100);
                if (document.getElementById("div_id_edit").style.display == "none"){
                    document.getElementById("div_id_edit").style.display = "block"
                    return 0
                }
                if (document.getElementById("div_id_edit").style.display == "block"){
                    document.getElementById("div_id_edit").style.display = "none"
                    return 0
                }
            },

            hide_model_remove(){
              this.$modal.hide('remove_publ');
            },

            view_update_rating_comment(index){
                if (this.data_mess.username == this.rating_result_comment.username){
                    this.data_mess.level_user = this.rating_result_comment.level_user
                    this.data_mess.positive_user = this.rating_result_comment.positive_user
                }
                for (var i = 0; i < this.all_comment.length; i++){
                    if (this.all_comment[i].username__username == this.rating_result_comment.username){
                        this.all_comment[i].level_user = this.rating_result_comment.level_user
                        this.all_comment[i].positive_user = this.rating_result_comment.positive_user
                    }
                }
                this.all_comment[index].level = this.rating_result_comment.level_p
                this.all_comment[index].positive = this.rating_result_comment.positive_p
                if (this.rating_result_comment.like == true){
                    this.all_comment[index].check_like = true
                    this.all_comment[index].sum_like = this.all_comment[index].sum_like + 1
                }
                if (this.rating_result_comment.like == false){
                    this.all_comment[index].check_like = null
                    this.all_comment[index].sum_like = this.all_comment[index].sum_like - 1
                }
                if (this.rating_result_comment.dislike == true){
                    this.all_comment[index].check_dislike = true
                    this.all_comment[index].sum_dislike = this.all_comment[index].sum_dislike + 1
                }
                if (this.rating_result_comment.dislike == false){
                    this.all_comment[index].check_dislike = null
                    this.all_comment[index].sum_dislike = this.all_comment[index].sum_dislike - 1
                }
            },

            like_comment(id, index){
                if (this.username.username != this.all_comment[index].username__username){
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
                }
            },

            dislike_comment(id, index){
                if (this.username.username != this.all_comment[index].username__username){
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
                }
            },

            view_update_rating(){
                this.data_mess.level_user = this.rating_result.level_user
                this.data_mess.positive_user = this.rating_result.positive_user
                this.data_mess.level = this.rating_result.level_p
                this.data_mess.positive = this.rating_result.positive_p
                if (this.rating_result.like == true){
                    this.data_mess.check_like = true
                    this.data_mess.sum_like = this.data_mess.sum_like + 1
                }
                if (this.rating_result.like == false){
                    this.data_mess.check_like = null
                    this.data_mess.sum_like = this.data_mess.sum_like - 1
                }
                if (this.rating_result.dislike == true){
                    this.data_mess.check_dislike = true
                    this.data_mess.sum_dislike = this.data_mess.sum_dislike + 1
                }
                if (this.rating_result.dislike == false){
                    this.data_mess.check_dislike = null
                    this.data_mess.sum_dislike = this.data_mess.sum_dislike - 1
                }
                for (var i = 0; i < this.all_comment.length; i++){
                    if (this.all_comment[i].username__username == this.data_mess.username){
                        this.all_comment[i].level_user = this.data_mess.level_user
                        this.all_comment[i].positive_user = this.data_mess.positive_user
                    }
                }
            },

            like(){
                if (this.username.username != this.data_mess.username){
                    axios.post(this.$hostname + '/api/mainpage/rating/like/', {
                        id: this.id_url
                      },
                  {
                        headers: {
                            'Authorization': 'Bearer ' + this.access_token,
                        }
                    })
                      .then(res => {
                          this.rating_result = res.data;
                          this.view_update_rating()
                      })
                }
            },

            dislike(){
                if (this.username.username != this.data_mess.username){
                    axios.post(this.$hostname + '/api/mainpage/rating/dislike/', {
                        id: this.id_url
                      },
                  {
                        headers: {
                            'Authorization': 'Bearer ' + this.access_token,
                        }
                    })
                      .then(res => {
                        this.rating_result = res.data;
                        this.view_update_rating()
                      })
                }
            },

            handleScrolledToBottom(isVisible){
                if (!isVisible)  { return }
                if (this.all_comment == null) { return }
                if (this.last_datetime == null) { return }
                this.get_comment()
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



            get_comment(){
                if (this.stop_get_comment != 0){
                    axios.post(this.$hostname + '/api/mainpage/publ/get_comment/', {
                        parent_id: this.id_url,
                        datetime_request: this.last_datetime,
                        type: this.type_comment,
                      },
                  {
                        headers: {
                            'Authorization': 'Bearer ' + this.access_token,
                        }
                    })
                      .then(res => {
                          this.stop_get_comment = res.data.length
                          if (res.data != false){
                              this.last_datetime = res.data[res.data.length-1].datetime
                              for (var i = 0; i < res.data.length; i++){
                                    res.data[i].message = autoLink(res.data[i].message)
                                    res.data[i].datetime = moment(res.data[i].datetime).format('DD MMMM')
                                }
                              this.all_comment.push(...res.data);
                          }

                      })
                }
            },

            SavePubl(comment,images){
                if (comment != '' || images.length != 0){
                    this.stop_get_comment = 10
                    this.last_datetime = null
                    this.all_comment = []
                    axios.post(this.$hostname + '/api/mainpage/publ/save_comment/', {
                        comment: comment,
                        images: images,
                        parent_id: this.id_url,
                        publ_user: this.data_mess.username_id,
                      },
                  {
                        headers: {
                            'Authorization': 'Bearer ' + this.access_token,
                        }
                    })
                      .then(res => {
                          this.get_comment()
                      })
                }
            },

            remove_publ(){
              axios.post(this.$hostname+ '/api/mainpage/publ/delete_mess/', {
                    id_url: this.id_url,
                  },
              {
                    headers: {
                        'Authorization': 'Bearer ' + this.access_token,
                    }
                })
                  .then(res => {
                      this.go_page(this.data_mess.username, false)
                  })
            },

            show_modal_remove(){
                this.$modal.show('remove_publ');

            },

            cancel_edit_mess(){
                this.edit = false;
            },

            save_edit_publ(message,images){
                axios.post(this.$hostname + '/api/mainpage/publ/save_edit_publ/', {
                    message: message,
                    images: images,
                    id_url: this.id_url,
                    comment: this.data_mess.parent_id
                  },
              {
                    headers: {
                        'Authorization': 'Bearer ' + this.access_token,
                    }
                })
                  .then(res => {
                    location.reload()
                  })
            },

            edit_publ(){
              this.edit = true;
              // this.message = this.data_mess.message;
            },

            back_home(){
                if (this.data_mess.parent_id != null){
                    var url_page = '/back/status/' + this.data_mess.parent_id;
                    this.$router.push(url_page);
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

            check_url_username(){
                if (this.username_url != this.data_mess.username){
                    var url_page = '/' + this.data_mess.username + '/status/' + this.id_url;
                    this.$router.push(url_page);
                }
            },

            check_id_and_username(){
                var currentLocation = window.location + '';
                let arr = new Array();
                arr = currentLocation.split('/')
                this.id_url = arr[arr.length-1]
                this.username_url = arr[arr.length-3]
                axios.post(this.$hostname + '/api/mainpage/publ/get_publ_by_id/', {
                    id_url: this.id_url,
                  },
              {
                    headers: {
                        'Authorization': 'Bearer ' + this.access_token,
                    }
                })
                  .then(res => {
                    if (res.data == false){
                        this.check_publ = false
                    }
                    else{
                        this.check_publ = true
                        res.data.datetime = moment(res.data.datetime).format('hh:mm DD MMMM YYYY')
                        this.data_mess = res.data;
                        this.clean_mess = this.data_mess.message
                        this.data_mess.message = autoLink(this.data_mess.message)
                        this.check_url_username()
                    }

                  })

            },


            user_check(){
              axios.post(this.$hostname + '/api/mainpage/user_profile/get_username/', {

                  },
              {
                    headers: {
                        'Authorization': 'Bearer ' + this.access_token,
                    }
                })
                  .then(res => {
                      this.username = res.data;
                  })

            },

            timeout_title(){
                if ( this.data_mess.username != null ) {
                    document.title = this.data_mess.username
                } else {
                    setTimeout( this.timeout_title, 100);
                }
            },

        },
        created() {
            this.check_id_and_username()
            this.user_check();
            this.timeout_title()
            this.get_comment()



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