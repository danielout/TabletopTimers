/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue';

// Composables
import { createApp } from 'vue';
const app = createApp(App);

// Plugins
import { registerPlugins } from '@/plugins';
registerPlugins(app);

// Mount the App
app.mount('#app');
