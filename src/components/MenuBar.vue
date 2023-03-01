
<script setup lang="ts">

const items = [
    { title: 'Settings' },
    { title: 'Help' },
    { title: 'About' },
];

</script>


<template>
    <v-app-bar :elevation="2" density="compact">
        <v-app-bar-title>Tabletop Tracker</v-app-bar-title>
        <template v-slot:append>
            <v-menu transition="slide-x-reverse-transition">
                <template v-slot:activator="{ props }">
                    <v-btn icon="mdi-dots-vertical" color="primary" v-bind="props">

                    </v-btn>
                </template>

                <v-list>
                    <v-list-item v-for="(item, i) in items" :key="i">
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>

        </template>
    </v-app-bar>
</template>