<script setup lang="ts">
import { ref, Ref } from 'vue';
import { ThemeDefinition, useTheme } from 'vuetify';
import { adjustColor, blendColors } from '@/logic/colorFunctions';

// Import our store info
import { useDevStore } from '@/devTools/devSettings';
import { useThemeSettingsStore, useThemeListStore } from '@/store/themes';
const themeSettingsStore = useThemeSettingsStore();
const themeListStore = useThemeListStore();
const devStore = useDevStore();


// Define a type for our preview colors so TypeScript stops fucking complaining
type ColorPreview = {
  primary: string;
  secondary: string;
  timerWarning: string;
  timerDanger: string;
  accent: string;
  error: string;
  info?: string;
  success?: string;
  warning?: string;
  background: string;
  surface?: string;
  highlight0: string;
  highlight1: string;
  highlight2: string;
  highlight3: string;
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
      borderColor.value = 'none';
      break;
  }
}

function loadThemePreview(themeName: string) {
  // Get the theme definition from themeListStore that matches themeName
  const theme: ThemeDefinition | undefined = themeListStore.themes.find(
    (theme) => theme.name == themeName
  )?.theme;
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
}

// Should our preview block be dark or light theme
let isPreviewDark: Ref<boolean> = ref(previewTheme.dark ?? false);

// Store what our theme is set to
let selectedDarkTheme: Ref<string> = ref(themeListStore.darkThemeNames[0]);
let selectedLightTheme: Ref<string> = ref(themeListStore.lightThemeNames[0]);

