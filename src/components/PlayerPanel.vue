<script setup lang="ts">

const props = defineProps<{
    playername?: string
    timer?: string
}>()

function hey() {
    console.log("hey " + props.playername);
}


</script>


<template>
    <v-container class="pt-0 px-0 pb-2">
        <v-expansion-panel>
            <v-expansion-panel-title>
                <v-container class="d-flex justify-space-between pa-0 ma-0">
                    <span>{{ playername ?? "name" }}</span>
                    <span>{{ timer }}</span>
                </v-container>
            </v-expansion-panel-title>
            <v-expansion-panel-text @click="hey">
                <v-container class="pa-0 ma-0 d-flex justify-space-between">
                    <span>Last Timer:</span>
                    <span>07:44</span>
                </v-container>
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-container>
</template>

