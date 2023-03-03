<script setup lang="ts">
// import appSettings from '@/App.vue';
import { appSettings, settingsRef } from '@/main';
import { SettingsManager } from '@/logic/SettingsManager.js';


//let themeStyle = appSettings.theming.themeType;

console.log(appSettings)

function writeSetting<cat extends keyof SettingsManager>(category: cat, setting: keyof SettingsManager[cat], value: any) {
    settingsRef.value[category][setting] = value;
    appSettings[category][setting] = value;

    // write to local storage
    localStorage.setItem('settings', JSON.stringify(settingsRef.value));
}


</script>

<template>
    <v-container class="d-flex flex-column justify-center mb-0 pb-0">
        <v-expansion-panels variant="accordion">
            <v-expansion-panel>
                <v-expansion-panel-title>Display Toggles</v-expansion-panel-title>
                <v-expansion-panel-text>
                    <v-container class="d-flex flex-column ma-0 pa-0 w-100">
                        <v-container class="d-flex flex-row justify-space-between align-center ma-0 pa-0">
                            <span class="w-100">Display Big Timer</span>
                            <v-switch hide-details='auto' color="secondary" density="compact"
                                :model-value="appSettings.display.showBigTimer"
                                @update:model-value="writeSetting('display', 'showBigTimer', !appSettings.display.showBigTimer)">
                            </v-switch>
                        </v-container>
                        <v-container class="d-flex flex-row justify-space-between align-center ma-0 pa-0">
                            <span class="w-100">Display Extra Timer</span>
                            <v-switch hide-details='auto' color="secondary" density="compact"
                                :model-value="appSettings.display.showExtraTimer"
                                @update:model-value="writeSetting('display', 'showExtraTimer', !appSettings.display.showExtraTimer)">
                            </v-switch>
                        </v-container>
                        <v-container class="d-flex flex-row justify-space-between align-center ma-0 pa-0">
                            <span class="w-100">Display Player Timers</span>
                            <v-switch hide-details='auto' color="secondary" density="compact"
                                :model-value="appSettings.display.showPlayerTimers"
                                @update:model-value="writeSetting('display', 'showPlayerTimers', !appSettings.display.showPlayerTimers)">
                            </v-switch>
                        </v-container>
                    </v-container>
                </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel>
                <v-expansion-panel-title>Theme Settings</v-expansion-panel-title>
                <v-expansion-panel-text class="d-flex flex-column justify-center align-center">                    
                    <v-btn-toggle disabled mandatory :model-value="settingsRef.theming.themeType" class="mb-1">
                        <v-btn value="light" @click="writeSetting('theming', 'themeType', 'light')"
                            class="w-33">Light</v-btn>
                        <v-btn value="auto" @click="writeSetting('theming', 'themeType', 'auto')" class="w-33">Auto</v-btn>
                        <v-btn value="dark" @click="writeSetting('theming', 'themeType', 'dark')" class="w-33">Dark</v-btn>
                    </v-btn-toggle>
                    <v-select disabled class="mt-1 mb-1" persistent-hint density="compact" hint="Theme used for dark mode"
                        label="Dark Theme" :items="['Default', 'Cheesecake', 'Placeholder Tired']">
                    </v-select>
                    <v-select disabled label="Light Theme" persistent-hint density="compact" hint="Theme used for light mode"
                        :items="['Default', 'Summertime', 'Aurora']">
                    </v-select>
                </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel>
                <v-expansion-panel-title>Player Warnings</v-expansion-panel-title>
                <v-expansion-panel-text class="d-flex flex-column justify-center align-center">
                    <v-container class="d-flex flex-row justify-space-between align-center ma-0 pa-0">
                            <span class="w-100">Display Player Timers</span>
                            <v-switch disabled hide-details='auto' color="secondary" density="compact">
                            </v-switch>
                    </v-container>
                    <div class="text-subtitle-2">Warning Intensity</div>
                    <v-btn-toggle disabled mandatory>
                        <v-btn value="low">Low</v-btn>
                        <v-btn value="medium">Medium</v-btn>
                        <v-btn value="high">High</v-btn>
                    </v-btn-toggle>
                    <div class="text-subtitle-2">Threshold Type</div>
                    <v-btn-toggle disabled mandatory>
                        <v-btn value="time">Time</v-btn>
                        <v-btn value="percent">Percent</v-btn>
                    </v-btn-toggle>
                    <div class="text-subtitle-2">Warning Threshold: </div>
                    <v-container class="d-flex flex-row align-center ma-0 pa-0">
                    <v-select disabled density="compact"
                    :items="[0,1,2,3,4,5,6,7,8,9]">
                    </v-select><v-select disabled density="compact"
                    :items="[0,1,2,3,4,5,6,7,8,9]">
                    </v-select>mins/pct
                    </v-container>
                    <div class="text-subtitle-2">Minimum Minutes: </div>
                    <v-container class="d-flex flex-row align-center justify-center ma-0 pa-0">
                        <v-switch disabled hide-details='auto' color="secondary" density="compact">
                            </v-switch>
                    <v-select disabled density="compact"
                    :items="[0,1,2,3,4,5,6,7,8,9]">
                    </v-select><v-select disabled density="compact"
                    :items="[0,1,2,3,4,5,6,7,8,9]">
                    </v-select>
                    </v-container>
                </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel>
                <v-expansion-panel-title>Player Sorting</v-expansion-panel-title>
                <v-expansion-panel-text class="d-flex flex-column justify-center align-center">
                    <v-container class="d-flex flex-row justify-space-between align-center ma-0 pa-0">
                            <span class="w-100">Autosort Players</span>
                            <v-switch disabled hide-details='auto' color="secondary" density="compact">
                            </v-switch>
                    </v-container>
                    <v-container class="d-flex flex-row justify-space-between align-center ma-0 pa-0">
                            <span class="w-100">Paused on Bottom</span>
                            <v-switch disabled hide-details='auto' color="secondary" density="compact">
                            </v-switch>
                    </v-container>
                    <div class="text-subtitle-2">Sort Type</div>
                    <v-btn-toggle disabled mandatory>
                        <v-btn value="name">Name</v-btn>
                        <v-btn value="maxTime">Max Time</v-btn>
                    </v-btn-toggle>
                    
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-container>
</template>