import axios from 'axios';

window.logger = process.env.NODE_ENV === 'development' ? console.log.bind(console) : () => { };

window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
