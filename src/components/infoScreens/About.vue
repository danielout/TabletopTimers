<script setup lang="ts">
function openGithubProject() {
  window.open('https://github.com/danielout/TabletopTimers/', '_blank');
}
</script>

<template>
  <v-container class="d-flex flex-column justify-center mb-0 pb-0">
    <v-card :elevation="3" class="pa-1 mb-2 rounded-lg" color="secondary">
      <v-card-title class="pa-1 d-flex justify-center">
        About Tabletop Timers
      </v-card-title>
      <v-card-text>
        <v-sheet color="primary" class="pa-2 rounded-lg mb-2"
          ><p>
            Tabletop Timers is a tool to help GMs/DMs/storytellers/etc keep an
            eye on all their players. Especially with large groups, it is easy
            for quiet players to go unnoticed for a while. This tool lets you
            keep a timer running for each player, and reset it whenever they
            contribute to the scene. If one timer starts to get much higher than
            the rest, we highlight it to call it out. Tabletop Timers also runs
            a single large timer at the top intended to help manage how long you
            spend on a scene if you're juggling a split party.
          </p>
          <v-divider class="mt-1 mb-1"></v-divider>
          <p>
            Hopefully this tool helps people! Remember, this tool is here to
            help make your game smoother, not control its every move. I tried to
            provide enough customization in the settings to help tailor it to
            what you need, but at the end of the day I can't account for every
            preference.
          </p></v-sheet
        >

        <v-sheet color="primary" class="pa-2 rounded-lg mb-2">
          <p>
            Everything was built using TypeScript, VueJS, Pinia, and Vuetify.
            The real heavy lifting is done by easytimers.js, though, which
            prevented me from having to write my own complex timer
            implementation. Huge thanks to all those projects, without whom
            making this would have been a huge hassle.
          </p>
          <v-divider class="mt-1 mb-1"></v-divider>
          <p>
            If you'd like to contribute to this project, please do! I'm most
            definitely not a software engineer by trade, so anything from
            tidying up ugly code to tackling a feature from the todo list would
            be super awesome.
          </p>
        </v-sheet>

        <v-sheet color="primary" class="pa-2 rounded-lg mb-2">
          <p>
            Extra, extra special thanks to Brandon who lovingly runs our Blades
            in the Dark campaign, without whom this tracker would never exist
            for so many reasons. Also to all the other characters in that
            campaign, who everyone plays with such gusto and spirit they Duskvol
            truly does not know that the ghosts are the least of its problems.
          </p>
        </v-sheet>
        <v-sheet
          color="primary"
          class="pa-2 rounded-lg d-flex mb-2 justify-space-between align-center">
          <v-sheet
            @click="openGithubProject()"
            color="grey"
            class="pa-1 ma-0 mr-1 rounded-xl d-flex align-center justify-space-around">
            <img
              src="../../assets/github-mark-white.png"
              height="36"
              width="36"
              class="mr-1" />
            <p>View on Github</p>
          </v-sheet>
          <v-sheet
            color="transparent"
            class="ma-0 pa-0 d-flex flex-column justify-space-around align-center">
            <p>
              <a href="https://ko-fi.com/X8X2J4QS5" target="_blank"
                ><img
                  height="36"
                  style="border: 0px; height: 36px"
                  src="https://storage.ko-fi.com/cdn/kofi5.png?v=3"
                  border="0"
                  alt="Buy Me a Coffee at ko-fi.com"
              /></a>
            </p>
          </v-sheet>
        </v-sheet>
      </v-card-text>
    </v-card>
  </v-container>
</template>
