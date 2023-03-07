/* Player Panel
  This is the individual expansion panel for a player. It should try to handle all the logic for what we need to do for a single player - just keeps it clean to keep it here. 
  TODO LIST:
  - Delete player button.
  - Toggle off the highlight color buttons if people don't want them.
  - Add option for a countdown timer on each player card.
    - Countdown timer needs a good way to notify.
*/
<script setup lang="ts">
// Import logic bits
import { defineProps, ref, Ref } from 'vue';
import { Player } from '@/logic/playerManagement';
// Import our child components
// Import and assign our state management
import { usePlayerStore } from '@/store/players';
import { useSettingsStore } from '@/store/settings';
import { blendColors } from '@/logic/colorFunctions';
import { useTheme } from 'vuetify/lib/framework.mjs';
const playerStore = usePlayerStore();
const settingsStore = useSettingsStore();

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


// Border highlighting options
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

// If this player's actionTimerSeconds is more than settingsStore.warningThreshold higher than the average, highlight the border
setInterval(() => {
  if (
    settingsStore.exceedsWarningThreshold(
      playerStore.averageActionTimer([]),
      thisPlayer.actionTimerSeconds
    )
  ) {
    enableWarning();
  } else {
    disableWarning();
  }
  toggleBorderHighlight();
}, 1000);

let lowWarning: Ref<boolean> = ref(false);
let mediumWarning: Ref<boolean> = ref(false);
let highWarning: Ref<boolean> = ref(false);

// Turn on the appropriate warning based on settings.warningIntensity
function enableWarning() {
  switch (settingsStore.warningIntensityString) {
    case 'low':
      lowWarning.value = true;
      mediumWarning.value = false;
      highWarning.value = false;
      break;
    case 'medium':
      lowWarning.value = false;
      mediumWarning.value = true;
      highWarning.value = false;
      break;
    case 'high':
      lowWarning.value = false;
      mediumWarning.value = false;
      highWarning.value = true;
      break;
    default:
      console.log('default');
      lowWarning.value = false;
      mediumWarning.value = false;
      highWarning.value = false;
      break;
  }
}

// Turn off all warnings
function disableWarning() {
  lowWarning.value = false;
  mediumWarning.value = false;
  highWarning.value = false;
}

// If the user has scaledWarnings enabled, we need to scale the color of the warning based on how much over the average the player is
const scaledWarningEnabled = ref(settingsStore.enabledScaledWarnings);
let scaledWarningColor: Ref<string> = ref('none');
let lowWarningColor = ref(useTheme().current.value.colors.timerWarning);
let highWarningColor = ref(useTheme().current.value.colors.timerDanger);
// Go ahead and updated the scaledWarningColor every second, so it is ready when we need it
// TODO: At some point I neeed to collapse all the warning logic down to something cleaner.
setInterval(() => {
  if (!scaledWarningEnabled.value) {
    return;
  }
  if (!settingsStore.exceedsWarningThreshold(
      playerStore.averageActionTimer([]),
      thisPlayer.actionTimerSeconds
    )) {
      return;
    }
  scaledWarningColor.value = blendColors(
    lowWarningColor.value,
    highWarningColor.value,
    settingsStore.warningThresholdSeverity(
      playerStore.averageActionTimer([]),
      thisPlayer.actionTimerSeconds)
  );
}, 1000);


</script>

<template>
  <v-sheet
    width="100%"
    class="pa-0 ma-0"
    :color="borderColor"
    rounded="lg"
    :border="borderColor != 'none' ? 'lg opacity-12' : 'lg opacity-0'">
    <v-expansion-panel bg-color="primary">
      <v-expansion-panel-title :color="highWarning ? (scaledWarningEnabled ? scaledWarningColor : 'error') : 'primary'">
        <v-container
          class="d-flex justify-space-between align-center pa-0 ma-0">
          <span>{{ thisPlayer.name }}</span>
          <v-container class="d-flex align-center pa-0 ma-0 w-auto">
            <v-sheet
              class="pa-1 rounded"
              :color="mediumWarning ? (scaledWarningEnabled ? scaledWarningColor : 'error') : 'transparent'">
              <span :class="lowWarning ? 'font-weight-bold text-warning' : ''"
              :style="lowWarning ? 'color: ' + (scaledWarningEnabled ? scaledWarningColor : lowWarningColor) : ''">
                {{ thisPlayer.actionTimerString }}
              </span>
            </v-sheet>
            <span class="px-1"
              ><v-btn
                color="secondary"
                icon="mdi-refresh"
                size="x-small"
                @click.stop="thisPlayer.resetActionTimer()">
              </v-btn>
            </span>
            <v-btn
              :color="
                thisPlayer.actionTimerPaused ? 'error' : 'secondary-darken-1'
              "
              :icon="thisPlayer.actionTimerPaused ? 'mdi-play' : 'mdi-pause'"
              size="x-small"
              @click.stop="thisPlayer.toggleActionTimer()">
            </v-btn>
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
              <v-btn>
                <v-icon size="x-large" color="highlight0" icon="mdi-circle">
                </v-icon>
              </v-btn>
              <v-btn>
                <v-icon size="x-large" color="highlight1" icon="mdi-circle">
                </v-icon>
              </v-btn>
              <v-btn>
                <v-icon size="x-large" color="highlight2" icon="mdi-circle">
                </v-icon>
              </v-btn>
              <v-btn
                ><v-icon size="x-large" color="highlight3" icon="mdi-circle">
                </v-icon>
              </v-btn>
            </v-btn-toggle>
          </v-container>
        </v-container>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-sheet>
</template>
