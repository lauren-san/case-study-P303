<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { title: 'Home', icon: 'mdi-home-outline', to: '/' },
  { title: 'Drill Library', icon: 'mdi-baseball-diamond-outline', to: '/drills' },
  { title: 'Share / Chat', icon: 'mdi-forum-outline', to: '/share' },
  { title: 'Profile', icon: 'mdi-account-outline', to: '/profile' },
]

</script>

<template>
  <v-app class="mobile-mode">
    <div class="mobile-frame">
    <v-app-bar flat color="surface" border="b" height="56" class="mobile-topbar">
      <v-app-bar-title class="app-title">MyDiamond</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-bottom-navigation
      :model-value="route.path"
      grow
      active
      density="compact"
      height="60"
      class="mobile-bottom-nav"
    >
      <v-btn
        v-for="item in navItems.slice(0, 5)"
        :key="item.to"
        :to="item.to"
        :value="item.to"
        :icon="item.icon"
        density="compact"
      />
    </v-bottom-navigation>
    </div>
  </v-app>
</template>
