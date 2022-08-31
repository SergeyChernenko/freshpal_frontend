<template>
  <div class="color_grey">
	<div style="height: 80px"></div>
	<div class="center">
		<div class="parent">
			<div class="logo">
				<img style="margin-top: 30px; width: 90%" :src="url+'/media/logo_company.svg'">
				<div style="margin-top: 50px">
					<p class="text_startpage">Социальная сеть, с новой, обдуманной системой оценки пользователей.
						У каждого пользователя, у каждой публикации есть свой социальный рейтинг.
						Чем больше тебя лайкают, тем больше растет твой рейтинг и твоя ценность лайка.</p>
					<span class="text_startpage">- Фото пуликации, комментарии, лайки, дизлайки.</span>
					<br>
					<span class="text_startpage">- Лента публикаций от пользователей, на которых вы подписаны.</span>
					<br>
					<span class="text_startpage">- Общая лента публикаций</span>
					<br>
					<span class="text_startpage">- Поиск пользователей и публикаций по хештегам.</span>
					<br>
					<span class="text_startpage">- Уведомления о лайках, подписках и упоминаниях.</span>
					<br>
					<span class="text_startpage">- Отсутствие запретных тем для публикаций и обсуждений. Полная свобода слова!</span>
					<br>
					<span class="text_startpage">- Удобный фильтр для нецензурных слов и "взрослого" контента.</span>
					<br>
					<span class="text_startpage">- И многое другое в разработке</span>
					<p style="margin-top: 10px" class="text_startpage">Нас уже - {{count_users}}. Так чего же ты ждешь? Присоединяйся скорее! 😎</p>
				</div>
			</div>


			<div>
				<div class="login">
					<Authorization/>
				</div>
				<div class="register">
					<Registration/>
				</div>
			</div>

		</div>
	</div>



  </div>



</template>

<script>
// @ is an alias to /src
import axios from "axios";



export default {
  name: 'Home',
  components: {

  },

	data() {
      return{
      	access_token: localStorage.getItem('access') || null,
      	url: this.$hostname,
		username: null,
		count_users: null,
	  }
  	},

	methods:{


  		get_count_users(){
  			axios.post(this.$hostname + '/api/startpage/users/count/', {
          })
              .then(res => {
                  this.count_users = res.data;

              })
		},

        get_username(){
			axios.post(this.$hostname + '/api/mainpage/user_profile/get_username/', {
			},{
				headers: {
					'Authorization': 'Bearer ' + this.access_token,
				}
			})
			  .then(response => {
			  	this.username = response.data
				var url_page = '/'+ this.username.username;
				this.$router.push(url_page)
			  })
			  .catch(err => {
			  })
			},

	},

	created(){

  		this.get_count_users()
		if (this.access_token != null){
			this.get_username()
		}

	},
}
</script>

<style scoped>

	.color_grey{
		background: #0c0c0c;

	}
	.center {
		width: 1000px; /* Ширина элемента в пикселах */
		margin: auto; /* Выравниваем по центру */
		min-height: 100vh;
	}

	.logo{
		width: 600px;
		display: flex;
  		flex-flow: column;
	}

    .login{
		width: 270px;
		margin-bottom: 20px;
		padding: 20px;
        background: #191919;
		border-radius: 20px;
		box-shadow: 0px 0px 5px 0px #666666;
		aspect-ratio: 4 / 3;
    }

	.register{
		width: 270px;
        margin-bottom: 20px;
		padding: 20px;
        aspect-ratio: 4 / 1;
        background: #191919;
		border-radius: 20px;
		box-shadow: 0px 0px 5px 0px #666666;
    }


	.parent {
	  display: flex;
	  justify-content: space-between;
	  height: 100%;
	}

	.text_startpage{
		font-family: 'Open Sans', sans-serif;
		font-size: 14pt; /* Размер текста */
		font-weight: lighter; /* Светлое начертание */
		color: #fafafa;
	}


</style>
