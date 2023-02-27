
export class CountUp {
    startTime: number;
    timerDuration: number;
    lastResetDuration: number;
    hasReset: boolean;
    formattedDuration: string;
    formattedLastDuration: string;

    constructor() {
        this.timerDuration = new Date().getTime();
        this.startTime = new Date().getTime();
        this.lastResetDuration = 0
        this.hasReset = false;
        this.formattedDuration = "00:00";
        this.formattedLastDuration = "00:00";
    }

    beginTimer() {
        setInterval(() => { this.updateTimer() }, 1000);
    }

    updateTimer(): void {
        this.timerDuration = new Date().getTime() - this.startTime;
        this.formattedDuration = this.formatTime(this.timerDuration);
    }

    resetTimer(): void {
        this.hasReset = true;
        this.lastResetDuration = this.timerDuration;
        this.timerDuration = 0;
        this.formattedDuration = this.formatTime(this.timerDuration);
        this.formattedLastDuration = this.formatTime(this.lastResetDuration);
        this.startTime = new Date().getTime();
    }

    formatTime(time: number): string {
        let minutes = Math.floor(time / 60000);
        let seconds = ((time % 60000) / 1000);
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds.toFixed(0)}`;
    }
}
