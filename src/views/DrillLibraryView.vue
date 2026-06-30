<script setup lang="ts">
import { computed, ref } from 'vue'
import { drills } from '../data/mockData'
import fieldImage from '../../Context/field.jpeg'
import softballImage from '../../Context/softball.png'
import profileImage from '../../Context/Profile-pic.jpeg'

const searchKeyword = ref('')
const selectedPosition = ref('all')
const selectedLevel = ref('all')
const selectedFocus = ref('all')
const selectedMinRating = ref(0)
const showFilters = ref(false)

const drillImages: Record<number, string> = {
  1: softballImage,
  2: fieldImage,
  3: profileImage,
}

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

const focusAreas = [
  { title: 'All', value: 'all' },
  { title: 'Hitting', value: 'hitting' },
  { title: 'Defense', value: 'defense' },
  { title: 'Catching', value: 'catching' },
]

const minimumRatings = [
  { title: 'Any Rating', value: 0 },
  { title: '4.0+', value: 4 },
  { title: '4.5+', value: 4.5 },
]

const filteredDrills = computed(() => {
  const term = searchKeyword.value.trim().toLowerCase()

  return drills.filter((drill) => {
    const matchesPosition = selectedPosition.value === 'all' || drill.position === selectedPosition.value
    const matchesLevel = selectedLevel.value === 'all' || drill.level === selectedLevel.value
    const matchesFocus = selectedFocus.value === 'all' || drill.focus === selectedFocus.value
    const matchesRating = drill.rating >= selectedMinRating.value
    const matchesSearch =
      !term ||
      `${drill.title} ${drill.summary} ${drill.position} ${drill.level} ${drill.focus} ${drill.instructions.join(' ')}`
        .toLowerCase()
        .includes(term)

    return matchesPosition && matchesLevel && matchesFocus && matchesRating && matchesSearch
  })
})

const recommendedDrills = computed(() => {
  return [...filteredDrills.value].sort((a, b) => b.rating - a.rating).slice(0, 6)
})

const popularDrills = computed(() => {
  return [...filteredDrills.value].sort((a, b) => b.reviews - a.reviews)
})

function imageForDrill(drillId: number): string {
  return drillImages[drillId] ?? fieldImage
}

function resetFilters() {
  selectedPosition.value = 'all'
  selectedLevel.value = 'all'
  selectedFocus.value = 'all'
  selectedMinRating.value = 0
}
</script>

