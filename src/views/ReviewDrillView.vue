<script setup lang="ts">
import { ref } from 'vue'
import { drills } from '../data/mockData'

const selectedDrill = ref(drills[0].id)
const rating = ref(4)
const levelMatches = ref<'yes' | 'no' | null>(null)
const feedback = ref('')
</script>

<template>
  <v-container fluid class="page-wrap">
    <v-row justify="center">
      <v-col cols="12" lg="8" xl="7">
        <v-card rounded="xl" class="surface-card">
          <v-card-title>Review Drill</v-card-title>
          <v-card-text>
            <v-select
              v-model="selectedDrill"
              :items="drills.map((drill) => ({ title: drill.title, value: drill.id }))"
              label="Select drill"
              variant="outlined"
            />

            <div class="mb-4">
              <p class="review-label">Star rating</p>
              <v-rating v-model="rating" color="amber" hover length="5" />
            </div>

            <div class="mb-4">
              <p class="review-label">Is the skill level categorized correctly?</p>
              <v-btn-toggle v-model="levelMatches" mandatory rounded="pill" color="primary">
                <v-btn value="yes">Yes</v-btn>
                <v-btn value="no">No</v-btn>
              </v-btn-toggle>
            </div>

            <v-textarea
              v-model="feedback"
              label="Written feedback"
              rows="5"
              variant="outlined"
              counter="400"
              maxlength="400"
              placeholder="Share what worked and what should improve."
            />
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" prepend-icon="mdi-check-circle">Submit Review</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.review-label {
  margin: 0 0 8px;
  font-weight: 600;
  color: rgba(12, 37, 28, 0.85);
}
</style>
