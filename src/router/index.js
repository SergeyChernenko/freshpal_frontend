import Vue from 'vue'
import VueRouter from 'vue-router'
import StartPage from '../components/startpage/StartPage.vue'
import MainPage from "../components/userpage/MainPage";
import Status from "../components/userpage/Status";
import RestorePassword from "../components/startpage/RestorePassword";
import Messenger from "../components/Messenger/Messenger";
import Home from "../components/Home/Home";
import Hashtag from "../components/Home/Hashtag";
import Settings from "../components/Other/Settings";
import Support from "../components/Other/Support";
import Activity from "../components/Home/Activity";
import Donat from "../components/Other/Donat";


import axios from "axios";
import { createRouter, createWebHashHistory } from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'StartPage',
    component: StartPage
  },
  {
    path: '/restore_password/:token',
    name: 'RestorePassword',
    component: RestorePassword
  },
  {
    path: '/mes',
    name: 'Messenger',
    component: Messenger
  },
  {
    path: '/new',
    name: 'Subscriptions',
    component: Home
  },
  {
    path: '/rec',
    name: 'Recommended',
    component: Home
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Home
  },
  {
    path: '/support',
    name: 'Support',
    component: Home
  },
  {
    path: '/hashtag',
    name: 'Hashtag',
    component: Home
  },
  {
    path: '/activity/',
    name: 'ActivityOnce',
    component: Home
  },
  {
    path: '/activity/:activity',
    name: 'Activity',
    component: Home
  },
  {
    path: '/donat',
    name: 'Donat',
    component: Home
  },
  {
    path: '/:username',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/:username/status/:id',
    name: 'Status',
    component: Status
  },
  {
    path: '/hashtag/:hashtag',
    name: 'HashtagOnce',
    component: Home
  },
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router
