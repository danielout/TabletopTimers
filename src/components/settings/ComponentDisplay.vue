<script setup lang="ts">
// Pull in our state management
import { useSettingsStore } from '@/store/settings';
const settingsStore = useSettingsStore();
</script>

<template>
  <v-expansion-panel>
    <v-expansion-panel-title>Display Toggles</v-expansion-panel-title>
    <v-expansion-panel-text>
      <v-container class="d-flex flex-column ma-0 pa-0 w-100">
        <v-container
          class="d-flex flex-row justify-space-between align-center ma-0 pa-0">
          <span class="w-100">Display Big Timer</span>
          <v-switch
            hide-details="auto"
            color="secondary"
            density="compact"
            v-model:model-value="settingsStore.showBigTimer">
          </v-switch>
        </v-container>
        <v-container
          class="d-flex flex-row justify-space-between align-center ma-0 pa-0">
          <span class="w-100">Display Extra Timer</span>
          <v-switch
            hide-details="auto"
            color="secondary"
            density="compact"
            v-model:model-value="settingsStore.showExtraTimer">
          </v-switch>
        </v-container>
        <v-container
          class="d-flex flex-row justify-space-between align-center ma-0 pa-0">
          <span class="w-100">Display Player Timers</span>
          <v-switch
            hide-details="auto"
            color="secondary"
            density="compact"
            v-model:model-value="settingsStore.showPlayerTimers">
          </v-switch>
        </v-container>
      </v-container>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
