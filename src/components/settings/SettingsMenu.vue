<script setup lang="ts">
import ComponentDisplay from './ComponentDisplay.vue';
import PlayerSorting from './PlayerSorting.vue';
import PlayerWarnings from './PlayerWarnings.vue';
</script>

<template>
  <v-container class="d-flex flex-column justify-center mb-0 pb-0">
    <v-expansion-panels variant="accordion">
      <ComponentDisplay></ComponentDisplay>
      <PlayerSorting></PlayerSorting>
      <PlayerWarnings></PlayerWarnings>
    </v-expansion-panels>
  </v-container>
</template>