<template>
  <v-container fluid class="page-wrap">
    <v-card rounded="xl" class="surface-card drills-surface">
      <v-card-text class="drills-content">
        <v-text-field
          v-model="searchKeyword"
          placeholder="Enter a search keyword..."
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          density="compact"
          hide-details
          class="drills-search"
        />

        <div class="filter-row">
          <v-btn
            class="app-btn app-btn-secondary filter-btn"
            size="small"
            prepend-icon="mdi-tune-variant"
            @click="showFilters = true"
          >
            Filters
          </v-btn>
        </div>

        <section class="drill-section">
          <h3 class="drill-section-title">Recommended For You</h3>
          <div class="recommended-strip">
            <article
              v-for="drill in recommendedDrills"
              :key="`recommended-${drill.id}`"
              class="recommended-card"
            >
              <h4 class="recommended-title">{{ drill.title }}</h4>
              <div class="rating-row">
                <v-rating
                  :model-value="drill.rating"
                  color="var(--md-primary)"
                  half-increments
                  density="compact"
                  readonly
                  size="small"
                />
              </div>
              <img :src="imageForDrill(drill.id)" :alt="`${drill.title} preview`" class="recommended-image" />
              <div class="recommended-tags">
                <v-chip size="x-small" class="tag-chip" variant="outlined">{{ drill.position }}</v-chip>
                <v-chip size="x-small" class="tag-chip" variant="outlined">{{ drill.focus }}</v-chip>
                <v-chip size="x-small" class="tag-chip" variant="outlined">{{ drill.level }}</v-chip>
              </div>
              <p class="recommended-summary">{{ drill.summary }}</p>
            </article>
          </div>
        </section>

        <section class="drill-section popular-section">
          <h3 class="drill-section-title">Popular Drills This Week</h3>
          <div class="popular-list">
            <article v-for="drill in popularDrills" :key="`popular-${drill.id}`" class="popular-card">
              <img :src="imageForDrill(drill.id)" :alt="`${drill.title} preview`" class="popular-image" />
              <div class="popular-meta">
                <h4 class="popular-title">{{ drill.title }}</h4>
                <v-rating
                  :model-value="drill.rating"
                  color="var(--md-primary)"
                  half-increments
                  density="compact"
                  readonly
                  size="small"
                />
                <p class="popular-summary">{{ drill.summary }}</p>
              </div>
            </article>
          </div>
        </section>

        <v-alert v-if="!filteredDrills.length" type="info" variant="tonal" class="mt-4">
          No drills match your current filters.
        </v-alert>
      </v-card-text>
    </v-card>

    <v-dialog v-model="showFilters" max-width="460">
      <v-card rounded="lg">
        <v-card-title>Filter Drills</v-card-title>
        <v-card-text>
          <v-row dense>
            <v-col cols="12" sm="6">
              <v-select v-model="selectedPosition" :items="positions" label="Position" variant="outlined" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-select v-model="selectedLevel" :items="levels" label="Skill Level" variant="outlined" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-select v-model="selectedFocus" :items="focusAreas" label="Focus" variant="outlined" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-select v-model="selectedMinRating" :items="minimumRatings" label="Rating" variant="outlined" />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="justify-end ga-2 px-6 pb-5">
          <v-btn class="app-btn app-btn-secondary" size="small" @click="resetFilters">Reset</v-btn>
          <v-btn class="app-btn app-btn-primary" size="small" @click="showFilters = false">Apply</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
.drills-surface {
  overflow: hidden;
}

.drills-content {
  display: grid;
  gap: 10px;
}

.drills-search {
  margin-top: 2px;
}

.filter-row {
  display: flex;
}

.filter-btn {
  border-width: 1px !important;
  min-height: 34px;
}

.drill-section {
  margin-top: 4px;
}

.drill-section-title {
  margin: 0 0 10px;
  font-size: 1rem;
  font-weight: 700;
}

.recommended-strip {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(250px, 84%);
  gap: 10px;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  padding-bottom: 2px;
}

.recommended-card {
  border: 1px solid rgba(13, 41, 31, 0.18);
  border-radius: 12px;
  padding: 10px;
  background: #ffffff;
}

.recommended-title {
  margin: 0;
  font-size: 0.94rem;
  line-height: 1.2;
}

.rating-row {
  margin-top: 3px;
}

.recommended-image {
  width: 100%;
  height: 108px;
  object-fit: cover;
  border-radius: 8px;
  margin-top: 6px;
}

.recommended-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 8px;
}

.tag-chip {
  border-color: var(--md-primary);
  color: var(--md-primary);
  text-transform: lowercase;
}

.recommended-summary {
  margin: 8px 0 0;
  font-size: 0.82rem;
  line-height: 1.35;
  color: rgba(13, 41, 31, 0.82);
}

.popular-section {
  border-top: 1px solid rgba(13, 41, 31, 0.18);
  padding-top: 12px;
}

.popular-list {
  display: grid;
  gap: 10px;
}

.popular-card {
  display: grid;
  grid-template-columns: 88px 1fr;
  gap: 10px;
  border: 1px solid rgba(13, 41, 31, 0.18);
  border-radius: 12px;
  background: #ffffff;
  padding: 8px;
}

.popular-image {
  width: 88px;
  height: 88px;
  border-radius: 8px;
  object-fit: cover;
}

.popular-meta {
  min-width: 0;
}

.popular-title {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.2;
}

.popular-summary {
  margin: 4px 0 0;
  font-size: 0.8rem;
  line-height: 1.3;
  color: rgba(13, 41, 31, 0.78);
}
</style>
