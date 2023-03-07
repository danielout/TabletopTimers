<script setup lang="ts">
import { ref } from 'vue';
import Timer from 'easytimer.js';

let timerRef = ref(new Timer());
let timerString = ref('00:00');
let lastTimerString = ref('n/a');
let isPaused = ref(false);

timerRef.value.addEventListener('secondsUpdated', function () {
  timerString.value = timerRef.value
    .getTimeValues()
    .toString(['minutes', 'seconds']);
});

timerRef.value.start();

function doReset() {
  lastTimerString.value = timerRef.value
    .getTimeValues()
    .toString(['minutes', 'seconds']);
  timerRef.value.reset();
}

function togglePause() {
  if (isPaused.value) {
    timerRef.value.start();
  } else {
    timerRef.value.pause();
  }
  isPaused.value = !isPaused.value;
}
</script>

<template>
  <v-card :elevation="3" class="pa-1 mb-2">
    <v-card-title class="pa-1 d-flex justify-center">
      {{ timerString }}
    </v-card-title>
    <v-card-text class="pa-1 d-flex justify-center">
      Last Timer: {{ lastTimerString }}
    </v-card-text>

    <v-card-actions class="d-flex justify-space-around align-center">
      <v-btn @click="doReset" color="secondary" variant="flat">
        Reset
      </v-btn>
      <v-btn
        :color="isPaused ? 'error' : 'secondary-darken-1'"
        variant="flat"
        @click="togglePause"
        class="w-99">
        {{ isPaused ? 'Resume' : 'Pause' }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
