import { defineStore } from 'pinia';

export const useSettingsStore = defineStore({
    id: 'settings',
    state: () => ({
        display: {
            showBigTimer: true,
            showPlayerTimers: true,
            showExtraTimer: true
        },
        warning: {
            enableTimerWarnings: true,
            warningThresholdType: "absolute",
            warningThreshold: 5,
            warningIntensity: "medium"
        }
    }),
    getters: {
        warningMimimumTime(): number {
            return 300;
        }
    }
});