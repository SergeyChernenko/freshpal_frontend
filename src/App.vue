<template>
  <div id="app">


    <router-view :key="$route.fullPath"></router-view>


  </div>
</template>

<script>

  import axios from "axios";

  export default {
    name: '',
    components: {

    },

    data() {
      return{
      	access_token: localStorage.getItem('access') || null,
	  	refresh_token: localStorage.getItem('refresh') || null,
        last_activity: {
      	  count_like: null,
          count_sub: null,
          count_men: null,
        }
	  }
  	},
    methods:{
        get_new_tokens(){
			axios.post(this.url + '/api/token/refresh/', {
				refresh: this.refresh_token,
			  })
			  .then(response => {
				  this.access_token = response.data.access;
				  this.refresh_token = response.data.refresh;
				  localStorage.setItem('access',response.data.access);
				  localStorage.setItem('refresh',response.data.refresh);
				  this.check_token()
			  })
			  .catch(err => {
				  localStorage.removeItem('access');
				  localStorage.removeItem('refresh');
				  this.access_token = null;
				  this.refresh_token = null;
			  })
      	},
        check_token(){
			axios.post(this.$hostname + '/api/mainpage/user_profile/get_username/', {

              },
          {
                headers: {
                    'Authorization': 'Bearer ' + this.access_token,
                }
            })
              .then(res => {
                this.get_activity()
              })
			  .catch(err => {
				 this.get_new_tokens()
			  })
			},


      get_activity(){
            axios.post(this.$hostname + '/api/home/activity/get_activity/', {
              },
          {
                headers: {
                    'Authorization': 'Bearer ' + this.access_token,
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

    },
    created() {

      if (this.access_token == null){
        this.$router.push('/').catch(()=>{});
      }
      if (this.access_token != null){
        this.check_token()
      }

   }
  }
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ffffff;
}

/*#nav {*/
/*  !*padding: 30px;*!*/
/*}*/

/*#nav a {*/
/*  font-weight: bold;*/
/*  color: #fcfcfc;*/
/*}*/

/*#nav a.router-link-exact-active {*/
/*  color: #40ff40;*/
/*}*/
.sub_link{
    color: #ffffff !important;
    cursor: pointer !important;
}

.sub_link:hover {
    color: #ffffff !important;
    text-decoration: underline !important;
}

.link_hover {
    color: #2dba2d !important;

}

.link_hover:hover {
    color: #2dba2d !important;

}

.public_status{
    cursor: pointer;

}


.public_status:hover {
    background: #1d1d1d; /* Цвет фона */
    border-radius: 20px;
    /*text-decoration: none;*/
}

.button_style{
    width: 100%;
    padding: 8px 15px;
    text-align: center;
    background: #21b314;
    border: 0;
    color: #ffffff;
    border-radius: 15px;
    cursor: pointer;
}
.button_style:focus {
    outline: none !important;

}
.button_style:hover {
    background-color: #1ed013;

}

.button_style_cancel{
    width: 100%;
    padding: 8px 16px;
    text-align: center;
    background: #202020;
    border: 0;
    color: #ffffff;
    border-radius: 15px;
    cursor: pointer;
}
.button_style_cancel:focus {
    outline: none !important;

}
.button_style_cancel:hover {
    background-color: #232323;

}

.button_sub{
  width: auto;
  margin: 5px 5px 5px 0px;
}

textarea {
  color: #ffffff;
}

.background_main{
      background: #0c0c0c;
}
.input_mes{
    width: 100%;
    background: #191919; /* Цвет фона */
    padding: 15px; /* Поля вокруг текста */
    border-radius: 20px;
    border: 1px solid #303030;
    overflow-y: hidden;
}
.center {
    width: 1000px; /* Ширина элемента в пикселах */
    margin: auto; /* Выравниваем по центру */
    min-height: 100vh;
}
.home_style{
    width: 550px;
}
.right_menu{
    width: 250px;
 }

.left_menu{
    width: 200px;
 }

.left_menu_style{
  height:280px;
  margin-right:15px;
  background: #191919;
  border-radius: 20px;
  border: 1px solid #393939; /* Параметры границы */
}


.donate_style{
    height:200px;
    margin-left:15px;
    background: #191919;
    border-radius: 20px;
    border: 1px solid #393939; /* Параметры границы */
}

.border_st{
      margin-bottom: 15px;
      background: #191919; /* Цвет фона */
      padding: 15px; /* Поля вокруг текста */
      border-radius: 20px;
      border: 1px solid #303030;
}

.img_p{
    border-radius: 50%;
    width: 45px;
    height: 45px;
}

.username_p{
    margin: 10px 10px 10px 15px;
}

.img_input_m{
    margin: 10px 10px 10px 15px;
    border-radius: 50%;
    width: 45px;
    height: 45px;
}
.but_input_m{
    height: 40px;
    width: 120px;
    margin: 17px 10px 10px 10px;
}
.just-line-break {
  white-space: pre-line;
  /*margin: 3px;*/
}
.space-edit{
  display: flex;
  justify-content: space-between;
  height: 100%;
}
.edit_style{
    color: #2dba2d; /* Цвет текста */
    font-size: 12pt
}
.level_publ_style_true{
    color: #40ff40; /* Цвет текста */
    font-size: 12pt
}
.level_publ_style_false{
    color: #f9185f; /* Цвет текста */
    font-size: 12pt
}
.level_page_style_true{
    color: #40ff40; /* Цвет текста */
    font-size: 19pt
}
.level_page_style_false{
    color: #f9185f; /* Цвет текста */
    font-size: 20pt
}
.a_style{
    cursor: pointer;
}

.a_style:hover {
}

.a_style_red{
    color: #f9185f;
    cursor: pointer;
}


.edir_purl_style{
  margin-left:15px;
}

.select {
    margin-right: 5px;
    cursor: pointer;
    color: #ffffff; /* Цвет текста */
    font-weight: 600; /* Жирное начертание */
    font-size: 12pt
 }

.div_img_show_publ{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px
}

.flex_like_space{
    margin-top: 10px;
    display: flex;
    height: 20px;
}

.flex_like_space_once{
    margin-top: 10px;
    display: flex;
    height: 20px;
}

.like_once_style{
    display: flex;
    padding: 0px 8px 0px 8px;
    cursor: pointer;
}
.like_once_style:hover {
    background: #134b13; /* Цвет фона */
    border-radius: 10px;
    /*text-decoration: none;*/
}

.dislike_once_style{
    display: flex;
    padding: 0px 8px 0px 8px;
    cursor: pointer;
}
.dislike_once_style:hover {
    background: #441826; /* Цвет фона */
    border-radius: 10px;
    /*text-decoration: none;*/
}

.like_mainpage{
    display: flex;
    padding: 0px 8px 0px 8px;
    cursor: pointer;
}
.like_mainpage:hover {
    background: #134b13; /* Цвет фона */
    border-radius: 10px;
    /*text-decoration: none;*/
}

.dislike_mainpage{
    display: flex;
    padding: 0px 8px 0px 8px;
    cursor: pointer;
}
.dislike_mainpage:hover {
    background: #441826; /* Цвет фона */
    border-radius: 10px;
    /*text-decoration: none;*/
}

hr{
    border: none; /* Убираем границу */
    background-color: #303030; /* Цвет линии */
    /*color: #d9dbe0; !* Цвет линии для IE6-7 *!*/


  }


  .remove_publ{
      margin-top: 10px;
      /*font-family: Trebuchet MS; !* Гарнитура шрифта *!*/
      font-size: 14pt; /* Размер текста */
      font-weight: lighter; /* Светлое начертание */
      text-align: center;
      color: #ffffff;
  }

  .button_style_remove{
    width: 80px;
    height: 30px;
    text-align: center;
    border: 0;
    color: #ffffff;
    border-radius: 15px;
    cursor: pointer;
}
  .space_remove_publ{
    display: flex;
    justify-content: space-evenly;
  }

  .text_style_2{
      font-family: 'Open Sans', sans-serif;
      font-size: 14pt; /* Размер текста */
      font-weight: lighter; /* Светлое начертание */
      text-align: center;
      color: #ffffff;
  }

/*------- */
.highlights {
  color: #36d436;
}
.highlights:hover {
  color: #36d436;
}
/*------- */

.text_tag{

    color: #ffffff;
    font-weight: lighter; /* Светлое начертание */
    /*cursor: pointer;*/
    padding: 2px 0px 2px 15px;
}
count_tags{
   font-weight: lighter; /* Светлое начертание */
   cursor: pointer;
   padding: 2px 0px 2px 15px;
}
.border_tag{
    cursor: pointer;
}

.border_tag:hover {
    background: #1d1d1d; /* Цвет фона */
    /*text-decoration: none;*/
}

.tag_style{
    aspect-ratio: 4 / 1;
    margin-left: 15px;
    background: #191919;
    border-radius: 20px;
    border: 1px solid #393939; /* Параметры границы */
}

.more_tag{
    color: #2dba2d;
    margin-left:15px;
}

.p_tag{
    font-family: 'Open Sans', sans-serif;
    font-size: 17px; /* Размер текста */
    font-weight: lighter; /* Светлое начертание */
    text-align: center;
    color: #ffffff;
    margin-top:5px;
}

/*--------  */
.border_menu_header_1:hover {
    background: #232323; /* Цвет фона */
    border-radius: 15px 15px 0px 0px;
}

.border_menu_header_c:hover {
    background: #232323; /* Цвет фона */
    /*border-radius: 15px;*/
}
.border_menu_header_2:hover {
    background: #232323; /* Цвет фона */
    border-radius: 0px 0px 15px 15px;
}

.text_menu_header{
    padding: 8px 0px 0px 15px;
}
.div_image_head{
    position: absolute;

    width: 130px;
    height: 120px;
    margin-top: 3px;
    background: #191919; /* Цвет фона */
    /*padding: 15px; !* Поля вокруг текста *!*/
    border-radius: 15px;
    /*border: 1px solid #303030;*/
    box-shadow: 0px 0px 5px 0px #666666;
}
/*--------*/
.div_edit{
  position: absolute;
  width: 140px;
  height: 80px;
  margin-left: 35px;

  background: #191919; /* Цвет фона */
  /*padding: 15px; !* Поля вокруг текста *!*/
  border-radius: 15px;
  /*border: 1px solid #303030;*/
  box-shadow: 0px 0px 5px 0px #666666;
}

.div_type_comment{
  position: absolute;
  width: 150px;
  height: 80px;
  margin-left: 35px;

  background: #191919; /* Цвет фона */
  /*padding: 15px; !* Поля вокруг текста *!*/
  border-radius: 15px;
  /*border: 1px solid #303030;*/
  box-shadow: 0px 0px 5px 0px #666666;
}

/*---*/
.border_fow{
    height: 49px;
    margin-top: 12px;
    cursor: pointer;
}

.border_fow:hover {
    background: #1d1d1d; /* Цвет фона */

}

.img_fol{
    margin-left: 5px;
    border-radius: 50%;
    width: 40px;
    height: 40px;
}
/*---  */

.style_followers_win{

  width: 350px;
  height: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -150px 0 0 -165px;
  margin-bottom: 15px;
  background: #191919; /* Цвет фона */
  border-radius: 20px;
  box-shadow: 0px 0px 5px 0px #666666;
}

/*---    */
.header_start{
	font-family: 'Open Sans', sans-serif;
    font-size: 14pt; /* Размер текста */
    font-weight: lighter; /* Светлое начертание */
    text-align: center;
    color: #ffffff;
}
.input_style {
      width: 100%;
      padding: 8px 15px;
      border-radius: 15px;
      outline: none;
      border: 1px solid #393939;
      text-align: left;
      background-color: #272727;
      color: #ffffff;

    }
::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #ffffff;
  opacity: 1; /* Firefox */
}
/*---*/
.wrapper_input {
  position: relative;
  display: inline-block;
  width: 100%;
}
.emoji-invoker {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
  padding: 0;
  background: transparent;
  border: 0;
}
.emoji-invoker:hover {
  transform: scale(1.1);
}
.emoji-invoker > svg {
  fill: #191919;
}



.emoji-test55698 {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
  padding: 0;
  background: transparent;
  border: 0;
}


.emoji-picker {
  position: absolute;
  z-index: 1;
  font-family: Montserrat;
  border: 1px solid #191919;
  width: 15rem;
  height: 17rem;
  overflow: scroll;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 20px;
  background: #191919;
  /*box-shadow: 1px 1px 8px #272727;*/
  border: 1px solid #303030;
  overflow-x: hidden;
}
/*::-webkit-scrollbar {*/
/*    width: 0px;*/
/*    background: transparent; !* make scrollbar transparent *!*/
/*}*/

.emoji-picker__search {
  display: flex;
}
.emoji-picker__search > input {
  flex: 1;
  border-radius: 15px;
  border: 1px solid #393939;
  padding: 0.5rem 1rem;
  outline: none;
  height: 35px;
}
.emoji-picker h5 {
  margin-bottom: 0;
  color: #ffffff;
  text-transform: uppercase;
  font-size: 0.8rem;
  cursor: default;
}
.emoji-picker .emojis {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.emoji-picker .emojis:after {
  content: "";
  flex: auto;
}
.emoji-picker .emojis span {
  padding: 0.2rem;
  cursor: pointer;
  border-radius: 5px;
}
.emoji-picker .emojis span:hover {
  background: #ffffff;
  cursor: pointer;
  border-radius: 50%;
}
  /*---*/
  .border_tag_page:hover {
    background: #111111; /* Цвет фона */
    border-radius: 15px;
}

.text_tag_page{
    font-family: 'Open Sans', sans-serif;
    font-size: 17px;
    color: #ffffff;
    font-weight: lighter; /* Светлое начертание */
    cursor: pointer;
    padding: 5px 0px 5px 15px;
}

.text_count_page{
    font-size: 17px;
    color: #ffffff;
    font-weight: lighter; /* Светлое начертание */
    cursor: pointer;
    padding: 5px 15px 5px 0px;
}
  /*---*/
  .container {
  margin-top: 10px;
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
/* скрываем дефолтный флажок */
.container .check-highload {
  position: absolute;
  opacity: 0;
}
/* Создаем кастомный checkbox */
.highload2 {
    border-radius: 10px;
    position: absolute;
    top: 0;
    left: 0;
    height: 21px;
    width: 21px;
    background-color: #fafafa;
}
/* При наведении указателя мыши перекрашиваем */
.container:hover .check-highload ~ .highload2 {
  background-color: #fafafa;
}
/* Когда отмечен, то красим в зеленый цвет */
.container .check-highload:checked ~ .highload2 {
  background-color: #2dba2d;
}
/* Создаем когда отмечено (не видно, когда не отмечено) */
.highload2:after {
  content: "";
  position: absolute;
  display: none;
}
/* Показываем когда отмечен */
.container .check-highload:checked ~ .highload2:after {
  display: block;
}
/* Стили индикатора */
.container .highload2:after {
  left: 7px;
  top: 4px;
  width: 7px;
  height: 11px;
  border: solid #fafafa;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}
  /*---*/
.text_publ {
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
}

</style>
