import { Timer } from "easytimer.js";
import { appSettings } from "../main";


export class Player {
    id: number;
    name: string;
    actionTimer: Timer;
    extraTimer: Timer;
    reminderFlag: "none" | "low" | "medium" | "high" = "none";
    actionTimerString: string = "00:00";
    extraTimerString: string = "00:00";
    actionTimerPaused: boolean = false;
    extraTimerPaused: boolean = false;
    lastActionTimer: string = "00:00";
    lastExtraTimer: string = "00:00";

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
        this.lastActionTimer = this.actionTimer.getTimeValues().toString(["minutes", "seconds"]);
        this.actionTimerString = "00:00";
        this.actionTimer.reset();
        this.actionTimer.start();
        this.actionTimerPaused = false;
    }

    resetExtraTimer() {
        this.lastExtraTimer = this.extraTimer.getTimeValues().toString(["minutes", "seconds"]);
        this.extraTimerString = "00:00";
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


}

export function calculateWarnings(players: Array<Player>) {
    // If warnings aren't enabled, turn them all off and nope on out.
    if (!appSettings.warning.enableTimerWarnings) {
        players.forEach(player => {
            player.reminderFlag = "none";
        });
        return;
    }

    // If we don't have at least 3 players, turn off all warnings
    if (players.length <= 2) {
        players.forEach(player => {
            player.reminderFlag = "none";
        });
        return;
    }

    // calculate the average action timer duration for all players
    let totalActionTimer = 0;
    let totalPlayers = 0;
    players.forEach(player => {
        if (player.actionTimer.getTimeValues().seconds > 0) {
            totalActionTimer += player.actionTimer.getTimeValues().seconds;
            totalPlayers++;
        }
    });
    const averageActionTimer = totalActionTimer / totalPlayers;

    // Apply the appropriate warning calculation
    if (appSettings.warning.warningThresholdType === "relative") {
        calculateRelativeWarnings(averageActionTimer, players);
    } else {
        calculateAbosoluteWarnings(averageActionTimer, players);
    }

}

function calculateRelativeWarnings(averageTimer: number, players: Array<Player>) {
    // use averageTimer and appSettings.warning.warningThreshold to calculate relative warnings
    const warningThresh = averageTimer * (1 + (appSettings.warning.warningThreshold / 100));
    players.forEach(player => {
        if (player.actionTimer.getTimeValues().seconds < appSettings.warningMimimumTime) { return; }
        if (player.actionTimer.getTimeValues().seconds > warningThresh) {
            player.reminderFlag = appSettings.warning.warningIntensity;
        } else {
            player.reminderFlag = "none";
        }
    });
}

function calculateAbosoluteWarnings(averageTimer: number, players: Array<Player>) {
    // use averageTimer and appSettings.warning.warningThreshold to calculate absolute warnings
    const warningThresh = averageTimer + appSettings.warning.warningThreshold;
    players.forEach(player => {
        if (player.actionTimer.getTimeValues().seconds > warningThresh) {
            player.reminderFlag = appSettings.warning.warningIntensity;
        } else {
            player.reminderFlag = "none";
        }
    });
}