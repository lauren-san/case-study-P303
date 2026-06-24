<template>
  <v-app>
    <v-app-bar color="indigo-darken-4" density="comfortable" flat>
      <v-app-bar-title>case-study-P303</v-app-bar-title>
      <v-spacer />
      <v-btn variant="tonal" prepend-icon="mdi-rocket-launch" to="/">
        Launchpad
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
