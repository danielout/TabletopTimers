<script setup lang="ts">
// Import logic bits
import { defineProps, ref, Ref } from 'vue';
import { Player } from '@/logic/playerManagement';
// Import our child components
// Import and assign our state management
import { usePlayerStore } from '@/store/players';
const playerStore = usePlayerStore();

const props = defineProps<{
  playerid: number;
}>();

const thisPlayer: Player =
  playerStore.players.find((player) => player.id == props.playerid) ??
  new Player(0, 'ErrorPlayer');

thisPlayer.actionTimer.addEventListener('secondsUpdated', function () {
  thisPlayer.actionTimerString = thisPlayer.actionTimer
    .getTimeValues()
    .toString(['minutes', 'seconds']);
});

let highlightColor: Ref<string | number> = ref('none');
let borderColor: Ref<string> = ref('none');

function toggleBorderHighlight() {
  switch (highlightColor.value) {
    case 0:
      borderColor.value = 'highlight0';
      break;
    case 1:
      borderColor.value = 'highlight1';
      break;
    case 2:
      borderColor.value = 'highlight2';
      break;
    case 3:
      borderColor.value = 'highlight3';
      break;
    default:
      borderColor.value = 'none';
      break;
  }
}
</script>

<template>
  <v-sheet
    width="100%"
    class="pa-0 ma-0"
    :color="borderColor"
    rounded="lg"
    :border="borderColor != 'none' ? 'lg opacity-12' : 'lg opacity-0'">
    <v-expansion-panel bg-color="primary">
      <v-expansion-panel-title color="primary">
        <v-container
          class="d-flex justify-space-between align-center pa-0 ma-0">
          <span>{{ thisPlayer.name }}</span>
          <v-container class="d-flex align-center pa-0 ma-0 w-auto">
            <span class="pr-1">{{ thisPlayer.actionTimerString }}</span>
            <span class="pr-1"
              ><v-btn
                color="secondary"
                icon="mdi-refresh"
                size="x-small"
                @click.stop="thisPlayer.resetActionTimer()"></v-btn
            ></span>
            <v-btn
              :color="
                thisPlayer.actionTimerPaused ? 'error' : 'secondary-darken-1'
              "
              :icon="thisPlayer.actionTimerPaused ? 'mdi-play' : 'mdi-pause'"
              size="x-small"
              @click.stop="thisPlayer.toggleActionTimer()"></v-btn>
          </v-container>
        </v-container>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-container
          class="d-flex flex-column align-center justify-center pa-0 ma-0 w-100">
          <v-container class="pa-0 ma-0 d-flex justify-space-between w-100">
            <span class="w-100">Last Timer:</span>
            <span>{{ thisPlayer.lastActionTimer }}</span>
          </v-container>
          <v-divider width="75%" thickness="2"></v-divider>
          <v-container
            class="pa-0 ma-0 d-flex flex-column justify-space-between align-center w-100">
            <div class="text-caption">Reminder Highlight Color:</div>
            <v-btn-toggle
              density="compact"
              rounded="xl"
              v-model:model-value="highlightColor"
              @update:model-value="toggleBorderHighlight()">
              <v-btn
                ><v-icon
                  size="x-large"
                  color="highlight0"
                  icon="mdi-circle"></v-icon
              ></v-btn>
              <v-btn
                ><v-icon 
                size="x-large" 
                color="highlight1" 
                icon="mdi-circle"></v-icon
              ></v-btn>
              <v-btn
                ><v-icon
                  size="x-large"
                  color="highlight2"
                  icon="mdi-circle"></v-icon
              ></v-btn>
              <v-btn
                ><v-icon 
                size="x-large" 
                color="highlight3" 
                icon="mdi-circle"></v-icon
              ></v-btn>
            </v-btn-toggle>
          </v-container>
        </v-container>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-sheet>
</template>
