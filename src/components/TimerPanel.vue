<script setup lang="ts">
import { ref } from 'vue';
import Timer from 'easytimer.js';

let extraTimer = new Timer();
let timerString = ref("00:00");
let lastTimerString = ref("n/a");
let isPaused = ref(false);

extraTimer.addEventListener('secondsUpdated', function () {
    timerString.value = extraTimer.getTimeValues().toString(['minutes', 'seconds']);
});

extraTimer.start();

function doReset() {
    lastTimerString.value = extraTimer.getTimeValues().toString(['minutes', 'seconds'])
    extraTimer.reset();
}

function togglePause() {
    if (isPaused.value) {
        extraTimer.start();
    } else {
        extraTimer.pause();
    }
    isPaused.value = !isPaused.value;
}

</script>


<template>
    <v-expansion-panels>
        <v-container class="pt-0 px-0 pb-2">
            <v-expansion-panel>
                <v-expansion-panel-title>
                    <v-container class="d-flex justify-space-between align-center pa-0 ma-0">
                        <span class="pr-1">{{ timerString }}</span>
                        <v-container class="d-flex align-center pa-0 ma-0 w-auto">
                            <span class="pr-1"><v-btn color="warning" icon="mdi-refresh" size="x-small"
                                    @click.stop="doReset"></v-btn></span>
                            <v-btn :color="isPaused ? 'error' : 'success'" :icon="isPaused ? 'mdi-play' : 'mdi-pause'"
                                size="x-small" @click.stop="togglePause"></v-btn>
                        </v-container>
                    </v-container>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <v-container class="pa-0 ma-0 d-flex justify-space-between">
                        <span>Last Timer:</span>
                        <span>{{ lastTimerString }}</span>
                    </v-container>
                    <span class="text-body-2">The settings for this timer will live here in the future. Just dream of it for now. Pretend it rules.</span>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-container>
    </v-expansion-panels>
</template>

