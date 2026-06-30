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
const showFilters = ref(false)

const draftPosition = ref(selectedPosition.value)
const draftLevel = ref(selectedLevel.value)
const draftFocus = ref(selectedFocus.value)

const drillImages: Record<number, string> = {
  1: softballImage,
  2: fieldImage,
  3: profileImage,
}

const positions = [
  { title: 'All', value: 'all' },
  { title: 'Pitcher', value: 'pitcher' },
  { title: 'Catcher', value: 'catcher' },
  { title: 'First Base', value: 'first base' },
  { title: 'Second Base', value: 'second base' },
  { title: 'Third Base', value: 'third base' },
  { title: 'Shortstop', value: 'shortstop' },
  { title: 'Right Field', value: 'right field' },
  { title: 'Left Field', value: 'left field' },
  { title: 'Center Field', value: 'center field' },
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
  { title: 'Pitching', value: 'pitching' },
  { title: 'Infield', value: 'infield' },
  { title: 'Outfield', value: 'outfield' },
]

function matchesPositionFilter(drillPosition: string, selectedPositionValue: string): boolean {
  if (selectedPositionValue === 'all') {
    return true
  }

  const mappedDrillPosition = drillPosition.toLowerCase()
  const infieldPositions = ['first base', 'second base', 'third base', 'shortstop']
  const outfieldPositions = ['left field', 'center field', 'right field']

  if (selectedPositionValue === 'pitcher') {
    return mappedDrillPosition === 'pitcher' || mappedDrillPosition === 'softball'
  }

  if (selectedPositionValue === 'catcher') {
    return mappedDrillPosition === 'catcher'
  }

  if (infieldPositions.includes(selectedPositionValue)) {
    return mappedDrillPosition === 'infield' || infieldPositions.includes(mappedDrillPosition)
  }

  if (outfieldPositions.includes(selectedPositionValue)) {
    return mappedDrillPosition === 'outfield' || outfieldPositions.includes(mappedDrillPosition)
  }

  return mappedDrillPosition === selectedPositionValue
}

function getItemTitle(items: Array<{ title: string; value: string }>, value: string): string {
  return items.find((item) => item.value === value)?.title ?? value
}

const filteredDrills = computed(() => {
  const term = searchKeyword.value.trim().toLowerCase()

  return drills.filter((drill) => {
    const matchesPosition = matchesPositionFilter(drill.position, selectedPosition.value)
    const matchesLevel = selectedLevel.value === 'all' || drill.level === selectedLevel.value
    const matchesFocus = selectedFocus.value === 'all' || drill.focus === selectedFocus.value
    const matchesSearch =
      !term ||
      `${drill.title} ${drill.summary} ${drill.position} ${drill.level} ${drill.focus} ${drill.instructions.join(' ')}`
        .toLowerCase()
        .includes(term)

    return matchesPosition && matchesLevel && matchesFocus && matchesSearch
  })
})

const isSearching = computed(() => Boolean(searchKeyword.value.trim()))
const hasActiveFilters = computed(() => {
  return selectedPosition.value !== 'all' || selectedLevel.value !== 'all' || selectedFocus.value !== 'all'
})
const isResultsMode = computed(() => isSearching.value || hasActiveFilters.value)

const appliedFilterPills = computed(() => {
  const pills: Array<{ key: 'position' | 'level' | 'focus'; label: string }> = []

  if (selectedPosition.value !== 'all') {
    pills.push({
      key: 'position',
      label: `Position: ${getItemTitle(positions, selectedPosition.value)}`,
    })
  }

  if (selectedLevel.value !== 'all') {
    pills.push({
      key: 'level',
      label: `Level: ${getItemTitle(levels, selectedLevel.value)}`,
    })
  }

  if (selectedFocus.value !== 'all') {
    pills.push({
      key: 'focus',
      label: `Focus: ${getItemTitle(focusAreas, selectedFocus.value)}`,
    })
  }

  return pills
})

const recommendedDrills = computed(() => {
  return [...filteredDrills.value].sort((a, b) => b.rating - a.rating).slice(0, 6)
})

const popularDrills = computed(() => {
  return [...filteredDrills.value].sort((a, b) => b.reviews - a.reviews)
})

const horizontalResults = computed(() => {
  if (isResultsMode.value) {
    return filteredDrills.value
  }
  return recommendedDrills.value
})

const showSectionTitles = computed(() => {
  return !isResultsMode.value
})

function imageForDrill(drillId: number): string {
  return drillImages[drillId] ?? fieldImage
}

function openFilters() {
  draftPosition.value = selectedPosition.value
  draftLevel.value = selectedLevel.value
  draftFocus.value = selectedFocus.value
  showFilters.value = true
}

function applyFilters() {
  selectedPosition.value = draftPosition.value
  selectedLevel.value = draftLevel.value
  selectedFocus.value = draftFocus.value
  showFilters.value = false
}

function removeAppliedFilter(filterKey: 'position' | 'level' | 'focus') {
  if (filterKey === 'position') {
    selectedPosition.value = 'all'
    return
  }

  if (filterKey === 'level') {
    selectedLevel.value = 'all'
    return
  }

  selectedFocus.value = 'all'
}

