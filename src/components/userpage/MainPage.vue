<template>
<div>
    <Header
    :username="username">
    </Header>
    <div class="background_main">
        <div class="center">
            <div style="height: 15px"></div>
            <div style="display: flex">
                <div class="left_menu">
                    <LeftMenu
                    :username="username">
                    </LeftMenu>
                </div>
                <div class="home_style">
                    <div v-if="username_url_data.check == true">
                        <div class="sideitem_1">
                            <image-uploader
                                :maxWidth="700"
                                :maxHeight="700"
                                :quality="1"
                                :className="['fileInput', { 'fileinput--loaded': hasImage }]"
                                doNotResize="['gif', 'svg']"
                                outputFormat="string"
                                ref="avatarGet"
                                :preview=false
                                @input="setImage"
                            >
                            </image-uploader>

                            <div style="display: flex">
                                <div class="avatar_click">
                                    <img v-if="username_url_data.id != null" style="border-radius: 50%" :src="$hostname+'/media/profile/'+username_url_data.id+'/'+username_url_data.id+'.png'">
                                    <label v-if="username_url_data.access==true" for="fileInput"><div id='invisible'></div></label>
                                </div>
                                <div>
                                    <div style="display: flex">
                                        <p class="username_style margin_img"> {{ username_url | truncate(12, '...')}}</p>
                                        <img v-if="username_url_data.success == true" class="success" width="18px" height="18px" :src="$hostname+'/media/success.svg'">
                                        <div v-if="username_url_data.star > 0">
                                            <img v-if="username_url_data.star == 1" class="star" width="16px" height="16px" :src="$hostname+'/media/star_1.svg'">
                                            <img v-if="username_url_data.star == 2" class="star" width="16px" height="16px" :src="$hostname+'/media/star_2.svg'">
                                            <img v-if="username_url_data.star == 3" class="star" width="16px" height="16px" :src="$hostname+'/media/star_3.svg'">
                                            <img v-if="username_url_data.star == 4" class="star" width="16px" height="16px" :src="$hostname+'/media/star_4.svg'">
                                            <img v-if="username_url_data.star == 5" class="star" width="16px" height="16px" :src="$hostname+'/media/star_5.svg'">
                                        </div>
                                        <p v-if="username_url_data.positive == true" class="margin_img" align="left"><span class="level_page_style_true">{{username_url_data.level}}</span></p>
                                        <p v-if="username_url_data.positive == false" class="margin_img" align="left"><span class="level_page_style_false">{{username_url_data.level}}</span></p>
                                        <div style="flex-grow: 1;"></div>
                                        <div v-if="username_url_data.access == false">
