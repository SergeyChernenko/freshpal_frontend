<template>
    <div>
        <div class="support_div">
            Привет, дорогой пользователь FreshPal. Данная страница добавлена для тех, кому важно дальнейшее развитие проекта.
            Мы работаем без внешней поддержки, все своими силами. Ни от кого не зависим! Что дает полную свободу слова.
            <br>
            <a style="color: #36d436;" href="/nexus">Моя страница</a> в FreshPal. Мой личный телеграм - <a style="color: #36d436;" href="https://t.me/nexusst">nexusst.</a>
            Я максимально открыт к вашим сообщениям. &#128522;
            Все новости будут дублироваться в <a style="color: #36d436;" href="https://t.me/freshpal">телеграм канале.</a>
            <br>
            <br>
            Если вы хотите поддержать нашу команду, реквизиты оставлены внизу.
            <br>
            <br>
            <span style="color: #36d436;">Сбербанк - 4279380020992840 (сбп подключен)</span>
            <br>
            <br>
            В качестве нашей благодарности, мы внесем вас в список донатеров FreshPal.
            5 самых щедрых будут отображаться в отдельном компоненте, на всех страницах сайта.
            Это позволит многим узнать о наших героях! Также будет отдельная страница со всеми донатерами.
            <br>
            <br>
            Чтобы мы узнали, от кого пришел донат, просим вас указать ваш id в сообщении при отправки пожертвования.
            <br>
            Минимальная сумма - 100 рублей. И вы точно попадете в список донатеров!
            <br>
            Донаты по 1 рублю рассматриваться не будут. &#128522; Иначе будет производственный ад!
            <br>
            <br>
            <span style="color: #36d436;">Ваш id - {{username.username_id}}</span>
            <br>
            <br>
            Для пользователей криптовалюты, для кого важна анонимность, также оставляем кошельки.
            <br>
            <br>
            <span style="color: #36d436;">1J6VrpoKDaoRLjXosiWq2HSUN8qtbpCJqL</span> &mdash; BTC (сеть - BTC)
            <br>
            <span style="color: #36d436;">0x15262def137fa6c87d62fc6aa3a159451aa33e84</span> &mdash; ETH,USDT (сеть - ERC20)
            <br>
            <span style="color: #36d436;">TCPeDrjj2w6cu6vKZWBJtsLnZ3hSu6fQjz</span> &mdash; USDT (сеть - TRC20)
            <br>
            <span style="color: #36d436;">0x15262def137fa6c87d62fc6aa3a159451aa33e84</span> &mdash; USDT (сеть - BEP20)
            <br>
            <span style="color: #36d436;">EQDbL9Vw3rf3en0Lo0_MUvrq8J_-zX5AFw3FYZguRCw8FBAc</span> &mdash; Toncoin
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
}


</style>