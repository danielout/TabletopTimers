import { defineStore } from 'pinia';

export const themeStore = defineStore({
  id: 'theme',
  state: () => ({
    theme: 'dark',
    preferredDarkTheme: 'dark',
    preferredLightTheme: 'light',
  }),
});
