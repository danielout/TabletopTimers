/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'


// Composables
import { Ref, ref, createApp } from 'vue'
const app = createApp(App)

// Plugins
import { registerPlugins } from '@/plugins'
registerPlugins(app)



// Logic
import { SettingsManager } from '@/logic/SettingsManager'
import { Player } from '@/logic/playerManagement'

// Initialize our settings
export const settingsRef = ref(new SettingsManager());

// Define our Globals
export const appGlobals = ref({
    showTutorial: false,
});

// Create our player array
export const playerRef: Ref<Array<Player>> = ref([]);
// 
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


// Dev mode settings.
if (import.meta.env.VITE_DEV_MODE == 'true') {
    console.log("Running in dev mode");

    // Add some test players
    playerRef.value.push(new Player(0, "Gandalf"));
    playerRef.value.push(new Player(1, "Kesha"));
    playerRef.value.push(new Player(2, "Jeff Bone"));
    playerRef.value.push(new Player(3, "Danny DeVito"));
}


// Mount the App
app.mount('#app')
