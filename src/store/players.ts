import { defineStore } from 'pinia';
import { Player } from '@/logic/playerManagement';

export const usePlayerStore = defineStore({
  id: 'players',
  state: () => ({
    players: Array<Player>(),
  }),
  getters: {
    playerCount(): number {
      return this.players.length;
    },
    allPaused(): boolean {
      return this.players.every((player) => player.actionTimerPaused);
    },
    // Return a list of players that are not paused
    activePlayers(): Array<Player> {
      return this.players.filter((player) => !player.actionTimerPaused);
    },
    // Return a list of players that are paused
    pausedPlayers(): Array<Player> {
      return this.players.filter((player) => player.actionTimerPaused);
    },
    // Return a lsit of players sorted by name
    sortedPlayers(): Array<Player> {
      return this.players.sort((a, b) => a.name.localeCompare(b.name));
    },
    // Return a list of players sorted by highest actionTimer
    sortedByTime(): Array<Player> {
      return this.players.sort((a, b) => b.actionTimer.getTotalTimeValues().seconds - a.actionTimer.getTotalTimeValues().seconds);
    },
    // Return a list of players sorted by highest extraTimer
    sortedByExtraTime(): Array<Player> {
      return this.players.sort((a, b) => b.extraTimer.getTotalTimeValues().seconds - a.extraTimer.getTotalTimeValues().seconds);
    },
    // return a list of players sorted by name, but with paused players on the bottom
    sortedPlayersWithPausedOnBottom(): Array<Player> {
      return this.players.sort((a, b) => {
        if (a.actionTimerPaused && !b.actionTimerPaused) {
          return 1;
        } else if (!a.actionTimerPaused && b.actionTimerPaused) {
          return -1;
        } else {
          return a.name.localeCompare(b.name);
        }
      });
    },
    // Return a list of players sorted by highest actionTimer, but with paused players on the bottom
    sortedByTimeWithPausedOnBottom(): Array<Player> {
      return this.players.sort((a, b) => {
        if (a.actionTimerPaused && !b.actionTimerPaused) {
          return 1;
        } else if (!a.actionTimerPaused && b.actionTimerPaused) {
          return -1;
        } else {
          return b.actionTimer.getTotalTimeValues().seconds - a.actionTimer.getTotalTimeValues().seconds;
        }
      });
    }
}});
