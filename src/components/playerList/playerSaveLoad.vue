<script setup lang="ts">
import { usePlayerStore } from '@/store/players';
const playerStore = usePlayerStore();

// Export all the playerIDs and playerNames to a JSON file
function exportPlayers() {
  const playerData = playerStore.players.map((player) => {
    return {
      id: player.id,
      name: player.name,
    };
  });
  const dataStr =
    'data:text/json;charset=utf-8,' +
    encodeURIComponent(JSON.stringify(playerData));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute('href', dataStr);
  downloadAnchorNode.setAttribute('download', 'playerData.json');
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

// Import playerIDs and playerNames from a JSON file and create new players with those IDs and names
function importPlayers() {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.json';
  fileInput.onchange = (event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      // Delete all the existing players
      playerStore.players = [];
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target?.result;
        if (fileContent) {
          const playerData = JSON.parse(fileContent as string);
          playerData.forEach((player: { id: number; name: string }) => {
            playerStore.addPlayerWithId(player.id, player.name);
          });
        }
      };
      reader.readAsText(file);
    }
  };
  fileInput.click();
}
</script>

<template>
  <v-sheet
    color="transparent"
    class="w-90 d-flex justify-space-between align-center mx-5">
    <v-btn density="comfortable" size="small" @click="exportPlayers"
      >Export Players</v-btn
    >
    <v-btn density="comfortable" size="small" @click="importPlayers"
      >Import Players</v-btn
    >
  </v-sheet>
</template>
