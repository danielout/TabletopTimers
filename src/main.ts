/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { Ref, ref, createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

// Logic
import { SettingsManager } from '@/SettingsManager'
import { Player } from '@/playerManagement'

// Initialize our settings
export const settingsRef = ref(new SettingsManager());
export const appSettings = settingsRef.value.settings;

// Define our Globals
export const appGlobals = ref({
    showTutorial: false,
    windowContent: 'timers',
});

// Create our player array
export const playerRef: Ref<Array<Player>> = ref([]);
playerRef.value.push(new Player(0, "Gandalf"));
export const players = playerRef.value;

// Mount the App
const app = createApp(App)
registerPlugins(app)
app.mount('#app')
