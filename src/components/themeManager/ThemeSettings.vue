<script setup lang="ts"></script>
<template>
  <v-expansion-panel>
    <v-expansion-panel-title>Theme Settings</v-expansion-panel-title>
    <v-expansion-panel-text
      class="d-flex flex-column justify-center align-center">
      <v-btn-toggle disabled mandatory class="mb-1">
        <v-btn value="light" class="w-33">Light</v-btn>
        <v-btn value="auto" class="w-33">Auto</v-btn>
        <v-btn value="dark" class="w-33">Dark</v-btn>
      </v-btn-toggle>
      <v-select
        disabled
        class="mt-1 mb-1"
        persistent-hint
        density="compact"
        hint="Theme used for dark mode"
        label="Dark Theme"
        :items="['Default', 'Cheesecake', 'Placeholder Tired']">
      </v-select>
      <v-select
        disabled
        label="Light Theme"
        persistent-hint
        density="compact"
        hint="Theme used for light mode"
        :items="['Default', 'Summertime', 'Aurora']">
      </v-select>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
