<script setup lang="ts">
import { computed, ref } from 'vue'
import DrillCard from '../components/drills/DrillCard.vue'
import { drills } from '../data/mockData'

const selectedPosition = ref<'all' | string>('all')
const selectedLevel = ref<'all' | string>('all')

const positions = ['all', 'softball', 'catcher', 'infield', 'outfield', '1b', '2b', '3b', 'ss']
const levels = ['all', 'beginner', 'intermediate', 'advanced', 'elite']

const filteredDrills = computed(() => {
  return drills.filter((drill) => {
    const matchesPosition = selectedPosition.value === 'all' || drill.position === selectedPosition.value
    const matchesLevel = selectedLevel.value === 'all' || drill.level === selectedLevel.value
    return matchesPosition && matchesLevel
  })
})
</script>

<template>
  <v-container fluid class="page-wrap">
    <v-card rounded="xl" class="surface-card mb-4">
      <v-card-text>
        <v-row dense>
          <v-col cols="12" md="6">
            <v-select v-model="selectedPosition" :items="positions" label="Position" variant="outlined" />
          </v-col>
          <v-col cols="12" md="6">
            <v-select v-model="selectedLevel" :items="levels" label="Skill level" variant="outlined" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-row>
      <v-col v-for="drill in filteredDrills" :key="drill.id" cols="12" md="6" lg="4">
        <DrillCard :drill="drill" />
      </v-col>
    </v-row>
  </v-container>
</template>
