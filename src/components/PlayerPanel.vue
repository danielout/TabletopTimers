<script setup lang="ts">
import { ref } from 'vue';
import { players } from '@/main';


const props = defineProps<{
    playerid: number
}>()

const thisPlayer = players[props.playerid];

let timerString = ref("00:00");
let lastTimerString = ref("n/a");
let isPaused = ref(false);

thisPlayer.actionTimer.addEventListener('secondsUpdated', function () {
    timerString.value = thisPlayer.actionTimer.getTimeValues().toString(['minutes', 'seconds']);
});

function doReset() {
    lastTimerString.value = thisPlayer.actionTimer.getTimeValues().toString(['minutes', 'seconds'])
    thisPlayer.actionTimer.reset();
}

function togglePause() {
    if (isPaused.value) {
        thisPlayer.actionTimer.start();
    } else {
        thisPlayer.actionTimer.pause();
    }
    isPaused.value = !isPaused.value;
}

</script>


<template>
    <v-container class="pt-0 px-0 pb-2">
        <v-expansion-panel>
            <v-expansion-panel-title>
                <v-container class="d-flex justify-space-between align-center pa-0 ma-0">
                    <span>{{ thisPlayer.name }}</span>
                    <v-container class="d-flex align-center pa-0 ma-0 w-auto">
                        <span class="pr-1">{{ timerString }}</span>
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
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-container>
</template>

