<script setup lang="ts">
import AddPlayer from '@/components/AddPlayer.vue'
import PlayerPanel from '@/components/PlayerPanel.vue'
import { players } from '@/main'

function pauseAll() {
    players.forEach(player => {
        player.pauseActionTimer();
    });
}

function resetAll() {
    players.forEach(player => {
        player.resetActionTimer();
    });
}

</script>


<template>
    <v-container class="d-flex flex-column justify-start px-0 mt-0 pt-1 h-100 align-self-start">
        <AddPlayer></AddPlayer>
    <v-container class="d-flex flex-row justify-space-around w-80 align-center pa-0 ma-0">
        <v-btn size="small" color="primary" class="w-40" @click="resetAll()">Reset All</v-btn>
        <v-btn size="small" color="primary" class="w-40" @click="pauseAll()">Pause All</v-btn>
        </v-container>
        <v-container class="align-self-strech d-flex justify-center flex-column align-start">
            <v-expansion-panels >
                <PlayerPanel v-for="who in players" v-bind:key="who.id" :playerid=who.id>
                </PlayerPanel>
            </v-expansion-panels>
        </v-container>
    </v-container>
</template>