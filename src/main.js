import Vue from 'vue'
import App from './App.vue'
import {store} from './store/store.js'

//Autoscroll para el chat :)
// uso: <ul class="messages" v-chat-scroll="{always: false, smooth: true}">
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll);

// App Vue
new Vue({
    el: '#app',
    store: store,
    render: h => h(App)
});


