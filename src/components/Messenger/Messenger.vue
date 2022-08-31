<template>
    <div>
    <Header/>
    <div class="background_main">
        <div class="center">
            {{username}}
        </div>
    </div>
    </div>
</template>

<script>
import axios from "axios";
import Header from "../Other/Header"

  export default {
        name: "Inbox",

  components: {
     Header

  },

  data(){
      return{
        url: 'http://127.0.0.1:8000',
        access_token: localStorage.getItem('access') || null,
        username: null,
      }
  },

  methods: {

    user_check(){
      axios.post(this.url + '/api/mainpage/user_check/get_username/', {

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
      // this.access_token = localStorage.getItem('access');
      this.user_check()

    }

  }

</script>

<style scoped>
    .background_main{
          background: #0c0c0c;
      }
    .center {
        width: 1000px; /* Ширина элемента в пикселах */
        margin: auto; /* Выравниваем по центру */
        min-height: 100vh;
       }
</style>