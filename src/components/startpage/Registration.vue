<template>
  <div style="text-align: center">
    <p class="header_start">Впервые тут?</p>
    <div v-if="step == 1">
        <form @submit.prevent="check_data()">
            <p>
              <input class="input_style" id="username" required v-model="username" placeholder="Имя пользователя" name="username" minlength="3" maxlength="20" pattern="[A-Za-z0-9]+">
            </p>
            <p>
                <input class="input_style" id="email" type="email" required v-model="email" name="email" placeholder="E-mail">
            </p>

            <div style="margin-left: 15px" class="sex_style">
                <div>
                    <label required class="container"><img style="margin-left: 15px; margin-bottom: 2px" class="icon_style" width="17" height="17" :src="$hostname+'/media/male.svg'">
                      <input required type="radio" class="check-highload" name="sex" value="male" v-model="sex" required>
                      <span class="highload2"></span>
                    </label>
                </div>
                <div>
                    <label required class="container"><img style="margin-left: 15px; margin-bottom: 2px" class="icon_style" width="19" height="19" :src="$hostname+'/media/female.svg'">
                      <input type="radio" class="check-highload" name="sex" value="female"  v-model="sex">
                      <span class="highload2"></span>
                    </label>
                </div>
            </div>
<!--                <div style="flex-grow: 1;"></div>-->
<!--                <span class="hovertext" data-hover="Зачем указывать пол? Есть несколько идей, которые можно реализовать в будущем. Ваш пол не будет виден в профиле.">-->
<!--                    <p style="margin-top: 8px; margin-right: 3px">&#63;</p>-->
<!--                </span>-->

            <div style="margin-bottom: 7px">
                Дата рождения
            </div>

            <p>
                <input class="input_style" id="date" type="date" required v-model="birthday" name="date">
            </p>
            <p>
                <button class="button_style" type="submit">Далее</button>
            </p>
        </form>

    </div>
      <p style="color: #f9185f;" v-if="check_data_res[1] == false">Данная почта занята.</p>
      <p style="color: #f9185f;" v-if="check_data_res[0] == false">Имя пользователя занято.</p>

    <div v-if="step == 2">
        <form @submit.prevent="check_code()">
            <p>
                <input class="input_style" id="code" v-model="code" placeholder="Код" name="code" required>
            </p>
            <p>
                <button class="button_style" type="submit">Далее</button>
            </p>
        </form>
        <p class="register_color" v-if="check_data_res[1] == true">Введите код, отправленный на вашу почту</p>

    </div>
    <p style="color: #f9185f;" v-if="check_code_res == 404">Неправильный код</p>
    <p style="color: #f9185f;" v-if="check_code_res == 502">Сбой сервера. Попробуйте попытку позже.</p>
    <div v-if="step == 3">
        <form @submit.prevent="register()">

            <p>
              <input class="input_style" id="password" placeholder="Пароль" type="password" v-model="password" name="password" required minlength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}">
            </p>
            <p>
              <input class="input_style" id="password_again" placeholder="Подтверждение пароля" type="password" v-model="password_again" name="password_again" required minlength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}">
            </p>
            <p>
                <button class="button_style" type="submit">Регистрация</button>
            </p>
        </form>
        <p style="color: #f9185f;"v-if="this.err_password == true">Пароли не совпадают.</p>
    </div>

    <p class="register_color" v-if="step == 4">Регистрация завершена.</p>

  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'

import vueSelect from 'vue-select'
//import { TokenService } from './storage/TokenService.js'

export default {
  name: 'Registration',
  components: {
      vueSelect
  },
  data() {
      return{
          username: null,
          password: null,
          password_again: null,
          email: null,
          birthday: null,
          code: null,
          step: 1,
          check_code_res: null,
          check_data_res: Array,
          err_password: false,
          username_id: null,
          sex: null,
      }
  },
   methods:{
      check_data(){
          this.check_code_res == null;
          axios.post(this.$hostname + '/api/startpage/verification/check_data/', {
              email: this.email.toLowerCase(),
              username: this.username.toLowerCase(),
          })
              .then(res => {
                  this.check_data_res = res.data;
                  this.check_code_res = null;
                  this.send_email()
              })

      },

       send_email(){
          if (this.check_data_res[0] == true && this.check_data_res[1] == true){
              axios.post(this.$hostname + '/api/startpage/verification/send_code/', {
              email: this.email.toLowerCase(),
          })
              .then(res => {
                  this.step = 2;
              })
          }
       },

      check_code(){
          axios.post(this.$hostname + '/api/startpage/verification/check_code/', {
              email: this.email.toLowerCase(),
              code: this.code,
          })
          .then(res => {
              this.check_code_res = res.data
              if (this.check_code_res == 200){
                  this.step = 3;
              }
              if (this.check_code_res == 404){
                  this.step = 1;
              }
          })

      },

      register(){
          if (this.password == this.password_again) {
              this.err_password = false;
              axios.post(this.$hostname + '/api/startpage/users/', {
                username: this.username.toLowerCase(),
                password: this.password,
                email: this.email.toLowerCase(),

              })
              .then(res => {
                  this.step = 4;
                  this.data_save();
              });


          }
          else{
               this.err_password = true
          }
      },
      data_save(){
          axios.post(this.$hostname + '/api/startpage/registration/data_save/', {
                username: this.username.toLowerCase(),
                birthday: this.birthday,
                sex: this.sex,
              })
              .then(res => {
              });
            },


       },
   created() {


      },


}
</script>

<style scoped>
body {
	padding: 5px;
	font-size: 20px;
}

input[type="number"] {
	width: 50px;

}
    .register_color{
        color: #d9dbe0;
    }

    .date_format{
        display: flex;
    }

    .sex_style {
      display: flex;
          justify-content: space-around;


      height: 100%;
    }

.hovertext {
  position: relative;

}

.hovertext:before {
  content: attr(data-hover);
  visibility: hidden;
  opacity: 0;
  width: 200px;
  background-color: #191919;
    border: 1px solid #303030;
  color: #fff;
  padding: 5px;
  border-radius: 15px;
  text-align: center;
  transition: opacity 1s ease-in-out;

  position: absolute;
  z-index: 1;
  left: 0;
  top: 50%;
}

.hovertext:hover:before {
  opacity: 1;
  visibility: visible;
}

</style>
