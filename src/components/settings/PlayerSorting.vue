<script setup lang="ts"></script>

<template>
  <v-expansion-panel>
    <v-expansion-panel-title>Player Sorting</v-expansion-panel-title>
    <v-expansion-panel-text
      class="d-flex flex-column justify-center align-center">
      <v-container
        class="d-flex flex-row justify-space-between align-center ma-0 pa-0">
        <span class="w-100">Autosort Players</span>
        <v-switch
          disabled
          hide-details="auto"
          color="secondary"
          density="compact">
        </v-switch>
      </v-container>
      <v-container
        class="d-flex flex-row justify-space-between align-center ma-0 pa-0">
        <span class="w-100">Paused on Bottom</span>
        <v-switch
          disabled
          hide-details="auto"
          color="secondary"
          density="compact">
        </v-switch>
      </v-container>
      <div class="text-subtitle-2">Sort Type</div>
      <v-btn-toggle disabled mandatory>
        <v-btn value="name">Name</v-btn>
        <v-btn value="maxTime">Max Time</v-btn>
      </v-btn-toggle>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
