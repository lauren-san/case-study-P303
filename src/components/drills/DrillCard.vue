<script setup lang="ts">
import type { Drill } from '../../data/mockData'

defineProps<{
  drill: Drill
}>()
</script>

<template>
  <v-card class="drill-card" rounded="lg" elevation="4">
    <v-card-item>
      <v-card-title class="d-flex align-center justify-space-between ga-2">
        <span>{{ drill.title }}</span>
        <v-chip size="small" color="primary" variant="tonal">{{ drill.level }}</v-chip>
      </v-card-title>
      <v-card-subtitle>{{ drill.position }}</v-card-subtitle>
    </v-card-item>
    <v-card-text>
      <p class="drill-summary">{{ drill.summary }}</p>
      <div class="d-flex align-center ga-2 mb-2">
        <v-rating :model-value="drill.rating" color="amber" half-increments density="compact" readonly />
        <span class="review-count">{{ drill.reviews }} reviews</span>
      </div>
      <v-list density="compact" class="instruction-list">
        <v-list-item v-for="(step, idx) in drill.instructions" :key="idx" :title="step" />
      </v-list>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.drill-card {
  height: 100%;
  border: 1px solid rgba(13, 41, 31, 0.12);
}

.drill-summary {
  margin: 0 0 10px;
  color: rgba(13, 41, 31, 0.82);
}

.review-count {
  font-size: 0.84rem;
  color: rgba(13, 41, 31, 0.7);
}

.instruction-list :deep(.v-list-item-title) {
  white-space: normal;
  font-size: 0.86rem;
}
</style>
