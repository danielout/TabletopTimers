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
      <v-btn-toggle mandatory density="compact" v-model:model-value="settingsStore.warningIntensityString">
        <v-btn value="low">Low</v-btn>
        <v-btn value="medium">Medium</v-btn>
        <v-btn value="high">High</v-btn>
      </v-btn-toggle>
      <div class="text-subtitle-2">Threshold Type</div>
      <v-btn-toggle mandatory density="compact" v-model:model-value="settingsStore.warningsRelative">
        <v-btn :value=false>Minutes</v-btn>
        <v-btn :value=true>Percent</v-btn>
      </v-btn-toggle>
      <div class="text-subtitle-2">Warning Threshold:</div>
      <v-container class="d-flex flex-row justify-space-between align-center ma-0 pa-0 mb-2">
        <v-sheet width="70%" :style="settingsStore.warningsRelative ? '' : 'display:none'"><v-select    
          density="compact"
          hide-details
          :style="settingsStore.warningsRelative ? '' : 'display: none'"
          :items="[125, 150, 175, 200, 225, 250, 275, 300, 325, 350, 375, 400, 425, 450, 475, 500]"
          v-model:model-value="settingsStore.warningRelativeThreshold">
        </v-select        ></v-sheet>
        <v-sheet width="70%" :style="settingsStore.warningsRelative ? 'display:none' : ''"><v-select
          density="compact"
          hide-details          
          
          :items="[1,2,3,5,8,10,15,20,30]"
          v-model:model-value="settingsStore.warningAbsoluteThreshold">
        </v-select        ></v-sheet>
        <v-sheet width="25%">{{  settingsStore.warningsRelative ? '%' : 'min' }}</v-sheet>
      </v-container>
      <!-- TODO: UNCOMMENT THIS ONCE MINIMUM MINUTES WORKS
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
      </v-container> -->
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
