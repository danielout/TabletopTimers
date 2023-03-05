<script setup lang="ts">
import { ref, Ref } from 'vue';
import { Player } from '@/logic/playerManagement';
// Import our child components
import AddPlayer from '@/components/playerList/AddPlayer.vue';
import PlayerPanel from '@/components/playerList/PlayerPanel.vue';
// Import and assign our state management
import { usePlayerStore } from '@/store/players';
import { useSettingsStore } from '@/store/settings';
const playerStore = usePlayerStore();
const settingsStore = useSettingsStore();

// If all the players are paused, resume them all. Otherwise pause everyone.
function toggleAllPause() {
  if (playerStore.allPaused) {
    playerStore.players.forEach((who) => who.resumeActionTimer());
  } else {
  playerStore.players.forEach((who) => who.pauseActionTimer());
  }
}

// Reset all player action timers
function resetAll() {
  playerStore.players.forEach((who) => who.resetActionTimer());
}

// Need to keep our players in an array sorted according to the settings.
let sortedPlayers: Ref<Player[]> = ref(playerStore.players);

// Updated the sortedPlayers array every second
setInterval(() => {
  if (settingsStore.enableAutoSort) {
  sortedPlayers.value = playerStore.sortPlayerList(settingsStore.sortPlayersBy, settingsStore.pausedOnBottom, settingsStore.reverseSort);
  } else {
  sortedPlayers.value = playerStore.players;
  }
}, 1000);

</script>

<template>
  <v-container
    class="d-flex flex-column justify-start px-0 mt-0 pt-1 h-100 align-self-start">
    <AddPlayer></AddPlayer>
    <v-container
      class="d-flex flex-row justify-space-around w-80 align-center pa-0 ma-0">
      <v-btn size="small" color="primary" class="w-40" @click="resetAll()"
        >Reset All</v-btn
      >
      <v-btn size="small" color="primary" class="w-40" @click="toggleAllPause()"
        >{{ playerStore.allPaused ? 'Resume All' : 'Pause All' }}</v-btn
      >
    </v-container>
    <v-container
      class="align-self-strech d-flex justify-center flex-column align-start">
      <v-expansion-panels v-for="who in sortedPlayers"
          v-bind:key="who.id" class="mb-1">
        <PlayerPanel :playerid="who.id" :value="who.id"
          >
        </PlayerPanel>
      </v-expansion-panels>
    </v-container>
  </v-container>
</template>
