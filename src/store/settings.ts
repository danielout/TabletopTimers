import { defineStore } from 'pinia';

export const useSettingsStore = defineStore({
  id: 'settings',
  state: () => ({
    // Toggle component display
    showBigTimer: true,
    showPlayerTimers: true,
    showExtraTimer: true,

    // Player Timer Warnings
    enableTimerWarnings: true,
    warningThresholdType: 'relative',
    warningThreshold: 5,
    warningIntensity: 'low',
    minWarningTime: 300,

    // Player Sorting
    enableAutoSort: true,
    sortPlayersBy: 'name',
    pausedOnBottom: true,

    // Player Timer Display
    forceExpandedTimers: false,
    hideHighligtButtons: false,
  }),
  persist: true,
});
