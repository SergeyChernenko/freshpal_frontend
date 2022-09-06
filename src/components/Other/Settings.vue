<template>
    <div>
        <p class="p_dis">Добавить описание</p>
        <div class="wrapper_input">
            <textarea-autosize
              placeholder="Расскажите о себе..."
              class="input_mes"
              v-model="description"
              :maxlength ="limit"
              :min-height="30"
              :max-height="250"
              v-on:input="lineCount"
             />
            <emoji-picker @emoji="append" :search="emoji_mes">
              <button
                class="emoji-invoker"
                slot="emoji-invoker"
                slot-scope="{ events: { click: clickEvent } }"
                @click.stop="clickEvent"
              >

                    <p><span class="select">&#128512;</span></p>

              </button>

              <div slot="emoji-picker" slot-scope="{ emojis, insert, display }">
                <div class="emoji-picker" :style="{left: display.x-680 + 'px'}">
                  <div style="margin-bottom: 10px" class="emoji-picker__search">
                    <input class="input_style"  type="text" v-model="emoji_mes" v-focus>
                  </div>
                  <div>
                    <div v-for="(emojiGroup, category) in emojis" :key="category">
                      <h5>{{ category }}</h5>
                      <div class="emojis">
                        <span
                          v-for="(emoji, emojiName) in emojiGroup"
                          :key="emojiName"
                          @click="insert(emoji)"
                          :title="emojiName"
                        >{{ emoji }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </emoji-picker>
        </div>
        <div style="display: flex">
            <div style="flex-grow: 1;"></div>
            <div style="margin: 15px 15px 0px 0px">
                <span class="message-counter">{{ description.length}} / {{limit}}</span>
            </div>
            <span v-if="result_des == true" style="margin: 15px 10px 0px 0px; color: #40ff40;">Сохранено</span>
            <button class="button_style child-active" v-on:click="save_description">Сохранить</button>
        </div>
        <hr>
        <p class="p_dis">Фильтр публикаций</p>
        Публикации могут содержать контент, не предназначенный для большинства. А именно нецензурные слова и материалы 18+.
        Данные публикации не появляются в ленте и в популярных за месяц. Но это можно изменить, настроив фильтр.
        <label class="container"><div style="margin-left: 15px">Нецензурные слова</div>
          <input type="checkbox" checked="checked" class="check-highload" id="censor" value="censor" v-model="filter" v-on:change="filter_censor">
          <span class="highload2"></span>
        </label>
        <label class="container"><div style="margin-left: 15px">Материалы 18+</div>
          <input type="checkbox" checked="checked" class="check-highload" id="nude" value="nude"  v-model="filter" v-on:change="filter_censor">
          <span class="highload2"></span>
        </label>
        <hr>
        <p class="p_dis">Изменить пароль</p>
        <div style="width: 100%">
            <div class="center">
                <form @submit.prevent="check_pass">
                    <p><input class="input_style" id="old_password" placeholder="Старый пароль" type="password" v-model="old_password" name="password" required minlength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"></p>
                    <p><input class="input_style" id="new_password" placeholder="Новый пароль" type="password" v-model="new_password" name="password" required minlength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"></p>
                    <p><input class="input_style" id="new_password_again" placeholder="Подтверждение пароля" type="password" v-model="new_password_again" name="password" required minlength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"></p>
                    <p><button class="button_style" type="submit">Сохранить</button></p>
                </form>
                <p v-if="res_old_password == false">Старый пароль не совпадает</p>
                <p v-if="res_new_password == false">Новые пароли не совпадают</p>
                <p v-if="res_new_password == true">Пароль изменен</p>
            </div>
        </div>
    </div>
</template>

<script>

import axios from "axios";
import EmojiPicker from 'vue-emoji-picker'
import Vue from "vue";
Vue.use(EmojiPicker)

export default {
    name: "Settings",
    components: {
        EmojiPicker

    },
    data() {
        return {
            access_token: localStorage.getItem('access') || null,
            description: '',
            result_des: false,
            filter: [],
            old_password: null,
            new_password: null,
            new_password_again: null,
            res_old_password : null,
            res_new_password: null,
            emoji_mes: '',
            limit: 400,
        }
    },
    props: {
        username: Object,
    },
    directives: {
        focus: {
          inserted(el) {
            el.focus()
          },
        },
      },
    methods: {

        lineCount() {
             var line =  this.description.length ? this.description.split(/\r\n|\r|\n/).length : 0
             if(line > 15){
                 this.description = this.description.slice(0, -1);
             }
        },

        append(emoji) {
          this.description += emoji
        },

        change_pass(){
            if ( this.res_old_password == true ) {
                if(this.new_password != this.new_password_again){
                    this.res_new_password = false
                }
                else{
                    this.res_new_password = null
                    axios.post(this.$hostname + '/api/mainpage/user_profile/change_pass/', {
                        password: this.new_password
                      },
              {
                    headers: {
                        'Authorization': 'Bearer ' + this.access_token,
                    }
                    })
                      .then(res => {
                          this.res_new_password = res.data
                  })
                }

            } else {
                setTimeout( this.timeout, 100);
            }
        },

        check_pass(){
            if (this.old_password != null){
                axios.post(this.$hostname + '/api/mainpage/user_profile/check_pass/', {
                    password: this.old_password
                  },
              {
                    headers: {
                        'Authorization': 'Bearer ' + this.access_token,
                    }
                })
                  .then(res => {
                      this.res_old_password = res.data
                      this.change_pass()
              })
          }
        },

        filter_censor(){
          axios.post(this.$hostname + '/api/mainpage/user_profile/edit_censor/', {
              filter: this.filter
              },
          {
                headers: {
                    'Authorization': 'Bearer ' + this.access_token,
                }
            })
              .then(res => {
          })
        },

        get_data(){
            axios.post(this.$hostname + '/api/mainpage/user_profile/get_data_settings/', {
              },
          {
                headers: {
                    'Authorization': 'Bearer ' + this.access_token,
                }
            })
              .then(res => {
                this.description = res.data[0].description
                if (res.data[0].censor == true){
                    this.filter.push('censor')
                }
                if (res.data[0].nude == true){
                    this.filter.push('nude')
                }
              })
        },

        save_description(){
            axios.post(this.$hostname + '/api/mainpage/user_profile/description_save/', {
                description: this.description
              },
          {
                headers: {
                    'Authorization': 'Bearer ' + this.access_token,
                }
            })
              .then(res => {
                this.result_des = res.data
              })
        }

    },
    created() {
        document.title = 'Настройки'
        this.get_data()
    }
}
</script>

<style scoped>

.p_dis{
    font-family: 'Open Sans', sans-serif;
   font-size: 18px; /* Размер текста */
    text-align: center;
    color: #fafafa;
    margin-top:10px;
}
.child-active {
    margin-top: 5px;
  flex-basis: 22%;
}




.center {
  margin: auto;
  width: 300px;

}

</style>