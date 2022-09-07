<template>
    <div>
        <div class="support_div">
            <div class="div_style text"><span style="color: #36d436;">Что такое FreshPal?</span> Это социальная сеть, где мы пошли на риск и ввели новую систему оценки пользователей.</div>

            <div class="div_style">Все остальные социальные сети убирают дизлайки, пытаются угодить каждому пользователю, популяризируя равноправие.
            Но все мы знаем, что без конкуренции, мы бы не были там, где сейчас находимся.</div>

            <div class="div_style">Если ты делаешь хороший контент, хочешь выразить свои мысли, не боишься критики, FreshPal - это место, где тебе будут рады!
            Чем больше тебя лайкают, тем больше растет твой уровень и ценность твоего лайка!</div>
            <div class="div_style">Сейчас FreshPal только в начале своего пути. В будущем мы планируем добавить множество дополнительных функций,
            личные сообщения и конечно же, мобильное приложение. Мы полностью открыты к ваших идеям и критике. Попытаемся сделать самую народную сеть.
            Не без вашей поддержки, конечно!</div>
            <div class="div_style"><a style="color: #36d436;" href="/nexus">Моя страница</a> в FreshPal. Мой личный телеграм - <a style="color: #36d436;" href="https://t.me/nexusst">nexusst.</a>
            Все новости будут дублироваться в <a style="color: #36d436;" href="https://t.me/freshpal">телеграм канале.</a></div>
            <p style="margin-top: 30px" class="p_dis">Наша команда</p>
            <div class="team_style">
                <img style="border-radius: 50%" :src="$hostname+'/media/profile/1/1.png'">
                <div style="margin-left: 30px">
                    <div style="margin-top: 30px" class="text">Черненко Сергей</div>
                    <div style="margin-top: 5px" class="text">Генеральный директор FreshPal</div>
                    <div style="margin-top: 5px" class="text">Главный разработчик</div>
                </div>
            </div>
            <div class="team_style">
                <img style="border-radius: 50%" :src="$hostname+'/media/marina.png'">
                <div style="margin-left: 30px">
                    <div style="margin-top: 40px" class="text">Ковалькова Марина</div>
                    <div style="margin-top: 5px" class="text">Партнер по продвижению FreshPal</div>

                </div>
            </div>

        </div>
    </div>
</template>

<script>

import axios from "axios";

export default {
    name: "Support",
    components: {

    },
    data() {
        return {
            access_token: localStorage.getItem('access') || null,


        }
    },
    props: {
        username: Object,
    },
    methods: {




    },
    created() {
        document.title = 'О нас'
    }
}
</script>

<style scoped>
.support_div{
    margin-top: 20px;
    width: 540px;
}
.div_style{
    margin: 0px 0px 10px 0px;
}
.text{
    font-family: 'Open Sans', sans-serif;
    font-size: 17px; /* Размер текста */
    font-weight: lighter; /* Светлое начертание */

}
.p_dis{
    font-family: 'Open Sans', sans-serif;
   font-size: 18px; /* Размер текста */
    text-align: center;
    color: #fafafa;
    margin-top:10px;
}
.team_style{
    display: flex;
    margin: 30px 0px 20px 10px;
}

</style>