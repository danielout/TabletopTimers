<script setup lang="ts">
import AddPlayer from '@/components/AddPlayer.vue'
import PlayerPanel from '@/components/PlayerPanel.vue'

const fakeData: Array<Record<string, string>> = [
    {
        pname: 'Lego-less McBowman',
        ptime: '01:32'
    },
    {
        pname: 'Sir Lancealittle',
        ptime: '21:12'
    },
    {
        pname: 'Kesha',
        ptime: '69:02'
    },
    {
        pname: 'xXx_420BlazeIt_xXx',
        ptime: '00:00'
    }

]


</script>

<template>
    <v-container class="d-flex flex-column justify-start px-0 mt-0 pt-1 h-100 align-self-start">
        <AddPlayer></AddPlayer>
        <v-container class="align-self-strech d-flex justify-center flex-column align-start">
            <v-expansion-panels>
                <PlayerPanel v-for="who in fakeData" v-bind:key="who.pname" :playername=who.pname :timer=who.ptime>
                </PlayerPanel>
                
            </v-expansion-panels>
        </v-container>
    </v-container>
</template>