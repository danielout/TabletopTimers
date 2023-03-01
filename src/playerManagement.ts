import { Timer } from "easytimer.js";


export class Player {
    id: number;
    name: string;
    actionTimer: Timer;
    extraTimer: Timer;
    reminderFlag: "none" | "mild" | "severe" = "none";

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.actionTimer = new Timer();
        this.extraTimer = new Timer();

        this.actionTimer.start();
        this.extraTimer.start();
    }
}

