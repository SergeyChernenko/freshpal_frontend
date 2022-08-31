<template>
    <header v-if="username != null" class="header_style">
      <div class="center">
          <div class="style_header">
              <div v-on:click.middle="back_home(true)" v-on:click="back_home(false)" class="itm_logo"><img width="112px" height="21.8px" :src="$hostname+'/media/logo.svg'"></div>
              <div>
                  <div class="itm_search">
                      <div v-on:click="searchUser">
                        <input class="search input_style"type="search" id="mySearch" placeholder="Поиск" @keyup="searchUser">
                      </div>
                  </div>

                  <div v-click-outside="onClickOutside" id="div_id_search" class="div_search">
                      <div v-for="data in search_result">
                          <div class="border_username_res" style="display: flex" v-if="search_type == 'username'" v-on:click.middle="go_page(data.username__username, true)" v-on:click="go_page(data.username__username, false)">
                            <img v-if="data.username != null" class="img_res" :src="$hostname+'/media/profile/'+data.username+'/'+data.username+'.png'">
                            <span style="margin: 8px 10px 0px 10px">{{data.username__username}}</span>
                            <span v-if="data.positive == true" v style="margin-top: 8px" class="level_publ_style_true">{{data.level}}</span>
                            <span v-if="data.positive == false" style="margin-top: 8px" class="level_publ_style_false">{{data.level}}</span>
                          </div>
                          <div class="border_username_res" v-if="search_type == 'hashtag'" v-on:click="hashtag_exact_f(data.hashtag)">
                            <span style="margin-left: 10px">#{{data.hashtag}}</span>
                          </div>
                      </div>
                      <div v-if="search_result.length == 0">
                          Нет результатов
                      </div>
                  </div>
              </div>
              <div>
              <div style="width: 122px">
                <img style="float:right" v-on:click="user_head_menu" v-if="username.username_id != null" class="img_header" :src="$hostname+'/media/profile/'+username.username_id+'/'+username.username_id+'.png'">
              </div>
              <div v-click-outside="onClickOutside" style="display: none;" id="div_id_image" class="div_image_head">
                  <div v-on:click.middle="back_home(true)" v-on:click="back_home(false)" style="cursor: pointer; height: 40px" class="border_menu_header_1"><p class="text_menu_header">Профиль</p></div>
                  <div v-on:click.middle="go_page('settings',true)" v-on:click="go_page('settings',false)" style="cursor: pointer; height: 40px" class="border_menu_header_c"><p class="text_menu_header">Настройки</p></div>
                  <div v-on:click="logout" style="cursor: pointer; height: 40px" class="border_menu_header_2"><p class="text_menu_header">Выйти</p></div>
              </div>
              </div>
          </div>
      </div>
	</header>
</template>

