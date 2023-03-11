<script setup lang="ts">
import { ref, Ref } from 'vue';
import { ThemeDefinition, useTheme } from 'vuetify';
import { adjustColor, blendColors } from '@/logic/colorFunctions';
import { getDarkThemeNames, getLightThemeNames } from '@/plugins/vuetifyThemes';
// Import our store info
import { useSettingsStore } from '@/store/settings';
const settingsStore = useSettingsStore();

const devMode = import.meta.env.VITE_DEV_MODE;

// Define a type for our preview colors so TypeScript stops fucking complaining
type ColorPreview = {
  background: string;
  surface: string;
  primary: string;
  secondary: string;
  highlight0: string;
  highlight1: string;
  highlight2: string;
  highlight3: string;
  timerWarning: string;
  timerDanger: string;
  error: string;
  accent?: string;
  info?: string;
  success?: string;
  warning?: string;
  'primary-darken-1'?: string;
  'secondary-darken-1'?: string;
};

// Define some dummy colors for our preview - in theory these should never be used as themes should override them. Maybe make them hot pink?
const dummyColors = {
  primary: '#FFFFFF',
  secondary: '#FFFFFF',
  timerWarning: '#FFFFFF',
  timerDanger: '#FFFFFF',
  accent: '#FFFFFF',
  error: '#FFFFFF',
  info: '#FFFFFF',
  success: '#FFFFFF',
  warning: '#FFFFFF',
  background: '#FFFFFF',
  surface: '#FFFFFF',
  highlight0: '#FFFFFF',
  highlight1: '#FFFFFF',
  highlight2: '#FFFFFF',
  highlight3: '#FFFFFF',
  'primary-darken-1': '#FFFFFF',
  'secondary-darken-1': '#FFFFFF',
};

// Grab all our themes from vuetify
let themeList = useTheme().computedThemes.value;

// Make our preview objects we can manipulate
let previewTheme: ThemeDefinition = useTheme().current.value;
let previewColors: Ref<ColorPreview> = ref(dummyColors);

// Pull in the theme colors
try {
  previewColors.value = previewTheme.colors as ColorPreview;
} catch (error) {
  console.log('Error loading theme colors: ' + error);
}

// Set up our calculated darker colors
previewColors.value['primary-darken-1'] = adjustColor(
  previewColors.value.primary,
  -20
);
previewColors.value['secondary-darken-1'] = adjustColor(
  previewColors.value.secondary,
  -20
);

// Set up our timer to cycle the warning color
let warningCycledColor: Ref<string> = ref('#FFFFFF');
const warningCycleLength: number = 15;
let warningCycleIteration: number = 0;
let warningCycleFrequency: number = 1000;

// The function that updates the warning color
function updateWarningCycledColor() {
  if (warningCycleIteration == warningCycleLength) {
    warningCycleIteration = 0;
  } else {
    warningCycleIteration++;
  }
  warningCycledColor.value = blendColors(
    previewColors.value.timerWarning,
    previewColors.value.timerDanger,
    warningCycleIteration / warningCycleLength
  );
}

// Call updateWarningCycledColor every second
setInterval(updateWarningCycledColor, warningCycleFrequency);

// Just our border highlight color code for the preview widget
let highlightColor: Ref<string | number> = ref('none');
let borderColor: Ref<string> = ref('none');

function toggleBorderHighlight() {
  switch (highlightColor.value) {
    case 0:
      borderColor.value = previewColors.value.highlight0;
      break;
    case 1:
      borderColor.value = previewColors.value.highlight1;
      break;
    case 2:
      borderColor.value = previewColors.value.highlight2;
      break;
    case 3:
      borderColor.value = previewColors.value.highlight3;
      break;
    default:
      borderColor.value = previewColors.value.surface;
      break;
  }
}

// Find the theme in our themeList that matches the themeName and set our previewTheme to it
function loadThemePreview(themeName: string) {
  // find the theme in our themeList object whose key matches themeName
  const theme: ThemeDefinition | undefined = themeList[themeName];
  if (!theme || !theme.colors) {
    console.error(`Could not find theme ${themeName} in themeListStore`);
    return;
  }
  // Set our preview theme to the theme we found
  previewTheme = theme;
  // Set our calculated darker colors
  theme.colors['primary-darken-1'] = adjustColor(
    previewColors.value.primary,
    -20
  );
  theme.colors['secondary-darken-1'] = adjustColor(
    previewColors.value.secondary,
    -20
  );
  // Set isPreviewDark to the theme's dark property
  isPreviewDark.value = theme.dark!;
  // Set our preview colors to the colors of the theme we found
  try {
    previewColors.value = theme.colors as ColorPreview;
  } catch (error) {
    console.log('Error loading theme colors: ' + error);
  }
  // Set our preferred theme to the theme we found
  if (isPreviewDark.value) {
    settingsStore.preferredDarkTheme = themeName;
  } else {
    settingsStore.preferredLightTheme = themeName;
  }
}

