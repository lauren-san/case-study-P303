<template>
  <section class="shell">
    <v-container class="hero" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" md="10" lg="8">
          <v-card class="hero-card" elevation="10" rounded="xl">
            <v-card-text class="hero-content">
              <v-chip color="teal-darken-1" variant="flat" class="mb-6" prepend-icon="mdi-vuejs">
                Vue 3 + Vite + Vuetify 3
              </v-chip>

              <h1 class="hero-title">A clean starting point for case-study-P303.</h1>
              <p class="hero-copy">
                TypeScript, Vue Router, and Vuetify are wired together and ready for the first
                screens, flows, and case-study content.
              </p>

              <div class="actions">
                <v-btn color="teal-darken-1" size="large" prepend-icon="mdi-arrow-right">
                  Start building
                </v-btn>
                <v-btn variant="text" size="large" prepend-icon="mdi-book-open-page-variant">
                  Read the brief
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
