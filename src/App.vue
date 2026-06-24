<script setup lang="ts">
import { ref } from 'vue'
import { useDisplay } from 'vuetify'
import { useRoute } from 'vue-router'

const drawer = ref(false)
const route = useRoute()
const { mdAndUp } = useDisplay()

const navItems = [
  { title: 'Home', icon: 'mdi-home-outline', to: '/' },
  { title: 'Profile', icon: 'mdi-account-outline', to: '/profile' },
  { title: 'Video Studio', icon: 'mdi-video-outline', to: '/studio' },
  { title: 'Drill Library', icon: 'mdi-baseball-diamond-outline', to: '/drills' },
  { title: 'Share / Chat', icon: 'mdi-forum-outline', to: '/share' },
  { title: 'Review Drill', icon: 'mdi-star-outline', to: '/review' },
]

</script>

<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :permanent="mdAndUp"
      width="270"
      color="surface"
      border="e"
    >
      <div class="drawer-brand">
        <p>MyDiamond</p>
      </div>
      <v-list nav>
        <v-list-item
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          :prepend-icon="item.icon"
          :title="item.title"
          rounded="lg"
        />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar flat color="surface" border="b" height="64">
      <v-btn v-if="!mdAndUp" icon="mdi-menu" @click="drawer = !drawer" />
      <v-app-bar-title class="app-title">MyDiamond</v-app-bar-title>
      <template #append>
        <v-btn to="/studio" prepend-icon="mdi-camcorder" color="primary" rounded="pill">Record</v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-bottom-navigation v-if="!mdAndUp" :model-value="route.path" grow active>
      <v-btn v-for="item in navItems.slice(0, 5)" :key="item.to" :to="item.to" :value="item.to" :icon="item.icon" />
    </v-bottom-navigation>
  </v-app>
</template>
