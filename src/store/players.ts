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
  },
});