// Should our preview block be dark or light theme
let isPreviewDark: Ref<boolean> = ref(previewTheme.dark ?? false);

// Store what our theme is set to
let selectedDarkTheme: Ref<string> = ref(settingsStore.preferredDarkTheme);
let selectedLightTheme: Ref<string> = ref(settingsStore.preferredLightTheme);

// When we change what our default theme type is, load the corresponding theme
function themeTypeChange() {
  if (settingsStore.themeMode == 'dark') {
    loadThemePreview(selectedDarkTheme.value);
    isPreviewDark.value = true;
    isCustomThemeDark.value = true;
  } else if (settingsStore.themeMode == 'light') {
    loadThemePreview(selectedLightTheme.value);
    isPreviewDark.value = false;
    isCustomThemeDark.value = false;
  } else {
    // If we're in auto mode, we need to set the theme to the current system theme
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      loadThemePreview(selectedDarkTheme.value);
      isPreviewDark.value = true;
    } else {
      loadThemePreview(selectedLightTheme.value);
      isPreviewDark.value = false;
    }
  }
}

/* **********************************
BEGIN OUR BIG OLE CUSTOM THEME EDITOR
*************************************/
// What object are we editing? It should be a color from our previewColors object
let selectedColorSlot: Ref<string> = ref('Primary');
// Is this a dark theme?
let isCustomThemeDark: Ref<boolean> = ref(isPreviewDark.value);
// Save the current theme to the user's settings

// Object containing user facing names for our color slots
const colorSlots: Record<string, string> = {
  background: 'Background',
  surface: 'Surface',
  primary: 'Primary',
  secondary: 'Secondary',
  error: 'Paused',
  highlight0: 'Box Highlight 1',
  highlight1: 'Box Highlight 2',
  highlight2: 'Box Highlight 3',
  highlight3: 'Box Highlight 4',
  timerWarning: 'Timer Warning',
  timerDanger: 'Timer Danger',
};

// Color slot names array for our dropdown
const colorSlotNames: string[] = Object.values(colorSlots);
let selectedColorSlotColor = ref(
  getSlotValueByUserString(selectedColorSlot.value)
);
let slotReferenceKey: keyof ColorPreview | undefined = 'primary';

function colorSlotChange() {
  selectedColorSlotColor.value = getSlotValueByUserString(
    selectedColorSlot.value
  );
  slotReferenceKey = Object.keys(colorSlots).find(
    (key) => colorSlots[key] == selectedColorSlot.value
  ) as keyof ColorPreview;
  console.log('slotReferenceKey: ' + slotReferenceKey);
}

function getSlotValueByUserString(slotString: string): string {
  // Find the key of the color slot name we have selected
  let colorSlotKey = Object.keys(colorSlots).find(
    (key) => (colorSlots[key] as string) == slotString
  );
  if (!colorSlotKey) {
    console.error(`Could not find color slot key for ${slotString}`);
    return '#FFFFFF';
  }
  // Find the key in our previewColors object that matches the colorSlotKey
  let colorSlotValue = Object.keys(previewColors.value).find(
    (key) => key == colorSlotKey
  );
  if (!colorSlotValue) {
    console.error(`Could not find color slot value for ${colorSlotKey}`);
    return '#FFFFFF';
  }
  // Return the value of the color slot
  return colorSlotValue;
}

// Whenever we change the color on the color picker, update our previewColors object
function updateCustomThemePreview() {
  if (!slotReferenceKey) return;
  previewColors.value[slotReferenceKey] = selectedColorSlotColor.value;
  if (slotReferenceKey == 'primary') {
    previewColors.value['primary-darken-1'] = adjustColor(
      selectedColorSlotColor.value,
      -20
    );
  } else if (slotReferenceKey == 'secondary') {
    previewColors.value['secondary-darken-1'] = adjustColor(
      selectedColorSlotColor.value,
      -20
    );
  }
}

