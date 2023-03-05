<script setup lang="ts">
// Pull in our state management
import { useSettingsStore } from '@/store/settings';
const settingsStore = useSettingsStore();
</script>

<template>
  <v-expansion-panel>
    <v-expansion-panel-title>Player Sorting</v-expansion-panel-title>
    <v-expansion-panel-text
      class="d-flex flex-column justify-center align-center">
      <v-container
        class="d-flex flex-row justify-space-between align-center ma-0 pa-0">
        <span class="w-100">Autosort Players</span>
        <v-switch
          hide-details="auto"
          color="secondary"
          density="compact"
          v-model:model-value="settingsStore.enableAutoSort">
        </v-switch>
      </v-container>
      <v-container
        class="d-flex flex-row justify-space-between align-center ma-0 pa-0">
        <span class="w-100">Paused on Bottom</span>
        <v-switch
          hide-details="auto"
          color="secondary"
          density="compact"
          v-model:model-value="settingsStore.pausedOnBottom">
        </v-switch>
      </v-container>
      <div class="text-subtitle-2">Sort Type</div>
      <v-btn-toggle mandatory v-model:model-value="settingsStore.sortPlayersBy">
        <v-btn value="name">Name</v-btn>
        <v-btn value="actionTimer">Max Time</v-btn>
      </v-btn-toggle>
      <v-container
        class="d-flex flex-row justify-space-between align-center ma-0 pa-0">
        <span class="w-100">Reverse Sort Direction</span>
        <v-switch
          hide-details="auto"
          color="secondary"
          density="compact"
          v-model:model-value="settingsStore.reverseSort">
        </v-switch>
      </v-container>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
