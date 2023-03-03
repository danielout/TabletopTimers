import { defineStore } from 'pinia';
import { Timer } from 'easytimer.js';

export const bigTimerStore = defineStore({
  id: 'bigTimer',
  state: () => ({
    time: Timer,
    paused: true,
    warning: false,
  }),
  getters: {
    time(): number {
      return this.time;
    },
    paused(): boolean {
      return this.paused;
    },
    warning(): boolean {
      return this.warning;
    },
  },
});

export const extraTimerStore = defineStore({
  id: 'timers',
  state: () => ({
    timers: Array<Timer>(), // Array of timers
  }),
  getters: {
    timerCount(): number {
      return this.timers.length;
    },
  },
});
