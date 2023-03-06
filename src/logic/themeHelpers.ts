// Import logic and type info
import { ThemeDefinition } from 'vuetify';
// Import our data
import { useThemeSettingsStore, useThemeListStore } from '@/store/themes';
const themeSettings = useThemeSettingsStore();
const themeList = useThemeListStore();

// Return what theme type we should use
export function getThemeType(): string {
  if (themeSettings.themeMode == 'dark') {
    return 'dark';
  } else if (themeSettings.themeMode == 'light') {
    return 'light';
  } else {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
}

// Return the name of the theme we should currently be using
export function getThemeName(): string {
  if (getThemeType() == 'dark') {
    return themeSettings.preferredDarkTheme;
  } else {
    return themeSettings.preferredLightTheme;
  }
}

// Get a theme object from the theme list by name
export function getThemeByName(name: string): ThemeDefinition {
  let themeCheck: ThemeDefinition = {};
  try {
    themeCheck = themeList.themes.find((theme) => theme.name == name)!.theme;
  } catch (error) {
    console.error('Theme not found: ' + name);
  }
  if (themeCheck) {
    return themeCheck;
  }
  return {};
}

// Get current desired theme
export function getCurrentTheme(): ThemeDefinition {
  return getThemeByName(getThemeName());
}
