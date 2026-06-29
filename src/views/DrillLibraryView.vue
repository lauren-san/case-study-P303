<script setup lang="ts">
import { computed, ref } from 'vue'
import DrillCard from '../components/drills/DrillCard.vue'
import { drills } from '../data/mockData'

const selectedPosition = ref('all')
const selectedLevel = ref('all')

const positions = [
  { title: 'All', value: 'all' },
  { title: 'Softball', value: 'softball' },
  { title: 'Catcher', value: 'catcher' },
  { title: 'Infield', value: 'infield' },
  { title: 'Outfield', value: 'outfield' },
  { title: '1B', value: '1b' },
  { title: '2B', value: '2b' },
  { title: '3B', value: '3b' },
  { title: 'SS', value: 'ss' },
]

const levels = [
  { title: 'All', value: 'all' },
  { title: 'Beginner', value: 'beginner' },
  { title: 'Intermediate', value: 'intermediate' },
  { title: 'Advanced', value: 'advanced' },
  { title: 'Elite', value: 'elite' },
]

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
            <v-select v-model="selectedLevel" :items="levels" label="Skill Level" variant="outlined" />
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
