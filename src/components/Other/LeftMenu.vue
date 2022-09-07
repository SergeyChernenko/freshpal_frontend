<template>
    <div v-if="username != null" style="margin-top: 15px; width: 180px">
        <div class="component_style" v-on:click.middle="go_page(username.username, true)" v-on:click="go_page(username.username, false)">
            <div v-if="url == username.username" class="div_icon"><img class="icon_style" width="21" height="21" :src="$hostname+'/media/profile_gr.svg'"></div>
            <div v-if="url != username.username" class="div_icon"><img class="icon_style" width="21" height="21" :src="$hostname+'/media/profile.svg'"></div>
            <p v-if="url == username.username" style="color: #36d436;" class="text">Профиль</p>
            <p v-if="url != username.username" class="text">Профиль</p>
        </div>
        <div class="component_style" v-on:click.middle="go_page('new', true)" v-on:click="go_page('sub', false)">
            <div v-if="url == 'sub'" class="div_icon"><img class="icon_style" width="19" height="19" :src="$hostname+'/media/news_gr.svg'"></div>
            <div v-if="url != 'sub'" class="div_icon"><img class="icon_style" width="19" height="19" :src="$hostname+'/media/news.svg'"></div>
            <p v-if="url == 'sub'" style="color: #36d436;"  class="text">Подписки</p>
            <p v-if="url != 'sub'" class="text">Подписки</p>
        </div>
        <div class="component_style" v-on:click.middle="go_page('rec', true)" v-on:click="go_page('rec', false)">
            <div v-if="url == 'rec'" class="div_icon"><img class="icon_style" width="22" height="22" :src="$hostname+'/media/magni_gr.svg'"></div>
            <div v-if="url != 'rec'" class="div_icon"><img class="icon_style" width="22" height="22" :src="$hostname+'/media/magni.svg'"></div>
            <p v-if="url == 'rec'" style="color: #36d436;" class="text">Лента</p>
            <p v-if="url != 'rec'" class="text">Лента</p>
        </div>
        <div class="component_style" v-on:click.middle="go_page('activity', true)" v-on:click="go_page('activity', false)">
            <div v-if="url == 'activity'" class="div_icon"><img class="icon_style" width="21" height="21" :src="$hostname+'/media/activity_gr.svg'"></div>
            <div v-if="url != 'activity'" class="div_icon"><img class="icon_style" width="21" height="21" :src="$hostname+'/media/activity.svg'"></div>
            <p v-if="url == 'activity'" style="color: #36d436;" class="text">Активность</p>
            <p style="white-space: nowrap;" v-if="url != 'activity'" class="text">Активность <span v-if="count_activity != 0 && isNaN(count_activity) == false" style="color: #36d436;">{{count_activity}}</span></p>
        </div>
        <div class="component_style" v-on:click.middle="go_page('hashtag', true)" v-on:click="go_page('hashtag', false)">
            <div v-if="url == 'hashtag'" class="div_icon"><img class="icon_style" width="21" height="21" :src="$hostname+'/media/hashtag_gr.svg'"></div>
            <div v-if="url != 'hashtag'" class="div_icon"><img class="icon_style" width="21" height="21" :src="$hostname+'/media/hashtag.svg'"></div>
            <p v-if="url == 'hashtag'" style="color: #36d436;" class="text">Хэштеги</p>
            <p v-if="url != 'hashtag'" class="text">Хэштеги</p>
        </div>
        <div class="component_style" v-on:click.middle="go_page('settings', true)" v-on:click="go_page('settings', false)">
            <div v-if="url == 'settings'" class="div_icon"><img class="icon_style" width="19" height="19" :src="$hostname+'/media/settings_gr.svg'"></div>
            <div v-if="url != 'settings'" class="div_icon"><img class="icon_style" width="19" height="19" :src="$hostname+'/media/settings.svg'"></div>
            <p v-if="url == 'settings'" style="color: #36d436;" class="text">Настройки</p>
            <p v-if="url != 'settings'" class="text">Настройки</p>
        </div>
        <div class="component_style" v-on:click.middle="go_page('support', true)" v-on:click="go_page('support', false)">
            <div v-if="url == 'support'" class="div_icon"><img class="icon_style" width="22" height="22" :src="$hostname+'/media/love_gr.svg'"></div>
            <div v-if="url != 'support'" class="div_icon"><img class="icon_style" width="22" height="22" :src="$hostname+'/media/love.svg'"></div>
            <p v-if="url == 'support'" style="color: #36d436;" class="text">Поддержка</p>
            <p v-if="url != 'support'" class="text">Поддержка</p>
        </div>
        <div class="component_style" v-on:click.middle="go_page('team', true)" v-on:click="go_page('team', false)">
            <div v-if="url == 'team'" class="div_icon"><img class="icon_style" width="22" height="22" :src="$hostname+'/media/team_gr.svg'"></div>
            <div v-if="url != 'team'" class="div_icon"><img class="icon_style" width="22" height="22" :src="$hostname+'/media/team.svg'"></div>
            <p v-if="url == 'team'" style="color: #36d436;" class="text">О нас</p>
            <p v-if="url != 'team'" class="text">О нас</p>
        </div>
    </div>
</template>

<script>

import axios from "axios";

export default {
    name: "LeftMenu",
    components: {

    },
    data() {
        return {
            url: window.location + '',
            access_token: localStorage.getItem('access') || null,
            username_url: this.$route.params.username,
            count_activity: null,
        }
    },
    props: {
        username: Object,
    },
    methods: {

        go_page(element,middle){
            var url_page = '/' + element;
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

        url_get(){
            let arr = new Array();
            arr = this.url.split('/')
            if (arr.length == 4){
                this.url = arr[arr.length-1]
            }
            if (arr.length == 5){
                this.url = arr[arr.length-2]
            }
        },

        get_count(){
            if (this.$store.getters.getCount != null){
                this.count_activity = this.$store.getters.getCount
            }
            else{
                setTimeout( this.get_count, 100);
            }
        }

    },
    created() {
        this.url_get()
        this.get_count();
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

<style scoped>

.text{
    font-family: 'Open Sans', sans-serif;
    font-size: 17px; /* Размер текста */
    font-weight: lighter; /* Светлое начертание */
    cursor: pointer;
    padding: 5px 0px 0px 0px;
}

.component_style{
    display: flex;
    cursor: pointer;
    height: 35px;
    width: 150px;
    margin-top: 10px;
}


.component_style:hover {
    background: #111111; /* Цвет фона */
    border-radius: 30px;
    /*text-decoration: none;*/
}

.icon_style{
    margin: 7px 10px 0px 10px;
}

.div_icon{
 width: 42px;
}

</style>