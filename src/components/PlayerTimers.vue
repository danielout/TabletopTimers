<script setup lang="ts">
import AddPlayer from '@/components/AddPlayer.vue'
import PlayerPanel from '@/components/PlayerPanel.vue'
import { players } from '@/main'


</script>


<template>
    <v-container class="d-flex flex-column justify-start px-0 mt-0 pt-1 h-100 align-self-start">
        <AddPlayer></AddPlayer>
        <v-container class="align-self-strech d-flex justify-center flex-column align-start">
            <v-expansion-panels>
                <PlayerPanel v-for="who in players" v-bind:key="who.id" :playerid=who.id>
                </PlayerPanel>

            </v-expansion-panels>
        </v-container>
    </v-container>
</template>