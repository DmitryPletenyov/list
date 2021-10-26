import App from 'App.vue';
import Message from 'Message.vue';
import 'sass/global.scss';
import { createApp } from 'vue';

createApp(App).mount('#app');

createApp(Message).mount('#msg');
