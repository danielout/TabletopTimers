import { defineStore } from 'pinia';
import { ThemeDefinition } from 'vuetify/lib/framework.mjs';

export const useThemeSettingsStore = defineStore({
  id: 'themeSettings',
  state: () => ({
    themeMode: 'dark' as 'dark' | 'light' | 'auto',
    currentMode: 'dark',
    preferredDarkTheme: 'dark',
    preferredLightTheme: 'light',
    customDarkTheme: defaultDarkTheme.theme as ThemeDefinition,
    customLightTheme: defaultLightTheme.theme as ThemeDefinition,
  }),
  persist: true,
});

export const useThemeListStore = defineStore({
  id: 'themes',
  state: () => ({
    themes: [defaultDarkTheme, defaultLightTheme] as ThemeData[],
  }),
  getters: {
    themeCount(): number {
      return this.themes.length;
    },
    themeNames(): Array<string> {
      return this.themes.map((theme) => theme.name);
    },
    darkThemeNames(): Array<string> {
      return this.themes
        .filter((theme) => theme.theme.dark)
        .map((theme) => theme.name);
    },
    lightThemeNames(): Array<string> {
      return this.themes
        .filter((theme) => !theme.theme.dark)
        .map((theme) => theme.name);
    },
  },
  actions: {
    addTheme(name: string, theme: ThemeDefinition) {
      this.themes.push({ name, theme });
    },
  },
});

interface ThemeData {
  name: string;
  theme: ThemeDefinition;
}

const defaultDarkTheme: ThemeData = {
  name: 'Default Dark',
  theme: {
    dark: true,
    colors: {
      background: '#161613',
      surface: '#2A2E45',
      primary: '#5F61AB',
      'primary-darken-1': '#464886',
      secondary: '#7CC6FE',
      'secondary-darken-1': '#35A6FD',
      error: '#B00020',
      info: '#2196F3',
      success: '#4CAF50',
      warning: '#FB8C00',
      highlight0: '#FF0000',
      highlight1: '#FF7F00',
      highlight2: '#FFFF00',
      highlight3: '#00FF00',
      timerWarning: '#f3fe3b',
      timerDanger: '#fd7d2d',
    },
  },
};

const defaultLightTheme: ThemeData = {
  name: 'Default Light',
  theme: {
    dark: false,
    colors: {
      background: '#000',
      surface: '#FFFFFF',
      primary: '#6200EE',
      'primary-darken-1': '#3700B3',
      secondary: '#03DAC6',
      'secondary-darken-1': '#018786',
      error: '#B00020',
      info: '#2196F3',
      success: '#4CAF50',
      warning: '#FB8C00',
      highlight0: '#FF0000',
      highlight1: '#FF7F00',
      highlight2: '#FFFF00',
      highlight3: '#00FF00',
      timerWarning: '#55CCCC',
      timerDanger: '#000055',
    },
  },
};
