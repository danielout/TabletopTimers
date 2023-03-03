<script setup lang="ts">
// Import Script Functions
import { ref } from 'vue';
// Import Globals
import { appSettings } from '@/main';
// import MenuBar from '@/components/MenuBar.vue'
import HeaderTimers from '@/components/topTimers/HeaderTimers.vue';
import PlayerTimers from '@/components/playerList/PlayerTimers.vue';
import SettingsMenu from '@/components/settings/SettingsMenu.vue';
import About from '@/components/infoScreens/About.vue';

// What Window do we start on?
let contentModel = ref('Timers');

// Define our menu items - these should match the values of the v-window-item id's
const menuItems = [
  { title: 'Timers' },
  { title: 'Settings' },
  { title: 'About' },
];

// Change the window when a menu item is called.
function changeWindow(whatdo: string) {
  contentModel.value = whatdo;
}
</script>

<template>
  <v-app>
    <!-- Top Application Bar -->
    <v-app-bar :elevation="2" density="compact">
      <v-app-bar-title>Tabletop Tracker</v-app-bar-title>
      <template v-slot:append>
        <v-menu transition="slide-x-reverse-transition">
          <template v-slot:activator="{ props }">
            <v-btn icon="mdi-dots-vertical" color="primary" v-bind="props">
            </v-btn>
          </template>

          <v-list v-model="contentModel">
            <v-list-item
              v-for="(item, i) in menuItems"
              :key="i"
              @click="changeWindow(item.title)">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-app-bar>
    <!-- Main Content Area -->
    <v-main class="d-flex flex-column h-100 align-start">
      <v-window v-model="contentModel" class="w-100 h-100">
        <v-window-item id="1" value="Timers">
          <v-container
            class="d-flex flex-column h-100 align-start pa-0 ma-0"
            transition="scroll-x-transition">
            <HeaderTimers />
            <PlayerTimers v-if="appSettings.display.showPlayerTimers" />
          </v-container>
        </v-window-item>
        <v-window-item id="2" value="Settings">
          <v-container
            class="d-flex flex-column h-100 align-start pa-0 ma-0"
            transition="scroll-x-transition">
            <SettingsMenu></SettingsMenu>
          </v-container>
        </v-window-item>
        <v-window-item id="3" value="About">
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
