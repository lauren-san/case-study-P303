<script setup lang="ts">
defineProps<{
  activeTool: 'line' | 'arrow' | 'triangle' | null
}>()
</script>

<template>
  <div class="overlay-frame">
    <svg viewBox="0 0 360 220" preserveAspectRatio="none">
      <line x1="84" y1="130" x2="248" y2="94" class="guide-line" />
      <line v-if="activeTool === 'arrow'" x1="88" y1="132" x2="255" y2="66" class="guide-arrow" />
      <polygon
        v-if="activeTool === 'triangle'"
        points="160,94 226,112 176,142"
        class="guide-triangle"
      />
      <circle cx="266" cy="96" r="8" class="ball-marker" />
    </svg>
    <div class="overlay-label">{{ activeTool ? `${activeTool} overlay` : 'line overlay' }}</div>
  </div>
</template>

<style scoped>
.overlay-frame {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

svg {
  width: 100%;
  height: 100%;
}

.guide-line {
  stroke: #ffe44f;
  stroke-width: 4;
}

.guide-arrow {
  stroke: #4ef067;
  stroke-width: 4;
}

.guide-triangle {
  fill: rgba(255, 65, 54, 0.2);
  stroke: #ff4136;
  stroke-width: 3;
}

.ball-marker {
  fill: #ffd83d;
  stroke: #1f2f24;
  stroke-width: 2;
}

.overlay-label {
  position: absolute;
  right: 12px;
  top: 12px;
  background: rgba(10, 26, 18, 0.8);
  color: #fff;
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 0.72rem;
  text-transform: capitalize;
}
</style>