<!--                                            <button style="width: auto; margin-top: 22px" v-if="check_sub_res == false" class="button_style" v-on:click="subscribe(username_url)">Подписаться</button>-->
                                            <div v-if="check_sub_res == false" style="margin-top: 30px;"><a style="color: #40ff40 !important" class="sub_link" v-on:click="subscribe(username_url)">Подписаться</a></div>
                                            <div v-if="check_sub_res == true" style="margin-top: 30px"><a class="sub_link" v-on:click="unsubscribe(username_url)">Отписаться</a></div>
                                        </div>
                                    </div>

                                    <div style="display: flex">
                                        <span class="text_style margin_sub">{{sum_sub.publications | number }} публикаций</span>
                                        <span class="text_style margin_sub"><a class="sub_link" v-on:click="followers_show()">{{sum_sub.subscribe | number }} подписчиков</a></span>
                                        <span class="text_style margin_sub"><a class="sub_link" v-on:click="following_show()">{{sum_sub.subscriptions | number }} подписок</a></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="just-line-break" v-if="username_url_data.description != null">
                            <div v-html="username_url_data.description"></div>
                        </div>
                        <hr>
                        <Publications
                        @update_rating="update_rating"
                        :username="username"
                        :username_url_id="username_url_data.id"
                        />
                    </div>
                    <div v-if="username_url_data.check == false">
                        <div style="height: 100px"></div>
                        <p class="text_style_2">Пользователя {{ this.username_url }} не существует</p>
                    </div>
                </div>
                <div class="right_menu">
                    <RighMenu/>
                </div>
            </div>


             <modal name="crop_avatar"
               :width="470"
               height="auto"
               :pivot-y="0.5"
               :adaptive="true"

               styles="border-radius: 17px; background: #191919; box-shadow: 0 0 1px 1px #393939"
               transition="nice-modal-fade">
               <div style="display: flex">
                 <cropper
                    ref="cropper"
                    class="avatat-result__cropper"
                    :src="url_avatar"
                    :debounce="false"
                    :stencil-props="{
                        aspectRatio: 1,

                    }"
                    :stencil-component="$options.components.CircleStencil"
                    @change="onChange"
                />
                <div class="avatat-result__previews">
                    <preview style="" class="avatat-result__preview" :image="result.image" :coordinates="result.coordinates" />
                    <div style="height: 15px"></div>
                    <label for="fileInput"><p><a class="sub_link">Изменить</a></p></label>
                </div>

                </div>

                <div class="button_avatar">
                    <button class="button_style" v-on:click="onCrop">Сохранить</button>
                    <div style="width: 25px"></div>
                    <button class="button_style" v-on:click="crop_avatar_hide">Выйти</button>
                </div>

            </modal>

            <div style="display: none;" v-click-outside="onClickOutside" id="id_followers" class="style_followers_win">
                <p style="margin-top: 10px" class="text_style_2">Подписчики</p>
                <hr>
                <div style="height: 310px; overflow: auto;">
                    <div v-for="(unit,index) in list_followers">
                        <div v-on:click.middle="go_page(unit.username__username,true)" v-on:click="go_page(unit.username__username,false)" class="border_fow" style="display: flex">
                            <img style="margin-top: 4px" v-if="unit.username__id != null" class="img_fol" :src="$hostname+'/media/profile/'+unit.username__id+'/'+unit.username__id+'.png'">
                            <span style="margin: 12px 10px 0px 10px">{{unit.username__username | truncate(15, '...')}}</span>
                            <span v-if="unit.positive == true" v style="margin-top: 12px" class="level_publ_style_true">{{unit.level}}</span>
                            <span v-if="unit.positive == false" style="margin-top: 12px" class="level_publ_style_false">{{unit.level}}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div style="display: none;" v-click-outside="onClickOutside" id="id_following" class="style_followers_win">
                <p style="margin-top: 10px" class="text_style_2">Подписки</p>
                <hr>
                <div style="height: 310px; overflow: auto;">
                    <div v-for="(unit,index) in list_following">
                        <div v-on:click.middle="go_page(unit.username__username,true)" v-on:click="go_page(unit.username__username,false)" class="border_fow" style="display: flex">
                            <img style="margin-top: 4px" v-if="unit.username__id != null" class="img_fol" :src="$hostname+'/media/profile/'+unit.username__id+'/'+unit.username__id+'.png'">
                            <span style="margin: 12px 10px 0px 10px">{{unit.username__username | truncate(15, '...')}}</span>
                            <span v-if="unit.positive == true" v style="margin-top: 12px" class="level_publ_style_true">{{unit.level}}</span>
                            <span v-if="unit.positive == false" style="margin-top: 12px" class="level_publ_style_false">{{unit.level}}</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>



    </div>

</div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import VModal from 'vue-js-modal';
import  Vue from  'vue';
import { CircleStencil, Cropper, Preview  } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import ImageUploader from 'vue-image-upload-resize'
import { autoLink } from 'vue-highlights'


Vue.use(ImageUploader);
Vue.use(VModal);
// Vue.forceUpdate();