// When we change what our default theme type is, load the corresponding theme
function themeTypeChange() {
  if (themeSettingsStore.themeMode == 'dark') {
    loadThemePreview(selectedDarkTheme.value);
    isPreviewDark.value = true;
    isCustomThemeDark.value = true;
  } else if (themeSettingsStore.themeMode == 'light') {
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
function saveCustomTheme() {
  // We need to construct a theme definition object to save
  let newCustomTheme: ThemeDefinition = {
    dark: isCustomThemeDark.value,
    colors: {
      primary: previewColors.value.primary,
      secondary: previewColors.value.secondary,
      timerWarning: previewColors.value.timerWarning,
      timerDanger: previewColors.value.timerDanger,
      accent: previewColors.value.accent,
      error: previewColors.value.error,
      info: previewColors.value.info,
      success: previewColors.value.success,
      warning: previewColors.value.warning,
      background: previewColors.value.background,
      surface: previewColors.value.surface,
      highlight0: previewColors.value.highlight0,
      highlight1: previewColors.value.highlight1,
      highlight2: previewColors.value.highlight2,
      highlight3: previewColors.value.highlight3,
      'primary-darken-1': previewColors.value['primary-darken-1'],
      'secondary-darken-1': previewColors.value['secondary-darken-1'],
    },
  };
  // Set our name based on if it's a dark or light theme
  let savedName = isCustomThemeDark.value ? 'Custom Dark' : 'Custom Light';
  // Save it to the correct theme settings slot
  if (isCustomThemeDark.value) {
    themeSettingsStore.customDarkTheme = newCustomTheme;
  } else {
    themeSettingsStore.customLightTheme = newCustomTheme;
  }
  // Overwrite the existing theme in our themeListStore where the name matches our saved name
  themeListStore.themes = themeListStore.themes.map((theme) => {
    if (theme.name == savedName) {
      return {
        name: savedName,
        theme: newCustomTheme,
      };
    } else {
      return theme;
    }
  });
}

// Object containing user facing names for our color slots
const colorSlots: Record<string, string> = {
  primary: 'Primary',
  secondary: 'Secondary',
  background: 'Background',
  accent: 'Accent',
  error: 'Paused',
  highlight0: 'Box Highlight 1',
  highlight1: 'Box Highlight 2',
  highlight2: 'Box Highlight 3',
  highlight3: 'Box Highlight 4',
  timerWarning: 'Timer Warning',
  timerDanger: 'Timer Danger',
  info: 'Info',
  success: 'Success',
  warning: 'Warning',
  surface: 'Surface',
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
</script>

<template>
  <v-container class="d-flex flex-column align-center justify-center pa-0 ma-0">
    <v-sheet class="d-flex justify-center align-center pa-1" color="background">
      <v-sheet
        :elevation="0"
        class="ma-1 pa-3 rounded-xl"
        :theme="isPreviewDark ? 'dark' : 'light'"
        :color="previewColors.background">
        <v-sheet
          width="100%"
          :elevation="6"
          class="pa-0 ma-0"
          :color="borderColor"
          rounded="lg"
          :border="borderColor != 'none' ? 'lg opacity-12' : 'lg opacity-0'">
          <v-card
            class="rounded-lg"
            :color="previewColors.primary"
            :elevation="2">
            <v-card-title>
              <v-sheet
                color="transparent"
                class="d-flex pa-0 ma-0 justify-space-between align-center">
                <span>Theme Preview</span>
                <v-btn
                  :color="previewColors.secondary"
                  variant="flat"
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
                  <v-sheet
                    class="pa-1 rounded-sm"
                    :color="previewColors.timerWarning">
                    Player
                  </v-sheet>
                  <span
                    class="font-weight-bold"
                    :style="'color: ' + previewColors.timerWarning"
                    >03:42</span
                  >
                </v-container>
                <v-container
                  class="d-flex justify-space-around align-center pa-0 ma-0 w-auto">
                  <v-btn
                    :color="previewColors.secondary"
                    icon="mdi-refresh"
                    size="x-small">
                  </v-btn>
                  <v-divider vertical class="mx-1"></v-divider>
                  <v-btn
                    :color="previewColors['secondary-darken-1']"
                    icon="mdi-pause"
                    size="x-small">
                  </v-btn>
                  <v-divider vertical class="mx-1"></v-divider>
                  <v-btn
                    :color="previewColors.error"
                    icon="mdi-play"
                    size="x-small">
                  </v-btn>
                </v-container>
              </v-container>
            </v-card-subtitle>
            <v-divider class="mt-1"></v-divider>
            <v-card-text class="pa-0 ma-0">
              <v-sheet
                class="pa-1 rounded"
                :color="previewColors['primary-darken-1']">
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
                      <v-icon
                        size="x-large"
                        :color="previewColors.highlight0"
                        icon="mdi-circle">
                      </v-icon>
                    </v-btn>
                    <v-btn>
                      <v-icon
                        size="x-large"
                        :color="previewColors.highlight1"
                        icon="mdi-circle">
                      </v-icon>
                    </v-btn>
                    <v-btn>
                      <v-icon
                        size="x-large"
                        :color="previewColors.highlight2"
                        icon="mdi-circle">
                      </v-icon>
                    </v-btn>
                    <v-btn>
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
              </v-sheet>
            </v-card-text>
          </v-card>
        </v-sheet>
      </v-sheet>
    </v-sheet>
    <v-expansion-panels variant="accordion" class="px-3 pt-0 ma-0" model-value="settings">
      <v-expansion-panel value="settings">
        <v-expansion-panel-title> Theme Settings </v-expansion-panel-title>
        <v-expansion-panel-text
          class="d-flex flex-column justify-center align-center">
          <v-btn-toggle
            mandatory
            density="compact"
            rounded="xl"
            class="mb-1"
            v-model:model-value="themeSettingsStore.themeMode"
            @update:model-value="themeTypeChange">
            <v-btn value="dark">Dark</v-btn>
            <v-btn value="auto">Auto</v-btn>
            <v-btn value="light">Light</v-btn>
          </v-btn-toggle>
          <v-select
            class="flex-grow-1"
            :items="themeListStore.lightThemeNames"
            label="Select a light theme"
            v-model:model-value="selectedLightTheme"
            @update:model-value="loadThemePreview">
          </v-select>
          <v-select
            class="flex-grow-1"
            :items="themeListStore.darkThemeNames"
            label="Select a dark theme"
            v-model:model-value="selectedDarkTheme"
            @update:model-value="loadThemePreview">
          </v-select>
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel :style="devStore.devMode ? '' : 'display: none'">
        <v-expansion-panel-title> Custom Theme Editor </v-expansion-panel-title>
        <v-expansion-panel-text
          class="d-flex flex-column justify-center align-center">
          <v-sheet
            class="pa-0 ma-0 d-flex justify-space-between align-center"
            color="transparent">
            <v-btn density="compact" @click="saveCustomTheme">Save</v-btn>
            <v-btn class="mx-1" density="compact" disabled>Export</v-btn>
            <v-btn density="compact" disabled>Import</v-btn>
          </v-sheet>
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
            label="Select a color slot"
            v-model:model-value="selectedColorSlot"
            @update:model-value="colorSlotChange">
          </v-select>
          <v-color-picker
            v-model:model-value="selectedColorSlotColor"
            @update:model-value="updateCustomThemePreview()">
          </v-color-picker>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>
