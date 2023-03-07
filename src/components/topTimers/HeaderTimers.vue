<script setup lang="ts">
// Pull in our state management
import { useSettingsStore } from '@/store/settings';
import TimerCard from '@/components/topTimers/TimerCard.vue';
import TimerPanel from '@/components/topTimers/TimerPanel.vue';

const settingsStore = useSettingsStore();
</script>

<template>
  <v-container
    id="headerTimers"
    class="d-flex w-100 flex-column justify-center mb-0 pb-0">
    <TimerCard v-if="settingsStore.showBigTimer"></TimerCard>
    <TimerPanel v-if="settingsStore.showExtraTimer"></TimerPanel>
  </v-container>
</template>
