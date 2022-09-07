<template>
    <div>
        <div class="support_div">
            <div class="div_style text">Привет, дорогой пользователь FreshPal. Данная страница добавлена для тех, кому важно дальнейшее развитие проекта.
            Мы работаем без внешней поддержки, все своими силами. Ни от кого не зависим! Что дает полную свободу слова.</div>
            <div class="div_style text">Если вы хотите поддержать нашу команду, реквизиты оставлены внизу.</div>
            <div class="div_style text"><span style="color: #36d436;">Сбербанк - 4279380020992840 (сбп подключен)</span></div>
            <div class="div_style text">В качестве нашей благодарности, мы внесем вас в список донатеров FreshPal.
            5 самых щедрых будут отображаться в отдельном компоненте, на всех страницах сайта.
            Это позволит многим узнать о наших героях! Также будет отдельная страница со всеми донатерами.</div>
            <div class="div_style text">Чтобы мы узнали, от кого пришел донат, просим вас указать ваш id в сообщении при отправки пожертвования.</div>
            <div class="div_style text">Минимальная сумма - 100 рублей. И вы точно попадете в список донатеров!</div>
            <div class="div_style text">Донаты по 1 рублю рассматриваться не будут. &#128522; Иначе будет производственный ад!</div>
            <div class="div_style text"><span style="color: #36d436;">Ваш id - {{username.username_id}}</span></div>
            <div class="div_style text">Для пользователей криптовалюты, для кого важна анонимность, также оставляем кошельки.</div>
            <div class="div_style_cr text"><span style="color: #36d436;">1J6VrpoKDaoRLjXosiWq2HSUN8qtbpCJqL</span> &mdash; BTC (сеть - BTC)</div>
            <div class="div_style_cr text"><span style="color: #36d436;">0x15262def137fa6c87d62fc6aa3a159451aa33e84</span> &mdash; ETH,USDT (сеть - ERC20)</div>
            <div class="div_style_cr text"><span style="color: #36d436;">TCPeDrjj2w6cu6vKZWBJtsLnZ3hSu6fQjz</span> &mdash; USDT (сеть - TRC20)</div>
            <div class="div_style_cr text"><span style="color: #36d436;">0x15262def137fa6c87d62fc6aa3a159451aa33e84</span> &mdash; USDT (сеть - BEP20)</div>
            <div class="div_style_cr text"><span style="color: #36d436;">EQDbL9Vw3rf3en0Lo0_MUvrq8J_-zX5AFw3FYZguRCw8FBAc</span> &mdash; Toncoin</div>
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
        document.title = 'Поддержка'
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
.div_style_cr{
    margin: 0px 0px 5px 0px;
}
.text{
    font-family: 'Open Sans', sans-serif;
    font-size: 17px; /* Размер текста */
    font-weight: lighter; /* Светлое начертание */

}

</style>