export default {
  name: 'startpage',
  components: {
      Cropper, CircleStencil, Preview,
      ImageUploader,
  },

  data(){
      return{
        access_token: localStorage.getItem('access') || null,
        username_url: this.$route.params.username,
        username: null,
        access: null,
        username_url_data: {
            check: null,
            id: null,
            access: null,
            level: null,
            positive: null,
            description: null,
        },
        sum_sub: {
            subscribe: null,
            subscriptions: null,
            publications: null,
        },
        check_sub_res: null,
        selected_avatar: null,
        url_avatar: null,
        list_followers: [],
        list_following: [],
        result: {
				coordinates: null,
				image: null,
			},
        hasImage: false,
        res_avatar: null,
        stop_close_followers: true,
        stop_close_following: true,
        last_datetime: null,
      }
  },

  methods: {

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

    handleScrolledToBottom_followers(isVisible){
        if (!isVisible)  { return }
        if (this.list_followers == null) { return }
    },

    update_rating(level, positive){
        this.username_url_data.level = level
        this.username_url_data.positive = positive
    },

    setImage(output) {
      this.hasImage = true;
      this.url_avatar = output;
      this.crop_avatar_show()
    },

    onChange({ coordinates, image }) {

        this.result = {
            coordinates,
            image,
        };
    },

    onCrop() {
        const result = this.$refs.cropper.getResult().canvas.toDataURL();
        axios.post(this.$hostname + '/api/mainpage/avatar/set/', {
            avatar: result
          },
      {
			headers: {
				'Authorization': 'Bearer ' + this.access_token,
			}
		})
          .then(res => {
              this.res_avatar = res.data;
              location.reload();
          });

    },

    crop_avatar_show(){

        this.$modal.show('crop_avatar');
    },
    crop_avatar_hide(){
        location.reload();
        this.$modal.hide('crop_avatar');
    },

    followers_show(){
        axios.post(this.$hostname + '/api/mainpage/subscribe/list_followers/', {
            username: this.username_url,
          },
      {
			headers: {
				'Authorization': 'Bearer ' + this.access_token,
			}
		})
          .then(res => {
              this.list_followers = res.data;
          });

        this.stop_close_followers = false
        setTimeout(() => this.stop_close_followers = true, 10);
        if (document.getElementById("id_followers").style.display == "none"){
            document.getElementById("id_followers").style.display = "block"
            return 0
        }
        if (document.getElementById("id_followers").style.display == "block"){
            document.getElementById("id_followers").style.display = "none"
            return 0
        }
    },

    onClickOutside(){
        if (document.getElementById("id_followers").style.display == "block" && this.stop_close_followers == true){
            document.getElementById("id_followers").style.display = "none"
        }
        if (document.getElementById("id_following").style.display == "block" && this.stop_close_following == true){
            document.getElementById("id_following").style.display = "none"
        }
    },

    following_show(){
        axios.post(this.$hostname + '/api/mainpage/subscribe/list_following/', {
            username: this.username_url,
          },
      {
            headers: {
                'Authorization': 'Bearer ' + this.access_token,
            }
        })
          .then(res => {
              this.list_following = res.data;
          })
        this.stop_close_following = false
        setTimeout(() => this.stop_close_following = true, 10);
        if (document.getElementById("id_following").style.display == "none"){
            document.getElementById("id_following").style.display = "block"
            return 0
        }
        if (document.getElementById("id_following").style.display == "block"){
            document.getElementById("id_following").style.display = "none"
            return 0
        }
    },

    check_sub(){
        axios.post(this.$hostname + '/api/mainpage/subscribe/check_sub/', {
            username: this.username_url,
          },
      {
			headers: {
				'Authorization': 'Bearer ' + this.access_token,
			}
		})
          .then(res => {
              this.check_sub_res = res.data;

          })
    },

    get_sum_sub(){
        axios.post(this.$hostname + '/api/mainpage/subscribe/sum/', {
            username: this.username_url,
          },
      {
			headers: {
				'Authorization': 'Bearer ' + this.access_token,
			}
		})
          .then(res => {
              this.sum_sub = res.data;
          })
    },

    subscribe(username){
        axios.post(this.$hostname + '/api/mainpage/subscribe/plus/', {
            username: username,
          },
      {
			headers: {
				'Authorization': 'Bearer ' + this.access_token,
			}
		})
          .then(res => {
              this.check_sub_res = res.data
              this.get_sum_sub()
          })
    },

    unsubscribe(username){
        axios.post(this.$hostname + '/api/mainpage/subscribe/minus/', {
            username: username,
          },
      {
			headers: {
				'Authorization': 'Bearer ' + this.access_token,
			}
		})
          .then(res => {
              this.check_sub_res = res.data;
              this.get_sum_sub()
          })
    },

    user_url_check(){
        axios.post(this.$hostname + '/api/mainpage/user_profile/check/', {
            username: this.username_url,
        },
        {
			headers: {
				'Authorization': 'Bearer ' + this.access_token,
			}
          })
          .then(res => {
              this.username_url_data = res.data;
              if(this.username_url_data.description != null){
                 this.username_url_data.description = autoLink(this.username_url_data.description)
              }

          })
    },

    timeout(){
        if ( this.username_url_data.check != null ) {
            if (this.username_url_data.check == true){
                  this.get_sum_sub(); // кол-во подписчиков и подписок у пользователя
                  this.check_sub();
              }
        } else {
            setTimeout( this.timeout, 100);
        }
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


  },
  created() {
      document.title = this.username_url
      this.user_check()
      this.user_url_check(); //существует ли пользователь
      this.timeout()

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
    },

}
</script>

<style lang="scss">

.margin_sub{
    margin: 20px 0px 0px 20px;
}

.margin_img{
    margin: 25px 5px 0px 20px;
}

.margin_but_sub{
    margin: 25px 10px 0px 20px;
}

  .it_indent{
      flex-basis: 10%
  }

  .sideitem_1{
      display: flex;
      height: 200px;
      flex-wrap: wrap;
      align-content: center;
  }


  .list_modal_style{
      width: 100%;
      text-align: left;
      padding: 5px 0 0 15px;
  }



.avatat-result {
	display: flex;
	&__cropper {
		width: 300px;
	}
	&__previews {
		margin-left: 32px;
	}
	&__preview {
		border-radius: 50%;
		overflow: hidden;
		margin-top: 24px;
		width: 100px;
		height: 100px;
	}
	&__preview-image {
		width: 100%;
	}
	&__button {
		position: absolute;
		left: 16px;
		bottom: 0;
	}
}

  .button_avatar{
      display: flex;
      margin: 8px 8px 8px 8px;
  }

  .username_style{
      font-family: 'Open Sans', sans-serif;
      font-size: 20pt; /* Размер текста */
      font-weight: lighter; /* Светлое начертание */
      text-align: left;
      color: #fafafa;
  }
  .text_style{
      font-family: Trebuchet MS; /* Гарнитура шрифта */
      font-size: 11pt; /* Размер текста */
      font-weight: lighter; /* Светлое начертание */
      text-align: left;
      color: #fafafa;
  }



  #fileInput {
    display: none;
  }

  #invisible {
    position: absolute;
    top: 0px;
    right: 0px;
    border-radius: 50%;
    width: 150px;
    height: 150px;
    cursor: pointer;
}

  #invisible_2 {
    position: absolute;
    top: 0px;
    right: 0px;
    border-radius: 50%;
    width: 150px;
    height: 150px;
    cursor: pointer;
}

  .avatar_click {
    position: relative;
}
  .img_sub{
      border-radius: 50%;
      width: 35px;
      height: 35px;
  }



  .body_sub{
      display: flex;
  }

  .success{
      margin: 36px 0px 0px 0px;
  }
  .star{
      margin: 37px 0px 0px 3px;
  }


</style>