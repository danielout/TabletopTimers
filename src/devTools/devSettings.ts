import { defineStore } from 'pinia';

// This is a store that is only used in development mode
export const useDevStore = defineStore({
  id: 'dev',
  state: () => ({
    devMode: true,
    loadDummyPlayers: true,
    overrideStartingScreen: false,
    startingAppScreen: 'About',
  }),
});