function copyThemeToClip() {
  let tempTheme: ThemeDefinition = {
    dark: isCustomThemeDark.value,
    colors: previewColors.value,
  };
  let themeString = JSON.stringify(tempTheme);
  navigator.clipboard.writeText(themeString);
}
</script>

<template>
  <v-container class="d-flex flex-column align-center justify-center pa-0 ma-0">
    <v-sheet class="d-flex justify-center align-center pa-1" color="background">
      <v-sheet
        :elevation="0"
        class="ma-1 pa-3 rounded-xl d-flex flex-column align-center justify-center"
        :theme="isPreviewDark ? 'dark' : 'light'"
        :color="previewColors.background">
        <v-card
          class="rounded-lg"
          :color="previewColors.surface"
          :elevation="6">
          <v-card-title class="pa-1 d-flex justify-center">
            25:48
          </v-card-title>
          <v-card-text class="pa-1 d-flex justify-center">
            Last Timer: 02:59
          </v-card-text>
          <v-card-actions class="d-flex justify-space-around align-center">
            <v-btn :color="previewColors.secondary" variant="flat">
              Reset
            </v-btn>
            <v-btn
              :color="previewColors['secondary-darken-1']"
              variant="flat"
              class="w-99">
              Pause
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-container
          class="d-flex flex-row justify-space-around w-80 align-center pa-0 mt-2 mb-2">
          <v-btn size="small" :color="previewColors.primary" class="w-40">
            Reset All
          </v-btn>
          <v-btn size="small" :color="previewColors.primary" class="w-40">
            Pause All
          </v-btn>
        </v-container>
        <v-sheet
          width="100%"
          :elevation="2"
          class="pa-0 ma-0"
          :color="borderColor"
          rounded="lg"
          :border="borderColor != 'none' ? 'lg opacity-12' : 'lg opacity-0'">
          <v-expansion-panels class="mb-1" modal-value="preview">
            <v-expansion-panel
              :bg-color="previewColors.primary"
              value="preview">
              <v-expansion-panel-title :color="previewColors.primary">
                <v-container
                  class="d-flex justify-space-between align-center pa-0 ma-0">
                  <span>
                    <v-sheet
                      class="pa-1 rounded"
                      :color="previewColors.timerWarning">
                      Player Name
                    </v-sheet>
                  </span>
                  <v-container class="d-flex align-center pa-0 ma-0 w-auto">
                    <span
                      class="font-weight-bold"
                      :style="'color: ' + previewColors.timerWarning">
                      15</span
                    >:<span
                      class="font-weight-bold"
                      :style="'color: ' + previewColors.timerDanger"
                      >11
                    </span>

                    <span class="px-1">
                      <v-btn
                        :color="previewColors.secondary"
                        icon="mdi-refresh"
                        size="x-small">
                      </v-btn>
                    </span>
                    <v-btn
                      :color="previewColors['secondary-darken-1']"
                      icon="mdi-pause"
                      size="x-small">
                    </v-btn>
                    <span class="ml-1">
                      <v-btn
                        :color="previewColors.error"
                        icon="mdi-play"
                        size="x-small">
                      </v-btn>
                    </span>
                  </v-container>
                </v-container>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-container
                  class="d-flex flex-column align-center justify-center pa-0 ma-0 w-100">
                  <v-container
                    class="pa-0 ma-0 d-flex justify-space-between w-100">
                    <span class="w-100">Last Timer:</span>
                    <span>45:13</span>
                  </v-container>
                  <v-divider width="75%" thickness="2"></v-divider>
                  <v-container
                    class="pa-0 ma-0 d-flex flex-column justify-space-between align-center w-100">
                    <div class="text-caption">Reminder Highlight Color:</div>
                  </v-container>
                  <v-sheet
                    class="d-flex justify-space-around align-center pa-1 rounded"
                    color="transparent">
                    <v-btn-toggle
                      density="compact"
                      rounded="xl"
                      v-model:model-value="highlightColor"
                      @update:model-value="toggleBorderHighlight()">
                      <v-btn
                        :style="'background-color: ' + previewColors.surface">
                        <v-icon
                          size="x-large"
                          :color="previewColors.highlight0"
                          icon="mdi-circle">
                        </v-icon>
                      </v-btn>
                      <v-btn
                        :style="'background-color: ' + previewColors.surface">
                        <v-icon
                          size="x-large"
                          :color="previewColors.highlight1"
                          icon="mdi-circle">
                        </v-icon>
                      </v-btn>
                      <v-btn
                        :style="'background-color: ' + previewColors.surface">
                        <v-icon
                          size="x-large"
                          :color="previewColors.highlight2"
                          icon="mdi-circle">
                        </v-icon>
                      </v-btn>
                      <v-btn
                        :style="'background-color: ' + previewColors.surface">
                        <v-icon
                          size="x-large"
                          :color="previewColors.highlight3"
                          icon="mdi-circle">
                        </v-icon>
                      </v-btn>
                    </v-btn-toggle>
                  </v-sheet>
                  <v-divider class="mt-1"></v-divider>
                  <v-sheet
                    color="transparent"
                    class="d-flex align-center justify-center mb-1 rounded-lg">
                    <v-icon
                      size="x-small"
                      :color="previewColors.timerWarning"
                      icon="mdi-circle">
                    </v-icon>
                    <span class="px-1" :style="'color: ' + warningCycledColor"
                      >Timer Warning Gradient Demo</span
                    >
                    <v-icon
                      size="x-small"
                      :color="previewColors.timerDanger"
                      icon="mdi-circle">
                    </v-icon>
                  </v-sheet>
                  <v-sheet
                    :color="warningCycledColor"
                    class="d-flex align-center justify-center rounded-lg">
                    <v-icon
                      size="x-small"
                      :color="previewColors.timerWarning"
                      icon="mdi-circle">
                    </v-icon>
                    <span class="px-1">Timer Warning Gradient Demo</span>
                    <v-icon
                      size="x-small"
                      :color="previewColors.timerDanger"
                      icon="mdi-circle">
                    </v-icon>
                  </v-sheet>
                </v-container>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-sheet>
      </v-sheet>
    </v-sheet>
    <v-expansion-panels
      variant="accordion"
      class="px-3 pt-0 ma-0"
      model-value="settings">
      <v-expansion-panel value="settings">
        <v-expansion-panel-title> Theme Settings </v-expansion-panel-title>
        <v-expansion-panel-text
          class="d-flex flex-column justify-center align-center">
          <v-btn-toggle
            mandatory
            density="compact"
            rounded="xl"
            class="mb-1"
            v-model:model-value="settingsStore.themeMode"
            @update:model-value="themeTypeChange">
            <v-btn value="dark">Dark</v-btn>
            <v-btn value="auto">Auto</v-btn>
            <v-btn value="light">Light</v-btn>
          </v-btn-toggle>
          <v-select
            class="flex-grow-1"
            :items="getLightThemeNames()"
            label="Select a light theme"
            v-model:model-value="selectedLightTheme"
            @update:model-value="loadThemePreview">
          </v-select>
          <v-select
            class="flex-grow-1"
            :items="getDarkThemeNames()"
            label="Select a dark theme"
            v-model:model-value="selectedDarkTheme"
            @update:model-value="loadThemePreview">
          </v-select>
        </v-expansion-panel-text>
      </v-expansion-panel>
      <div :style="devMode ? '' : 'display: none'" class="pa-0 ma-0 w-100">
        <v-expansion-panel :style="devMode ? '' : 'display: none'">
          <v-expansion-panel-title>
            Custom Theme Editor
          </v-expansion-panel-title>
          <v-expansion-panel-text
            class="d-flex flex-column justify-center align-center">
            <v-sheet
              class="pa-0 ma-0 d-flex flex-column justify-space-between align-center">
              <v-switch
                hide-details="auto"
                density="compact"
                label="Dark Theme"
                v-model:model-value="isCustomThemeDark"
                @update:model-value="isPreviewDark = isCustomThemeDark">
                <template #prepend>
                  <span>Light Theme</span>
                </template>
              </v-switch>
              <v-select
                density="compact"
                :items="colorSlotNames"
                class="w-100"
                label="Select a color slot"
                v-model:model-value="selectedColorSlot"
                @update:model-value="colorSlotChange">
              </v-select>
              <v-color-picker
                mode="hexa"
                v-model:model-value="selectedColorSlotColor"
                @update:model-value="updateCustomThemePreview()">
              </v-color-picker>
              <v-btn class="mt-2 mb-1" @click="copyThemeToClip()">
                Copy Datastructure
              </v-btn>
            </v-sheet>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </div>
    </v-expansion-panels>
  </v-container>
</template>
