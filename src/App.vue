
<script setup lang="ts">
import MenuBar from '@/components/MenuBar.vue'
import HeaderTimers from '@/components/HeaderTimers.vue'
import PlayerTimers from '@/components/PlayerTimers.vue'

</script>

<template>
  <v-app>
    <MenuBar></MenuBar>

    <v-main class="d-flex flex-column h-100 align-start">
      <HeaderTimers />
      <PlayerTimers />
    </v-main>
  </v-app>
</template>

