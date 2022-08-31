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
                    <div v-if="url == 'new'">
                        <Subscriptions
                            :username="username">
                        </Subscriptions>
                    </div>
                    <div v-if="url == 'rec'">
                        <Recommended
                            :username="username">
                        </Recommended>
                    </div>
                    <div v-if="url == 'settings'">
                        <Settings
                            :username="username">
                        </Settings>
                    </div>
                    <div v-if="url == 'support'">
                        <Support
                            :username="username">
                        </Support>
                    </div>
                    <div v-if="url == 'hashtag'">
                        <Hashtag
                            :username="username">
                        </Hashtag>
                    </div>
                    <div v-if="url == 'activity'">
                        <Activity
                            :username="username">
                        </Activity>
                    </div>
                    <div v-if="url == 'donat'">
                        <Donat
                            :username="username">
                        </Donat>
                    </div>
                </div>
                <div class="right_menu">
                    <RighMenu/>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import Vue from 'vue'
import TextareaAutosize from 'vue-textarea-autosize'
import axios from "axios";

Vue.use(TextareaAutosize)

export default {
    name: "home",
    components: {

    },
    data(){
      return{
          url: window.location + '',
          access_token: localStorage.getItem('access') || null,
          access: null,
          username: {},
          message: null,
          hashtag: null,
        }
    },
    methods: {
        user_check(){
          let arr = new Array();
          const encoded = decodeURI(this.url);
          arr = encoded.split('/')
          if (arr.length == 5){
              this.url = arr[arr.length-2]
          }
          else{
              this.url = arr[arr.length-1]
          }
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
        this.user_check()
    },
}
</script>

<style scoped>



</style>