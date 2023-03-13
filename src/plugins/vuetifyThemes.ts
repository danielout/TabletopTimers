import { ThemeDefinition } from 'vuetify';

// Define type of record for defindThemes
export type ThemeRecord = Record<string, ThemeDefinition>;

const MintMarauders: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#8FC77D',
    surface: '#CFFFDC',
    primary: '#AFFFC8',
    'primary-darken-1': '#4b4d97',
    secondary: '#33B686',
    'secondary-darken-1': '#1fa272',
    error: '#F3E61E',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
    highlight0: '#9E0202',
    highlight1: '#9C2695',
    highlight2: '#0CCAE6',
    highlight3: '#52851A',
    timerWarning: '#CF6DCFAF',
    timerDanger: '#E7345D',
    accent: '#9B2828',
  },
};

const VoidVoyagers: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#160622',
    surface: '#230425',
    primary: '#1B0F3D',
    'primary-darken-1': '#070029',
    secondary: '#523A9E',
    'secondary-darken-1': '#3e268a',
    error: '#701B2C',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
    highlight0: '#921AB1',
    highlight1: '#26A372',
    highlight2: '#E7E0B8',
    highlight3: '#DB3939',
    timerWarning: '#914B91',
    timerDanger: '#E02061',
  },
};

const VerdantExplorers: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#0F2910',
    surface: '#3C640C',
    primary: '#253125',
    'primary-darken-1': '#111d11',
    secondary: '#B9E0B5AF',
    'secondary-darken-1': '#a5cca1',
    error: '#1E6322',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
    highlight0: '#921AB1',
    highlight1: '#26A372',
    highlight2: '#E7E0B8',
    highlight3: '#DB3939',
    timerWarning: '#4C8A4F',
    timerDanger: '#D2D83C',
  },
};

const CherubChasers: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#ECECEC',
    surface: '#FFEE69',
    primary: '#D8C2E4',
    'primary-darken-1': '#c4aed0',
    secondary: '#ECECECAF',
    'secondary-darken-1': '#d8d8d8',
    error: '#ECA475',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
    highlight0: '#B92929',
    highlight1: '#4847A3',
    highlight2: '#4C884A',
    highlight3: '#6E0E83',
    timerWarning: '#FAFFD2',
    timerDanger: '#FF4949',
  },
};

const BluesteelCitadel: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#151924',
    surface: '#181A4B',
    primary: '#1C2346',
    'primary-darken-1': '#080f32',
    secondary: '#5B7C8D',
    'secondary-darken-1': '#476879',
    error: '#ECA475',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
    highlight0: '#B92929',
    highlight1: '#D8C872',
    highlight2: '#96D147',
    highlight3: '#F070D1',
    timerWarning: '#BBA533',
    timerDanger: '#D64E13',
  },
};

const Lysithia: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#20041E',
    surface: '#332E31CF',
    'surface-variant': '#BDBDBD',
    'on-surface-variant': '#424242',
    primary: '#3A0101',
    'primary-darken-1': '#260000',
    secondary: '#921890',
    'secondary-darken-1': '#7e047c',
    error: '#B42727',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
    highlight0: '#E41414',
    highlight1: '#D70FE2',
    highlight2: '#8BE625',
    highlight3: '#FDCE65',
    timerWarning: '#B92BB9',
    timerDanger: '#D33232',
  },
};

const Kristov: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#3B3B3B',
    surface: '#77A0A2',
    'surface-variant': '#BDBDBD',
    'on-surface-variant': '#424242',
    primary: '#7DF9FF',
    'primary-darken-1': '#69e5eb',
    secondary: '#F7F648',
    'secondary-darken-1': '#e3e234',
    error: '#FD7A62',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
    highlight0: '#B92929',
    highlight1: '#2BFF8B',
    highlight2: '#3C27A3',
    highlight3: '#F070D1',
    timerWarning: '#D37109',
    timerDanger: '#F1195C',
  },
};

// Make sure this is at the bottom of the file so that the themes are defined before they are used. You know, like a smart person would.
export const definedThemes: ThemeRecord = {
  MintMarauders,
  VoidVoyagers,
  VerdantExplorers,
  CherubChasers,
  BluesteelCitadel,
  Lysithia,
  Kristov,
};

// Retreive a theme by name
export const getTheme = (
  themeName: keyof typeof definedThemes
): ThemeDefinition => {
  return definedThemes[themeName];
};

// Get all keys of definedThemes
export const getThemeNames = (): Array<keyof typeof definedThemes> => {
  return Object.keys(definedThemes) as Array<keyof typeof definedThemes>;
};

// Get all keys of definedThemes where dark is true
export const getDarkThemeNames = (): Array<keyof typeof definedThemes> => {
  return getThemeNames().filter((themeName) => getTheme(themeName).dark);
};

// Get all keys of definedThemes where dark is false
export const getLightThemeNames = (): Array<keyof typeof definedThemes> => {
  return getThemeNames().filter((themeName) => !getTheme(themeName).dark);
};
