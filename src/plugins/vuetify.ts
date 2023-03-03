/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { md2 } from 'vuetify/blueprints';

// Composables
import { ThemeDefinition, createVuetify } from 'vuetify';

const darkPlumTheme: ThemeDefinition = {
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
  },
};

const lightTheme: ThemeDefinition = {
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
  },
};

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  blueprint: md2,
  theme: {
    defaultTheme: 'darkPlumTheme',
    themes: {
      darkPlumTheme,
      lightTheme,
    },
  },
});
