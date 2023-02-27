import { CountUp } from "./timers";


export class Player {
    name: string;
    actionTimer: CountUp;
    extraTimer: CountUp;

    constructor(name: string) {
        this.name = name;
        this.actionTimer = new CountUp();
        this.extraTimer = new CountUp();
    }
}