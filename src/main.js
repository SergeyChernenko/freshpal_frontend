import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import store from './store/store.js'

Vue.config.productionTip = false
Vue.use(BootstrapVue)

import LeftMenu from './components/Other/LeftMenu'
import Header from './components/Other/Header'
import Publications from './components/userpage/Publications'
import RighMenu from './components/Other/RighMenu'
import Subscriptions from './components/Home/Subscriptions'
import Recommended from './components/Home/Recommended'
import Textarea from './components/Other/Textarea'
import Authorization from './components/startpage/Authorization'
import Registration from './components/startpage/Registration'
import Settings from "./components/Other/Settings";
import Support from "./components/Other/Support";
import Hashtag from "./components/Home/Hashtag";
import Activity from "./components/Home/Activity";
import Donat from "./components/Other/Donat";
import Mention from "./components/Home/Mention";

import vClickOutside from 'v-click-outside'
import Loading from 'vue-loading-overlay';

Vue.component('Loading', Loading)




Vue.component('LeftMenu', LeftMenu)
Vue.component('RighMenu', RighMenu)
Vue.component('Header', Header)
Vue.component('Publications', Publications)
Vue.component('Textarea', Textarea)
Vue.component('Registration', Registration)
Vue.component('Authorization', Authorization)
Vue.component('Subscriptions', Subscriptions)
Vue.component('Recommended', Recommended)
Vue.component('Settings', Settings)
Vue.component('Support', Support)
Vue.component('Hashtag', Hashtag)
Vue.component('Activity', Activity)
Vue.component('Donat', Donat)
Vue.component('Mention', Mention)









Vue.directive('clickOutside',vClickOutside.directive)

var filter = function(text, length, clamp){
    clamp = clamp || '...';
    var node = document.createElement('div');
    node.innerHTML = text;
    var content = node.textContent;
    return content.length > length ? content.slice(0, length) + clamp : content;
};

Vue.filter('truncate', filter);


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.prototype.$hostname = 'http://127.0.0.1:8000'
Vue.prototype.$localhost = 'http://localhost:8080'
// Vue.prototype.$access_token = localStorage.getItem('access') || null
Vue.prototype.$timestop = 800

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