<script>
    import vClickOutside from 'v-click-outside'
    import axios from "axios";

    export default {
        name: "Header",
        components: {
        },
        directives: {
          clickOutside: vClickOutside.directive
        },
        data(){
          return{
              access_token: localStorage.getItem('access') || null,
              search_data: null,
              search_result: [],
              search_type: null,
              stop_close_menu: true,
              stop_close_search: true,
          }
        },
        props: {
            username: Object,
        },
        methods: {

            user_head_menu(){
                this.stop_close_menu = false
                setTimeout(() => this.stop_close_menu = true, 100);
                if (document.getElementById("div_id_image").style.display == "none"){
                    document.getElementById("div_id_image").style.display = "block"
                    return 0
                }
                if (document.getElementById("div_id_image").style.display == "block"){
                    document.getElementById("div_id_image").style.display = "none"
                    return 0
                }
            },

            hashtag_exact_f(tag){
                var url_page = '/hashtag/' + tag;
                this.$router.push(url_page).catch(()=>{});
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

            onClickOutside (event){
                if (document.getElementById("div_id_search").style.display == "block" && this.stop_close_search == true){
                    document.getElementById("div_id_search").style.display = "none"
                }
                if (document.getElementById("div_id_image").style.display == "block" && this.stop_close_menu == true){
                    document.getElementById("div_id_image").style.display = "none"
                }
            },

            searchUser(){
                this.stop_close_search = false
                setTimeout(() => this.stop_close_search = true, 100);
                this.search_data = document.getElementById("mySearch").value;
                if (this.search_data.length > 0){
                    document.getElementById("div_id_search").style.display = "block"
                    if (this.search_data.startsWith("#") == true){
                        this.search_type = 'hashtag'
                        axios.post(this.$hostname + '/api/mainpage/user_profile/search_hashtag/', {
                            hashtag: this.search_data,
                          },
                      {
                            headers: {
                                'Authorization': 'Bearer ' + this.access_token,
                            }
                        })
                          .then(res => {
                              this.search_result = res.data;
                          })
                    }
                    else{
                        this.search_type = 'username'
                        axios.post(this.$hostname + '/api/mainpage/user_profile/search_username/', {
                            username: this.search_data,
                          },
                      {
                            headers: {
                                'Authorization': 'Bearer ' + this.access_token,
                            }
                        })
                          .then(res => {
                              this.search_result = res.data;
                          })
                    }
                }
                if (this.search_data.length == 0){
                    document.getElementById("div_id_search").style.display = "none"
                }

            },

            home(){
                var url_page = '/home';
                this.$router.push(url_page).catch(()=>{});
            },

            back_home(middle){
                var url_page = '/' + this.username.username;
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
            logout(){
              this.$store.dispatch('fetchCount')
              this.$store.dispatch('fetchLike')
              this.$store.dispatch('fetchSub')
              localStorage.removeItem('access');
              localStorage.removeItem('refresh');
              this.$router.push('/')

            },


            },
        created() {

        }
    }
</script>

<style scoped>
.header_style {
    height: 54px;
    background: #191919;
    border: 1px solid #303030;
    /*position: fixed;*/
    /*width: 100%;*/
}
.center {
    width: 1000px; /* Ширина элемента в пикселах */
    margin: auto; /* Выравниваем по центру */
    min-height: 100vh;
}

.itm_logo {
    cursor: pointer;
    margin: 14px 5px 5px 12px;
    /*flex-grow:1;*/
    /*padding: 10px;*/
    /*font-size: 2.5rem;*/
}
.itm_search{
      margin-top: 9px;
      border-radius: 12px;
}

.style_header {
  display: flex;
  justify-content: space-between;
}

.search{
    width: 300px;
    height: 33px;
  }

.div_image_head{
    position: absolute;

    width: 130px;
    height: 120px;
    margin-top: 50px;
    margin-left: 28px;
    background: #191919; /* Цвет фона */
    /*padding: 15px; !* Поля вокруг текста *!*/
    border-radius: 15px;
    /*border: 1px solid #303030;*/
    box-shadow: 0px 0px 5px 0px #666666;
}

.div_search{
    z-index:99;
    position: absolute;
    display: none;
    width: 300px;
    height: auto;
    max-height: 400px;
    background: #191919; /* Цвет фона */
    padding: 15px; /* Поля вокруг текста */
    border-radius: 20px;
    /*border: 1px solid #303030;*/
    overflow: auto;
    box-shadow: 0px 0px 5px 0px #666666;
}

.border_username_res{
    margin-top: 12px;
    cursor: pointer;
}

.border_username_res:hover {
    background: #232323; /* Цвет фона */
    border-radius: 20px;
}



.img_res{
    border-radius: 50%;
    width: 40px;
    height: 40px;
}

.img_header{
    cursor: pointer;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin: 7px 10px 0px 0px;
  }

/* clears the ‘X’ from Internet Explorer */
input[type=search]::-ms-clear { display: none; width : 0; height: 0; }
input[type=search]::-ms-reveal { display: none; width : 0; height: 0; }
/* clears the ‘X’ from Chrome */
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration { display: none; }

</style>