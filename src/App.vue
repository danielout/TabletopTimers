<script setup lang="ts">
// Import dev settings
import { useDevStore } from '@/devTools/devSettings';
// Import Script Functions
import { Player } from '@/logic/playerManagement';
import { ref, watch } from 'vue';
// Import our child components
import HeaderTimers from '@/components/topTimers/HeaderTimers.vue';
import PlayerTimers from '@/components/playerList/PlayerTimers.vue';
import SettingsMenu from '@/components/settings/SettingsMenu.vue';
import ThemeManager from '@/components/themeManager/ThemeManager.vue';
import About from '@/components/infoScreens/About.vue';

// Pull in our state management
import { useAppConfigStore } from '@/store/appConfig';
import { useSettingsStore } from '@/store/settings';
import { usePlayerStore } from '@/store/players';
import { useTheme } from 'vuetify/lib/framework.mjs';
const settingsStore = useSettingsStore();
const playerStore = usePlayerStore();
const appConfigStore = useAppConfigStore();

// Set the starting window to whatever is defined in settings
appConfigStore.$patch({ currentWindow: appConfigStore.startingAppScreen });

// Check if we are in development mode, and load the devtools if so.
if (import.meta.env.VITE_DEV_MODE) {
  console.log('Development mode! Loading devtools...');
  const devStore = useDevStore();
  // Load dummy players if dev settings say to.
  if (devStore.loadDummyPlayers && playerStore.playerCount == 0) {
    for (let i = 0; i < 5; i++) {
      playerStore.players.push(new Player(i, 'Player ' + i));
    }
  }
  // Set the starting window to whatever is defined in dev settings
  if (devStore.overrideStartingScreen) {
    appConfigStore.$patch({ currentWindow: devStore.startingAppScreen });
  }
}

// Change the window when a menu item is called.
function changeWindow(whatdo: string) {
  appConfigStore.$patch({ currentWindow: whatdo });
}

const theme = useTheme();
const desiredTheme = ref(settingsStore.getThemeName);
// Set the theme to whatever is defined in settings
theme.global.name.value = desiredTheme.value;
// watch for changes to desiredThem, and update the theme if it changes
watch(
  () => settingsStore.getThemeName,
  (newTheme: string) => {
    theme.global.name.value = newTheme;
  }
);
</script>

<template>
  <v-app>
    <!-- Top Application Bar -->
    <v-app-bar :elevation="2" density="compact">
      <v-app-bar-title>Tabletop Timers</v-app-bar-title>
      <template v-slot:append>
        <v-menu transition="slide-x-reverse-transition">
          <template v-slot:activator="{ props }">
            <v-btn icon="mdi-dots-vertical" color="secondary" v-bind="props">
            </v-btn>
          </template>

          <v-list v-model="appConfigStore.currentWindow">
            <v-list-item
              v-for="(item, i) in appConfigStore.windowNames"
              :key="i"
              @click="changeWindow(item.title)">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-app-bar>
    <!-- Main Content Area -->
    <v-main
      id="mainbody"
      class="d-flex flex-column h-100 align-start justify-center">
      <v-window
        id="bodyContent"
        v-model="appConfigStore.currentWindow"
        class="w-100 h-100 align-center justify-center">
        <v-window-item
          id="1"
          value="Timers"
          class="align-center justify-center">
          <v-container
            class="d-flex flex-column h-100 w-100 align-start justify-space-around pa-0 ma-0"
            transition="scroll-x-transition">
            <HeaderTimers />
            <PlayerTimers v-if="settingsStore.showPlayerTimers" />
          </v-container>
        </v-window-item>
        <v-window-item id="2" value="Settings">
          <v-container
            class="d-flex flex-column h-100 align-start pa-0 ma-0"
            transition="scroll-x-transition">
            <SettingsMenu></SettingsMenu>
          </v-container>
        </v-window-item>
        <v-window-item id="3" value="Themes">
          <v-container
            class="d-flex flex-column h-100 align-start pa-0 ma-0"
            transition="scroll-x-transition">
            <ThemeManager></ThemeManager>
          </v-container>
        </v-window-item>
        <v-window-item id="4" value="About">
          <v-container
            class="d-flex flex-column h-100 align-start pa-0 ma-0"
            transition="scroll-x-transition">
            <About></About>
          </v-container>
        </v-window-item>
      </v-window>
    </v-main>
  </v-app>
</template>

<style>
html,
body {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
}
#app {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  max-width: 800px;
}
#mainbody {
  height: 100%;
  width: 100%;
}
</style>
