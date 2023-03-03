import { defineStore } from 'pinia';

// This is a store that is only used in development mode
export const devStore = defineStore({
    id: 'dev',
    state: () => ({
        devMode: true,
        startingAppScreen: "About",
        loadDummyPlayers: true,
    }),
    getters: {
        devMode(): boolean {
            return this.devMode;
        }
    }
});


/*
export const loadDummyPlayers = (): void => {
    // Load dummy players
    for (let i = 0; i < 5; i++) {
        playersStore.addPlayer(`Player ${i + 1}`);
    }
} */