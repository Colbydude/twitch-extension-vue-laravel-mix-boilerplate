// Load in our JavaScript dependencies.
import './bootstrap';
import Vue from 'vue';
import Config from './views/Config';

// Map global objects to Vue.
Vue.prototype.$http = axios;

// Create a fresh Vue instance and attach it to the page.
new Vue({
    el: '#app',
    render: h => h(Config)
});
