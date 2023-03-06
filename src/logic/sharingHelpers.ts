/*
  Handle generating sharable strings for saving party info, themes, whatever.

*/
import { ThemeDefinition } from 'vuetify';
import { Player } from '@/logic/playerManagement';

// Convert a themeDefinition to a string that can be used to recreate it.
export function themeDefinitionToString(
  themeDefinition: ThemeDefinition
): string {
  return JSON.stringify(themeDefinition);
}

// Convert a string to a themeDefinition that can be used to recreate it.
export function stringToThemeDefinition(themeString: string): ThemeDefinition {
  return JSON.parse(themeString);
}

// Convert an array of Player objects to a string that can be used to recreate it.
export function playersToString(players: Player[]): string {
  return JSON.stringify(players);
}

// Convert a string to an array of Player objects that can be used to recreate it.
export function stringToPlayers(playersString: string): Player[] {
  return JSON.parse(playersString);
}
