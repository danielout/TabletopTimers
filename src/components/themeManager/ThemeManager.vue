<script setup lang="ts">
import { ref, Ref } from 'vue';
import { useTheme } from 'vuetify';

// Grab the current theme colors to setup the preview widget
const currentThemeColors = useTheme().current.value.colors;

// Make our big ole list of colors
let newBackgroundColor = ref(currentThemeColors.background);
let newSurfaceColor = ref(currentThemeColors.surface);
let newPrimaryColor = ref(currentThemeColors.primary);
let newPrimaryDarkerColor = ref(currentThemeColors['primary-darken-1']);
let newSecondaryColor = ref(currentThemeColors.secondary);
let newAccentColor = ref(currentThemeColors.accent);
let newErrorColor = ref(currentThemeColors.error);
let newInfoColor = ref(currentThemeColors.info);
let newSuccessColor = ref(currentThemeColors.success);
let newWarningColor = ref(currentThemeColors.warning);
let newHighlight0Color = ref(currentThemeColors.highlight0);
let newHighlight1Color = ref(currentThemeColors.highlight1);
let newHighlight2Color = ref(currentThemeColors.highlight2);
let newHighlight3Color = ref(currentThemeColors.highlight3);
let newTimerWarningColor = ref(currentThemeColors.timerWarning);
let newTimerDangerColor = ref(currentThemeColors.timerDanger);

// Just our border highlight color code for the preview widget
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
// {{ currentThemeColors }}
</script>

<template>
  <v-sheet class="flex justify-center align-center pa-1" color="grey">
    <v-sheet
      :elevation="-2"
      class="ma-1 pa-3 rounded-xl"
      :color="newBackgroundColor">
      <v-sheet
        width="100%"
        class="pa-0 ma-0"
        :color="borderColor"
        rounded="lg"
        :border="borderColor != 'none' ? 'lg opacity-12' : 'lg opacity-0'">
        <v-card class="rounded-lg" :color="newPrimaryColor">
          <v-card-title>
            <v-sheet color="transparent" class="d-flex pa-0 ma-0 justify-space-between align-center">
                <span>Text Example</span>
                <v-btn
                  color="secondary"
                  flat
                  size="small">
                  Button!
                </v-btn>
          </v-sheet>
        </v-card-title>
          <v-card-subtitle>
            <v-container
              class="d-flex justify-space-between align-center pa-0 ma-0">
              <v-container
                class="d-flex justify-space-between align-center pa-0 ma-0 mr-1 w-100">
                <v-sheet class="pa-1 rounded-sm" color="error">Player</v-sheet>
                <span class="text-red font-weight-bold">03:42</span>
              </v-container>
              <v-container
                class="d-flex justify-space-around align-center pa-0 ma-0 w-auto">
                <v-btn
                  color="secondary"
                  icon="mdi-refresh"
                  size="x-small">
                </v-btn>
                <v-divider vertical class="mx-1"></v-divider>
                <v-btn
                  color="secondary-darken-1"
                  icon="mdi-pause"
                  size="x-small">
                </v-btn>
                <v-divider vertical class="mx-1"></v-divider>
                <v-btn color="error" icon="mdi-play" size="x-small">

                </v-btn>
              </v-container>
            </v-container>
          </v-card-subtitle>
          <v-divider class="mt-1"></v-divider>
          <v-card-text class="pa-0 ma-0">
            <v-sheet class="pa-1 rounded" :color="newPrimaryDarkerColor">
              <span>Details text box text</span>
              <v-sheet
                class="d-flex justify-space-around align-center pa-1 rounded"
                color="transparent">
                <v-btn-toggle
                  density="compact"
                  rounded="xl"
                  v-model:model-value="highlightColor"
                  @update:model-value="toggleBorderHighlight()">
                  <v-btn>
                    <v-icon size="x-large" :color="newHighlight0Color" icon="mdi-circle">
                    </v-icon>
                  </v-btn>
                  <v-btn>
                    <v-icon size="x-large" :color="newHighlight1Color" icon="mdi-circle">
                    </v-icon>
                  </v-btn>
                  <v-btn>
                    <v-icon size="x-large" :color="newHighlight2Color" icon="mdi-circle">
                    </v-icon>
                  </v-btn>
                  <v-btn
                    >
                    <v-icon
                      size="x-large"
                      :color="newHighlight3Color"
                      icon="mdi-circle">
                    </v-icon>
                  </v-btn>
                </v-btn-toggle>
              </v-sheet>
              <v-divider class="mt-1"></v-divider>
              <v-sheet color="transparent" class="d-flex align-center justify-center rounded-lg" style="background: linear-gradient(0deg, rgba(243,254,59,1) 0%, rgba(253,125,45,1) 100%);">
                <v-icon size="x-small" :color="newTimerWarningColor" icon="mdi-circle">
                </v-icon>
                <span class="px-1">Timer Warning Gradient Demo</span>
                <v-icon size="x-small" :color="newTimerDangerColor" icon="mdi-circle">
                </v-icon>
              </v-sheet>
            </v-sheet>
          </v-card-text>
        </v-card>
      </v-sheet>
    </v-sheet>
  </v-sheet>
</template>
