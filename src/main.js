import Vue from 'vue';
import store from './store';
import dotenv from 'dotenv';
import './registerServiceWorker'




Vue.config.productionTip = false;

new Vue({
    store,
    render: h => h(require('./App').default),
}).$mount('#app');
