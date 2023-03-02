<script setup lang="ts">
import { appSettings } from '@/main';
import TimerCard from '@/components/TimerCard.vue'
import TimerPanel from '@/components/TimerPanel.vue'



</script>

<template>
    <v-container class="d-flex flex-column justify-center mb-0 pb-0">
        <TimerCard v-if="appSettings.display.showBigTimer"></TimerCard>
        <TimerPanel v-if="appSettings.display.showExtraTimer"></TimerPanel>
    </v-container>
</template>