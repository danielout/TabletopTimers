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
  },
  actions: {
    // Add a new player to the list
    addPlayer(name: string) {
      // Find the highest value of the 'id' property in the array of players
      const highestId = Math.max(...this.players.map((player) => player.id));
      // Create a new player with the next highest id
      const newPlayer = new Player(highestId + 1, name);
      this.players.push(newPlayer);
    },
    // Remove a player from the list
    removePlayer(id: number) {
      this.players.splice(id, 1);
    },
    // Pause all players
    pauseAll() {
      this.players.forEach((player) => player.pauseActionTimer());
    },
    // Resume all players
    resumeAll() {
      this.players.forEach((player) => player.resumeActionTimer());
    },
    // Reset all players
    resetAll() {
      this.players.forEach((player) => player.resetActionTimer());
    },
    sortPlayerList(
      sortBy: string,
      pausedOnBottom: boolean,
      reversed: boolean
    ): Array<Player> {
      const pausedList = this.pausedPlayers;
      const activeList = this.activePlayers;
      let sortedList: Array<Player> = [];
      // If we want paused players on the bottom, sort them separately and combine the lists
      if (!pausedOnBottom) {
        sortedList = this.sortByType(this.players, sortBy);
      } else {
        sortedList = this.sortByType(activeList, sortBy).concat(
          this.sortByType(pausedList, sortBy)
        );
      }

      // No idea why someone might want this, but hey, it's there
      if (reversed) {
        sortedList.reverse();
      }

      // Return the sorted list
      return sortedList;
    },
    // Return array of players sorted by desired method
    sortByType(sortedPlayer: Array<Player>, sortBy: string): Array<Player> {
      let sortedPlayers: Array<Player> = [];
      switch (sortBy) {
        case 'name':
          // Sort by name
          sortedPlayers = sortedPlayer.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          break;
        case 'actionTimer':
          // Sort by highest action timer
          sortedPlayers = sortedPlayer.sort(
            (a, b) => b.actionTimerSeconds - a.actionTimerSeconds
          );
          break;
        default:
          // Sort by id (default)
          sortedPlayers = sortedPlayer.sort((a, b) => a.id - b.id);
          break;
      }
      return sortedPlayers;
    },
    // Return average of player's action timers, omitting players specified in 'omittedPlayers' array
    averageActionTimer(omittedPlayers: Array<Player>): number {
      let total = 0;
      let count = 0;
      this.players.forEach((player) => {
        if (!omittedPlayers.includes(player)) {
          total += player.actionTimerSeconds;
          count++;
        }
      });
      return total / count;
    },
  },
  persist: true,
});
