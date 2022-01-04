import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import mitt from '@/utils/mitt';
import { createPinia } from 'pinia';
import install from './install';

createApp(App).use(router).use(mitt).use(createPinia).use(install).mount('#app');
