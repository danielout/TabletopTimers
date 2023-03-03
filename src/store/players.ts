import { defineStore } from 'pinia';
import { Player } from '@/logic/playerManagement';

export const playersStore = defineStore({
    id: 'players',
    state: () => ({
        players: Array<Player>(),
    }),
    getters: {
        playerCount(): number {
            return this.players.length;
        }
    }
});

