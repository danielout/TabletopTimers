import { Player } from '@/logic/playerManagement';
import { defineStore } from 'pinia';

interface SessionLog {
  id: number;
  isEnded: boolean;
  startTimestamp: number;
  endTimestamp: number;
  players: Player[];
  pauseLogs: PauseLog[];
  resetLogs: ResetLog[];
  sceneLogs: SceneLog[];
}

interface PauseLog {
  id: number;
  totalPausedTime: number;
}

interface ResetLog {
  id: number;
  resetTimerValue: number;
}

interface SceneLog {
  id: number;
  sceneTimerValue: number;
}

export const useSessionStore = defineStore({
  id: 'session',
  state: () => ({
    PreviousSession: {} as SessionLog,
    CurrentSession: {} as SessionLog,
  }),
  getters: {
    // Getters go here
  },
  actions: {
    // Start new session copies the current to the previous. If we have an existing players array, we'll use that.
    startNewSession(currentPlayers?: Player[]) {
      // Copy the current session to the previous session
      this.PreviousSession = this.CurrentSession;
      // Create a new session
      this.CurrentSession = {
        id: 0,
        isEnded: false,
        startTimestamp: Date.now(),
        endTimestamp: -1,
        players: currentPlayers ? currentPlayers : [],
        pauseLogs: [],
        resetLogs: [],
        sceneLogs: [],
      };
    },

    // End the session. This really just stops the session timer and makes some UI changes.
    endCurrentSession() {
      this.CurrentSession.isEnded = true;
      this.CurrentSession.endTimestamp = Date.now();
    },

    // Adding a player to our log
    addPlayer(who: Player) {
      this.CurrentSession.players.push(who);
    },

    // Gets the count of resets for a player in the current or previous session
    getResetCounts(whichSession: 'current' | 'previous', player: number) {
      let session: SessionLog;
      if (whichSession === 'current') {
        session = this.CurrentSession;
      } else {
        session = this.PreviousSession;
      }
      return session.resetLogs.filter((log) => log.id === player).length;
    },

    // Gets the total time paused for a player in the current or previous session
    getTotalPausedTime(whichSession: 'current' | 'previous', player: number) {
      let session: SessionLog;
      if (whichSession === 'current') {
        session = this.CurrentSession;
      } else {
        session = this.PreviousSession;
      }
      return session.pauseLogs
        .filter((log) => log.id === player)
        .reduce((total, log) => total + log.totalPausedTime, 0);
    },
    // Player timer calculator
    getPlayerTimerData(
      whichSession: 'current' | 'previous',
      whatType: 'totalPaused' | 'minReset' | 'maxReset' | 'avgReset',
      player: number
    ) {
      let session: SessionLog;
      if (whichSession === 'current') {
        session = this.CurrentSession;
      } else {
        session = this.PreviousSession;
      }
      const playerData = session.players.find((p) => p.id === player);
      if (!playerData) {
        console.log(
          "Somehow we tried to retrieve player data for a player that doesn't exist. Check that your players has not had all record of their existence erased from time and space."
        );
        return -1;
      }
      const playerResetLogs = session.resetLogs.filter(
        (log) => log.id === player
      );
      const playerPauseLogs = session.pauseLogs.filter(
        (log) => log.id === player
      );
      switch (whatType) {
        case 'totalPaused':
          return playerPauseLogs.reduce(
            (total, log) => total + log.totalPausedTime,
            0
          );
        case 'minReset':
          return Math.min(...playerResetLogs.map((log) => log.resetTimerValue));
        case 'maxReset':
          return Math.max(...playerResetLogs.map((log) => log.resetTimerValue));
        case 'avgReset':
          return (
            playerResetLogs.reduce(
              (total, log) => total + log.resetTimerValue,
              0
            ) / playerResetLogs.length
          );
        default:
          return -1;
      }
    },
    // Scene timer calculator - no need to care about the id.
    getSceneTimerData(
      whichSession: 'current' | 'previous',
      whatType: 'min' | 'max' | 'avg'
    ) {
      let session: SessionLog;
      if (whichSession === 'current') {
        session = this.CurrentSession;
      } else {
        session = this.PreviousSession;
      }
      const sceneResetLogs = session.sceneLogs;
      switch (whatType) {
        case 'min':
          return Math.min(...sceneResetLogs.map((log) => log.sceneTimerValue));
        case 'max':
          return Math.max(...sceneResetLogs.map((log) => log.sceneTimerValue));
        case 'avg':
          return (
            sceneResetLogs.reduce(
              (total, log) => total + log.sceneTimerValue,
              0
            ) / sceneResetLogs.length
          );
        default:
          return -1;
      }
    },
  },
});
