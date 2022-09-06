<template>
    <div>

        <div style="margin-bottom: 15px" class="tag_style">
            <p class="p_tag">Популярное за месяц</p>
            <div id="div_load_h" style="margin-top: 25px; height: 30px" class="vld-parent">
                <loading :active.sync="isLoadingHashtag"
                :is-full-page="false"
                :heigh="30"
                :width="30"
                color="#40ff40"
                :opacity="0"
                ></loading>
            </div>
            <div style="margin-bottom: 7px" v-for="hash in hashtag">
                <div style="display: flex" v-on:click.middle="hashtag_page(hash.hashtag, true)" v-on:click="hashtag_page(hash.hashtag, false)" class="border_tag">
                    <span class="text_tag">{{hash.hashtag | truncate(18, '...')}}</span>
                    <div style="flex-grow: 1;"></div>
                    <span style="margin-right: 15px; color: #8e8e8e;" class="count_tags">{{ hash.count | number }}</span>
                </div>
            </div>
            <div style="margin-bottom: 10px" class="border_tag" v-on:click.middle="hashtag_main(true)" v-on:click="hashtag_main(false)">
                <span class="more_tag">еще...</span>
            </div>
        </div>

        <div class="tag_style">
            <p class="p_tag">Герои FreshPal</p>
            <div id="div_load_d" style="margin-top: 25px; height: 30px" class="vld-parent">
                <loading :active.sync="isLoadingDonat"
                :is-full-page="false"
                :heigh="30"
                :width="30"
                color="#40ff40"
                :opacity="0"
                ></loading>
            </div>
            <div>
                <div style="margin-bottom: 7px" v-for="(dn,index) in donat">
                    <div style="display: flex" v-on:click.middle="go_page(dn.username__username, true)" v-on:click="go_page(dn.username__username, false)" class="border_hero">
                        <img v-if="dn.username_id != null" class="img_p" :src="$hostname+'/media/profile/'+dn.username_id+'/'+dn.username_id+'.png'">
                        <span class="text_hero">{{dn.username__username | truncate(14, '...')}}</span>
                        <img v-if="index == 0" class="star" width="15px" height="15px" :src="$hostname+'/media/star_1.svg'">
                        <img v-if="index == 1" class="star" width="15px" height="15px" :src="$hostname+'/media/star_2.svg'">
                        <img v-if="index == 2" class="star" width="15px" height="15px" :src="$hostname+'/media/star_3.svg'">
                        <img v-if="index == 3" class="star" width="15px" height="15px" :src="$hostname+'/media/star_4.svg'">
                        <img v-if="index == 4" class="star" width="15px" height="15px" :src="$hostname+'/media/star_5.svg'">
                        <div style="flex-grow: 1;"></div>
                        <span style="margin-right: 15px; color: #8e8e8e;" class="text_hero">{{ dn.sum | number }}</span>
                    </div>
                </div>
                <div style="margin-bottom: 10px" class="border_tag" v-on:click.middle="go_page('donat',true)" v-on:click="go_page('donat',false)">
                    <span class="more_tag">еще...</span>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

import axios from "axios";

export default {
    name: "RighMenu",
    components: {

    },
    data() {
        return {
            access_token: localStorage.getItem('access') || null,
            new_mess: null,
            hashtag: [],
            donat: [],
            isLoadingHashtag: false,
            isLoadingDonat: false,
        }
    },
    methods: {

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

        get_donat(){
            axios.post(this.$hostname + '/api/home/donat/get_donat_top/', {

              },
          {
                headers: {
                    'Authorization': 'Bearer ' + this.access_token,
                }
            })
              .then(res => {
                  this.donat = res.data;
                  document.getElementById("div_load_d").style.display = "none"
                  this.isLoadingDonat = false
              })
        },

        hashtag_page(tag,middle){
            var url_page = '/hashtag/' + tag;
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

        hashtag_main(middle){
            var url_page = '/hashtag';
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

        get_hashtag(){
            axios.post(this.$hostname + '/api/home/hashtag/get_hashtag_right/', {

              },
          {
                headers: {
                    'Authorization': 'Bearer ' + this.access_token,
                }
            })
              .then(res => {
                  this.hashtag = res.data;
                  document.getElementById("div_load_h").style.display = "none"
                  this.isLoadingHashtag = false
              })
        },

    },
    created() {
        this.isLoadingHashtag = true
        this.isLoadingDonat = true
        this.get_hashtag()
        this.get_donat()
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

.star{
  margin: 16px 0px 0px 5px;
  }
.img_p{
    margin: 5px 0px 0px 5px;
    border-radius: 50%;
    width: 40px;
    height: 40px;
}

.border_hero{
    height: 50px;
    cursor: pointer;
}

.border_hero:hover {
    background: #1d1d1d; /* Цвет фона */
    /*text-decoration: none;*/
}
.text_hero{
    font-family: 'Open Sans', sans-serif;
    font-size: 17px;
    color: #ffffff;
    font-weight: lighter; /* Светлое начертание */
    cursor: pointer;
    margin: 12px 0px 5px 5px;
}

</style>