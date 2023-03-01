<script setup lang="ts">
// import appSettings from '@/App.vue';
import { appSettings } from '@/main';


let themeStyle = appSettings.theming.themeType;
console.log(appSettings)


</script>

<template>
    <v-container class="d-flex flex-column justify-center mb-0 pb-0">
        <v-expansion-panels variant="accordion">
            <v-expansion-panel>
                <v-expansion-panel-title>Display Toggles</v-expansion-panel-title>
                <v-expansion-panel-text>cheese</v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel>
                <v-expansion-panel-title>Theme Settings</v-expansion-panel-title>
                <v-expansion-panel-text><v-btn-toggle v-model="themeStyle">
                        <v-btn value="light">Light</v-btn>
                        <v-btn value="auto">Auto</v-btn>
                        <v-btn value="dark">Dark</v-btn>
                    </v-btn-toggle></v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel>
                <v-expansion-panel-title>Warning Settings</v-expansion-panel-title>
                <v-expansion-panel-text>cheese</v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-container>
</template>