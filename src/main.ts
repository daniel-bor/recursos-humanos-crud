import './assets/main.css';
import '@mdi/font/css/materialdesignicons.css'; // Si usas Material Design Icons
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Vuetify
// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { createPinia } from 'pinia';

const app = createApp(App);

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
});

const pinia = createPinia();

app.use(router);
app.use(vuetify);
app.use(pinia);

app.mount('#app');
