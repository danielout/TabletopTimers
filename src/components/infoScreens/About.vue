<script setup lang="ts"></script>

<template>
  <v-container class="d-flex flex-column justify-center mb-0 pb-0">
    <v-card :elevation="3" class="pa-1 mb-2 rounded-lg" color="secondary">
      <v-card-title class="pa-1 d-flex justify-center">
        About Tabletop Tracker
      </v-card-title>
      <v-card-text>
        <v-sheet color="priamry" class="pa-2 rounded-lg mb-2"
          ><p>
            Tabletop Tracker is a tool to help GMs/DMs/storytellers/etc keep an
            eye on all their players. Especially with large groups, it is easy
            for quiet players to go unnoticed for a while. This tool lets you
            keep a timer running for each player, and reset it whenever they
            contribute to the scene. If one timer starts to get much higher than
            the rest, we highlight it to call it out. Tabletop Tracker also runs
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
          </p></v-sheet
        >
      </v-card-text>
    </v-card>
  </v-container>
</template>
