<template>
    <div>
        <div style="margin-top: 10px">
            <div v-for="dn in donat">
                <div style="margin-right: 100px; margin-left: 100px">
                    <div style="display: flex; margin-bottom: 5px; cursor: pointer" v-on:click.middle="go_page(dn.username__username, true)" v-on:click="go_page(dn.username__username, false)" class="border_hero">
                        <img v-if="dn.username_id != null" class="img_p" :src="$hostname+'/media/profile/'+dn.username_id+'/'+dn.username_id+'.png'">
                        <span class="text_hero">{{dn.username__username | truncate(24, '...')}}</span>
                        <div style="flex-grow: 1;"></div>
                        <span class="text_hero">{{dn.sum | number }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import axios from "axios";

export default {
    name: "Donat",
    components: {

    },
    data() {
        return {
            access_token: localStorage.getItem('access') || null,
            donat: [],

        }
    },
    props: {
        username: Object,
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
            axios.post(this.$hostname + '/api/home/donat/get_donat_all/', {

              },
          {
                headers: {
                    'Authorization': 'Bearer ' + this.access_token,
                }
            })
              .then(res => {
                  this.donat = res.data;
              })
        },



    },
    created() {
        document.title = 'Донатеры'
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

.img_p{
    margin: 5px 0px 0px 5px;
    border-radius: 50%;
    width: 40px;
    height: 40px;
}

.border_hero{
    border-radius: 20px;
    height: 50px;
    cursor: pointer;
}

.border_hero:hover {
    background: #111111; /* Цвет фона */
    /*text-decoration: none;*/
}
.text_hero{
    font-family: 'Open Sans', sans-serif;
    font-size: 17px;
    color: #ffffff;
    font-weight: lighter; /* Светлое начертание */
    cursor: pointer;
    padding: 12px 15px 5px 10px;
}


</style>