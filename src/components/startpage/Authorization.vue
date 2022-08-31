<template>
  <div style="text-align: center">
    <p class="header_start">Вход</p>
    <div v-if="authorization_check == true">
        <form @submit.prevent="login(true)">
            <p>
              <input class="input_style" id="username" v-model="username" placeholder="Имя пользователя" name="username" required pattern="[A-Za-z0-9]+">
            </p>
            <p>
              <input class="input_style"  id="password" placeholder="Пароль" type="password" v-model="password" name="password" required minlength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}">
            </p>
            <p>
                <button class="button_style" type="submit">Войти</button>
            </p>
        </form>
    </div>

     <div v-if="authorization_check == false">
         <form @submit.prevent="get_link()">
            <p>
              <input class="input_style"  id="email" v-model="email" name="email" required placeholder="Почта">
            </p>
            <p>
                <button class="button_style" type="submit">Восстановить пароль</button>
            </p>

        </form>
         <p>
                <button class="button_style" v-on:click="back_login()">Назад</button>
         </p>
    </div>
    <div v-if="email_mes == true" class="email_mes_st">
        Если данный e-mail есть в базе, то на него будет отправлено письмо для восстановления пароля.
    </div>
    <div v-if="authorization_check == true">
        <p><a class="a_style" v-on:click="authorization_switch(false)">Забыли пароль?</a></p>
    </div>
    <p style="color: #f9185f;" v-if="this.err_pas == true">
        Неверный логин или пароль.
    </p>

  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'


export default {
  name: 'Authorization',
  components: {

  },
  data() {
      return{

          username: null,
          password: null,
          email: null,
          authorization_check: true,
          get_name: null,
          err_pas: false,
          email_mes: false,
          last_activity: {
              count_like: null,
              count_sub: null,
              count_men: null,
            }
      }
  },
   methods:{

      get_activity(){
          var access_token = localStorage.getItem('access')
            axios.post(this.$hostname + '/api/home/activity/get_activity/', {
              },
          {
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                }
            })
              .then(res => {
                  this.last_activity = res.data
                  this.save_data_activity()
              });
        },

      save_data_activity(){
        this.$store.dispatch('fetchCount',this.last_activity.count_like+this.last_activity.count_sub+this.last_activity.count_men)
        this.$store.dispatch('fetchLike',this.last_activity.count_like)
        this.$store.dispatch('fetchSub',this.last_activity.count_sub)
        this.$store.dispatch('fetchMention',this.last_activity.count_men)
      },


      authorization_switch(flag){
          this.authorization_check = flag;
          this.err_pas = false;
      },
      login(flag){
          this.authorization_check = flag;
          axios.post(this.$hostname + '/api/token/', {
            username: this.username.toLowerCase(),
            password: this.password,
          })
          .then(response => {
              localStorage.setItem('access',response.data.access);
              localStorage.setItem('refresh',response.data.refresh);
			  var url_page = '/'+ this.username;
			  this.get_activity()
			  this.$router.push(url_page)
              this.err_pas = false;
          })
          .catch(err => {
              this.err_pas = true;
              localStorage.removeItem('access');
              localStorage.removeItem('refresh');
          })
      },
      logout(){
          localStorage.removeItem('access');
          localStorage.removeItem('refresh');
          this.get_name = null;
      },
      back_login(){
          this.authorization_check = true;
          this.email_mes = false;
      },
      get_link(){
          this.email_mes = true;
          axios.post(this.$hostname + '/api/startpage/restore_password/get_link/', {
              email: this.email,
          })
              .then(res => {
                  console.log(res)
              })
              .catch(err => console.log(err))
      },
   },
   created() {
   }
}
</script>

<style>

    .email_mes_st{
        width: 230px
    }

</style>

