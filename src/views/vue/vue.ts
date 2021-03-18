import Vue from 'vue';
import app from './app.vue'


import { Button } from 'view-design';
import 'view-design/dist/styles/iview.css';

Vue.component('Button', Button);

new Vue({
    render:h=>h(app)
}).$mount('#app')