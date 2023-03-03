<script setup lang="ts">
// Import our logic
import { Ref, ref } from 'vue';
import { Player } from '@/logic/playerManagement.js';
// Import our state management
import { usePlayerStore } from '@/store/players.js';
const playerStore = usePlayerStore();

let newPlayerName: Ref<string> = ref('');

function addPlayer() {
  playerStore.players.push(
    new Player(playerStore.playerCount, newPlayerName.value)
  );
  newPlayerName.value = '';
}
</script>

<template>
  <v-container class="d-flex justify-space-between mx-0 mb-0 px-4 pb-0 h-auto">
    <v-text-field
      width="100%"
      clearable
      label="Player Name"
      density="compact"
      prepend-inner-icon="mdi-account-cowboy-hat"
      variant="outlined"
      class="mr-2 ml-0 mb-0"
      v-model="newPlayerName">
    </v-text-field>
    <v-btn
      size="small"
      @click="addPlayer()"
      icon="mdi-plus-thick"
      color="primary"></v-btn>
  </v-container>
</template>
