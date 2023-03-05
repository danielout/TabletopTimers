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
    warningsRelative: true,
    warningRelativeThreshold: 150,
    warningAbsoluteThreshold: 5,
    warningIntensityString: "low", // low, medium, high
    minWarningTime: 15,

    // Player Sorting
    enableAutoSort: true,
    sortPlayersBy: 'name',  // name, actionTimer, id
    pausedOnBottom: true,
    reverseSort: false,

    // Player Timer Display
    forceExpandedTimers: false,
    hideHighligtButtons: false,
  }),
  getters: {
    warningTriggerMultiplier(): number {
      return this.warningRelativeThreshold / 100;
    },
    warningTriggerAbosolute(): number {
      return this.warningAbsoluteThreshold * 60;
    },
    warningIntensityNumber(): number {
      switch (this.warningIntensityString) {
        case 'low':
          return 0;
        case 'medium':
          return 1;
        case 'high':
          return 2;
        default:
          return -1;
      }
    }
  },
  actions: {
    exceedsWarningThreshold(average: number, timer: number): boolean {
      // Don't trigger warnings for timers that are too short
      if (timer < this.minWarningTime) {
        return false;
      }
      // Is the current timer longer than the warning threshold?
      return timer >= this.getMinWarningTime(average);
    },
    // Gets what our warning threshold should be based on the warning type
    getMinWarningTime(average: number): number {
      if (this.warningsRelative) {
        return average * this.warningTriggerMultiplier;
      } else {
        return average + this.warningTriggerAbosolute;
      }
    },
    // Gets the severity of the warning, based on how close the timer is to the warning threshold
    warningThresholdSeverity(average: number, timer: number): number {
      const minSeverity = this.getMinWarningTime(average);
      const maxSeverity = minSeverity * 2;
      // Return a value between 0 and 1, based on where 'timer' falls between 'minSeverity' and 'maxSeverity'
      return (timer - minSeverity) / (maxSeverity - minSeverity);
    }
  },
  persist: true,
});
