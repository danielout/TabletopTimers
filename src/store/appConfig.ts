import { defineStore } from 'pinia';

export const useAppConfigStore = defineStore({
  id: 'appConfig',
  state: () => ({
    // Non-User Facing Settings
    showTutorial: false,
    windowNames: [
      { title: 'Timers' },
      { title: 'Settings' },
      { title: 'Themes' },
      { title: 'About' },
    ],
    startingAppScreen: 'Timers',
    currentWindow: 'Timers',
  }),
});
