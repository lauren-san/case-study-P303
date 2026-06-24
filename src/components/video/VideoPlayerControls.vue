<script setup lang="ts">
const model = defineModel<number>({ default: 0.8 })

const emit = defineEmits<{
  play: []
  step: ['back' | 'next']
}>()

const speedOptions = [0.3, 0.5, 0.8, 1]
</script>

<template>
  <div class="video-controls">
    <v-slider
      v-model="model"
      :min="0.3"
      :max="1"
      :step="0.1"
      density="compact"
      color="primary"
      thumb-label
      hide-details
      class="speed-slider"
    />
    <div class="controls-row">
      <v-btn icon="mdi-skip-previous" variant="text" @click="emit('step', 'back')" />
      <v-btn icon="mdi-play" size="large" color="primary" @click="emit('play')" />
      <v-btn icon="mdi-skip-next" variant="text" @click="emit('step', 'next')" />
      <v-select
        v-model="model"
        :items="speedOptions"
        label="Speed"
        hide-details
        density="compact"
        variant="outlined"
        class="speed-select"
      >
        <template #selection="{ item }">{{ item.raw }}x</template>
        <template #item="{ props, item }">
          <v-list-item v-bind="props" :title="`${item.raw}x`" />
        </template>
      </v-select>
    </div>
  </div>
</template>

<style scoped>
.video-controls {
  border-top: 1px solid rgba(18, 35, 30, 0.2);
  padding: 12px 14px;
  background: #f5f8f1;
}

.speed-slider {
  margin-bottom: 4px;
}

.controls-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.speed-select {
  width: 108px;
  margin-left: auto;
}
</style>
