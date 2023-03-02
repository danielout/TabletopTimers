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

// Define our Globals
export const appGlobals = ref({
    showTutorial: false,
    windowContent: 'timers',
});

// Create our player array
export const playerRef: Ref<Array<Player>> = ref([]);
// playerRef.value.push(new Player(0, "Gandalf"));
export const players = playerRef.value;

// If there are local settings stored, load them
if (localStorage.getItem('settings')) {
    const loadedSettings = JSON.parse(localStorage.getItem('settings') || '{}');
    // If the saved settings version matches the current version, load them
    if (loadedSettings.settingsVersion == settingsRef.value.settingsVersion) {
        settingsRef.value = loadedSettings;
        console.log("Settings loaded!");

    } else {
        // Blow away old settings and save the defaults
        // TODO: Need to write some versioning logic instead of just nuking old settings
        localStorage.setItem('settings', JSON.stringify(settingsRef.value));
        console.log("Settings version mismatch, resetting settings to defaults");
    }
} else {
    // If there are no local settings, save the defaults
    localStorage.setItem('settings', JSON.stringify(settingsRef.value));
    // Enable our tutorial popup
    // TODO: Actually make a tutorial popup lol
    appGlobals.value.showTutorial = true;
}

// Save ourselves remembering to use .value everywhere if we just need to read the data.
export const appSettings = settingsRef.value;

// Mount the App
const app = createApp(App)
registerPlugins(app)
app.mount('#app')
