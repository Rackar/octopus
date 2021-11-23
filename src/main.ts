import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/tailwindcss.css';
// import DragModal from './plugins/DragModal/index';
// import Message from './plugins/Message/install';

createApp(App).use(store).use(router).mount('#app');
