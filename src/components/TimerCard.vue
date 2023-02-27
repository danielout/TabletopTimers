<script setup lang="ts">

function consoleMe() {
    console.log("hello")
}

</script>

<template>
    <v-card :elevation="3" class="pa-1 mb-2">
        <v-card-title class="pa-1 d-flex justify-center">
            02:13
        </v-card-title>
        <v-card-text class="pa-1 d-flex justify-center">
            Last Timer: 05:48
        </v-card-text>

        <v-card-actions class="d-flex justify-space-evenly">
            <v-btn @click="consoleMe" color="secondary" variant="tonal">
                Reset
            </v-btn>
            <v-btn color="primary" variant="flat">
                Pause
            </v-btn>
        </v-card-actions>
    </v-card>
</template>