function resetFilters() {
  draftPosition.value = 'all'
  draftLevel.value = 'all'
  draftFocus.value = 'all'
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
            @click="openFilters"
          >
            Filters
          </v-btn>
        </div>

        <div v-if="appliedFilterPills.length" class="applied-filter-row">
          <v-chip
            v-for="pill in appliedFilterPills"
            :key="pill.key"
            size="small"
            class="applied-filter-pill"
            closable
            @click:close="removeAppliedFilter(pill.key)"
          >
            {{ pill.label }}
          </v-chip>
        </div>

        <section class="drill-section">
          <h3 v-if="showSectionTitles" class="drill-section-title">Recommended For You</h3>
          <div class="recommended-strip" :class="{ 'results-strip': isResultsMode }">
            <article
              v-for="drill in horizontalResults"
              :key="`recommended-${drill.id}`"
              class="recommended-card"
              :class="{ 'search-result-card': isResultsMode }"
            >
              <img
                v-if="isResultsMode"
                :src="imageForDrill(drill.id)"
                :alt="`${drill.title} preview`"
                class="search-result-image"
              />
              <div class="search-result-meta" :class="{ 'search-mode-content': isResultsMode }">
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
                <img
                  v-if="!isSearching"
                  :src="imageForDrill(drill.id)"
                  :alt="`${drill.title} preview`"
                  class="recommended-image"
                />
                <div class="recommended-tags">
                  <v-chip size="x-small" class="tag-chip" variant="outlined">{{ drill.position }}</v-chip>
                  <v-chip size="x-small" class="tag-chip" variant="outlined">{{ drill.focus }}</v-chip>
                  <v-chip size="x-small" class="tag-chip" variant="outlined">{{ drill.level }}</v-chip>
                </div>
                <p class="recommended-summary">{{ drill.summary }}</p>
              </div>
            </article>
          </div>
        </section>

        <section v-if="!isResultsMode" class="drill-section popular-section">
          <h3 v-if="showSectionTitles" class="drill-section-title">Popular Drills This Week</h3>
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
                <div class="popular-tags">
                  <v-chip size="x-small" class="tag-chip" variant="outlined">{{ drill.position }}</v-chip>
                  <v-chip size="x-small" class="tag-chip" variant="outlined">{{ drill.focus }}</v-chip>
                  <v-chip size="x-small" class="tag-chip" variant="outlined">{{ drill.level }}</v-chip>
                </div>
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
              <v-select v-model="draftPosition" :items="positions" label="Position" variant="outlined" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-select v-model="draftLevel" :items="levels" label="Skill Level" variant="outlined" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-select v-model="draftFocus" :items="focusAreas" label="Focus" variant="outlined" />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="justify-end ga-2 px-6 pb-5">
          <v-btn class="app-btn app-btn-secondary" size="small" @click="resetFilters">Reset</v-btn>
          <v-btn class="app-btn app-btn-primary" size="small" @click="applyFilters">Apply</v-btn>
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
  min-width: 0;
  overflow-x: hidden;
}

.drills-search {
  margin-top: 2px;
}

.drills-search :deep(.v-field) {
  border-radius: 12px;
}

.filter-row {
  display: flex;
}

.applied-filter-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.applied-filter-pill {
  border: 1px solid rgba(10, 155, 90, 0.45);
  color: rgba(13, 41, 31, 0.92);
}

.filter-btn {
  border-width: 1px !important;
  border-radius: 12px !important;
  min-height: 36px;
  padding-inline: 12px;
}

.drill-section {
  margin-top: 4px;
  min-width: 0;
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
  overflow-y: hidden;
  overscroll-behavior-x: contain;
  padding-bottom: 2px;
}

.results-strip {
  grid-auto-columns: 100%;
}

.recommended-card {
  border: 1px solid rgba(13, 41, 31, 0.18);
  border-radius: 12px;
  padding: 10px;
  background: #ffffff;
}

.search-result-card {
  display: grid;
  grid-template-columns: 92px minmax(0, 1fr);
  gap: 10px;
  align-items: center;
  min-height: 114px;
  width: 100%;
  box-sizing: border-box;
}

.search-result-image {
  width: 92px;
  height: 92px;
  object-fit: cover;
  border-radius: 8px;
}

.search-result-meta {
  min-width: 0;
}

.search-mode-content .recommended-tags {
  margin-top: 5px;
}

.search-mode-content .recommended-summary {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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
  min-width: 0;
  overflow-x: hidden;
}

.popular-card {
  display: grid;
  grid-template-columns: 88px minmax(0, 1fr);
  gap: 10px;
  border: 1px solid rgba(13, 41, 31, 0.18);
  border-radius: 12px;
  background: #ffffff;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
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

.popular-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 4px;
}

.popular-summary {
  margin: 4px 0 0;
  font-size: 0.8rem;
  line-height: 1.3;
  color: rgba(13, 41, 31, 0.78);
}
</style>
