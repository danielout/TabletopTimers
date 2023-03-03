<script setup lang="ts">
// Pull in our state management
import { useSettingsStore } from '@/store/settings';
const settingsStore = useSettingsStore();
</script>
<template>
  <v-expansion-panel>
    <v-expansion-panel-title>Player Warnings</v-expansion-panel-title>
    <v-expansion-panel-text
      class="d-flex flex-column justify-center align-center">
      <v-container
        class="d-flex flex-row justify-space-between align-center ma-0 pa-0">
        <span class="w-100">Enable Player Warnings</span>
        <v-switch
          hide-details="auto"
          color="secondary"
          density="compact"
          v-model:model-value="settingsStore.enableTimerWarnings">
        </v-switch>
      </v-container>
      <div class="text-subtitle-2">Warning Intensity</div>
      <v-btn-toggle disabled mandatory density="compact">
        <v-btn value="low">Low</v-btn>
        <v-btn value="medium">Medium</v-btn>
        <v-btn value="high">High</v-btn>
      </v-btn-toggle>
      <div class="text-subtitle-2">Threshold Type</div>
      <v-btn-toggle disabled mandatory density="compact">
        <v-btn value="time">Time</v-btn>
        <v-btn value="percent">Percent</v-btn>
      </v-btn-toggle>
      <div class="text-subtitle-2">Warning Threshold:</div>
      <v-container class="d-flex flex-row align-center ma-0 pa-0">
        <v-select
          disabled
          density="compact"
          hide-details
          :items="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]">
        </v-select
        ><v-select
          disabled
          density="compact"
          hide-details
          :items="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]">
        </v-select
        >mins/pct
      </v-container>
      <div class="text-subtitle-2">Minimum Minutes:</div>
      <v-container
        class="d-flex flex-row align-center justify-center ma-0 pa-0">
        <v-switch
          disabled
          hide-details="auto"
          color="secondary"
          density="compact">
        </v-switch>
        <v-select
          disabled
          density="compact"
          hide-details
          :items="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]">
        </v-select
        ><v-select
          disabled
          density="compact"
          hide-details
          :items="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]">
        </v-select>
      </v-container>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
