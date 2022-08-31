<template>
  <div>
    <div class="reset_pas_div">
    <div style="text-align: center" class="div-style" v-if="this.access == true && this.result == false">
      <form @submit.prevent="restore_pas()">
              <p>
                <input class="input_style" id="password" v-model="password" placeholder="Новый пароль" type="password" name="password" required minlength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}">
              </p>
              <p>
                <input class="input_style" id="password_again" placeholder="Подтверждение пароля" type="password" v-model="password_again" name="password_again" required minlength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}">
              </p>
              <p>
                  <button class="button_style" type="submit">Изменить</button>
              </p>
          </form>
        <div v-if="this.err_password == true">
          <p style="color: #f9185f;">Пароли не совпадают.</p>
      </div>
      </div>
      <div style="text-align: center" class="div-style" v-if="this.result == true">
          <p>Пароль изменен.</p>
          <p><button class="button_style" type="submit" v-on:click="login()">Войти</button></p>
      </div>
      <div class="div-style" v-if="this.access == false">
          Нет данных о пользователе.
      </div>
  </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'


export default {
  name: 'startpage',
  components: {

  },

  data(){
      return{

        token: null,
        password: null,
        password_again: null,
        access: false,
        err_password: false,
        result: false,
      }
  },

  methods: {
    check_access(){

          axios.post(this.$hostname + '/api/startpage/restore_password/check_access/', {
              token: this.token,
          })
              .then(res => {
                  this.access = res.data
              })
              .catch(err => console.log(err))
      },
      restore_pas(){
        if (this.password == this.password_again) {
            this.err_password = false;
            axios.post(this.$hostname + '/api/startpage/restore_password/restore_pas/', {
                token: this.token,
                password: this.password,
            })
                .then(res => {
                    console.log(res);
                    this.result = true;
                })
                .catch(err => console.log(err))
        }
        else{
            this.err_password = true
        }
      },
      login(){
        this.$router.push('/')
      },

  },
  created() {
    this.token = this.$route.params.token;
    this.check_access()
  }
}
</script>

<style scoped>
    .div-style{
        width: 250px;
        top: 200px;
        margin: 200px auto;
    }
    .reset_pas_div{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #0c0c0c;
    }
</style>
