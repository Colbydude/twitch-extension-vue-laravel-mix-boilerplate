// Load in our JavaScript dependencies.
require('./bootstrap/bootstrap');
import app from './components/app';
import router from './bootstrap/router'
import Vue from 'vue';

// Map global objects to Vue.
Vue.prototype.$http = axios;

// Create a fresh Vue instance and attach it to the page.
new Vue({
    el: '#app',
    router,
    render: h => h(app)
});

// Setup for Twitch Extension auth stuff.
require('./bootstrap/twitch-ext');
