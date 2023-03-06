// Import any needed logic bits
import { Timer } from 'easytimer.js';

export class Player {
  id: number;
  name: string;
  actionTimer: Timer;
  extraTimer: Timer;
  reminderFlag: string = 'none';
  actionTimerString: string = '00:00';
  extraTimerString: string = '00:00';
  actionTimerPaused: boolean = false;
  extraTimerPaused: boolean = false;
  lastActionTimer: string = '00:00';
  lastExtraTimer: string = '00:00';

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.actionTimer = new Timer();
    this.extraTimer = new Timer();
    this.actionTimer.start();
    this.extraTimer.start();
  }

  pauseActionTimer() {
    this.actionTimer.pause();
    this.actionTimerPaused = true;
  }

  resumeActionTimer() {
    this.actionTimer.start();
    this.actionTimerPaused = false;
  }

  pauseExtraTimer() {
    this.extraTimer.pause();
    this.extraTimerPaused = true;
  }

  resumeExtraTimer() {
    this.extraTimer.start();
    this.extraTimerPaused = false;
  }

  resetActionTimer() {
    this.lastActionTimer = this.actionTimer
      .getTimeValues()
      .toString(['minutes', 'seconds']);
    this.actionTimerString = '00:00';
    this.actionTimer.reset();
    this.actionTimer.start();
    this.actionTimerPaused = false;
  }

  resetExtraTimer() {
    this.lastExtraTimer = this.extraTimer
      .getTimeValues()
      .toString(['minutes', 'seconds']);
    this.extraTimerString = '00:00';
    this.extraTimer.reset();
    this.extraTimer.start();
    this.extraTimerPaused = false;
  }

  toggleActionTimer() {
    if (this.actionTimerPaused) {
      this.resumeActionTimer();
    } else {
      this.pauseActionTimer();
    }
  }

  toggleExtraTimer() {
    if (this.extraTimerPaused) {
      this.resumeExtraTimer();
    } else {
      this.pauseExtraTimer();
    }
  }

  get actionTimerSeconds(): number {
    return this.actionTimer.getTotalTimeValues().seconds;
  }
}
