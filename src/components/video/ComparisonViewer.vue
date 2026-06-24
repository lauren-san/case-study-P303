<script setup lang="ts">
defineProps<{
  compareMode: 'video-video' | 'video-image' | 'image-image'
}>()
</script>

<template>
  <div class="compare-layout">
    <div class="pane">
      <div class="pane-tag">Primary</div>
      <img src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=80" alt="softball swing frame" />
    </div>
    <div class="pane">
      <div class="pane-tag">Reference</div>
      <img src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1200&q=80" alt="reference softball frame" />
    </div>
    <div class="compare-caption">Mode: {{ compareMode }}</div>
  </div>
</template>

<style scoped>
.compare-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  position: relative;
}

.pane {
  position: relative;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(13, 41, 31, 0.15);
}

.pane img {
  width: 100%;
  height: 184px;
  object-fit: cover;
  display: block;
}

.pane-tag {
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 3px 8px;
  border-radius: 999px;
  background: rgba(7, 24, 17, 0.72);
  color: #fff;
  font-size: 0.72rem;
}

.compare-caption {
  color: rgba(7, 24, 17, 0.72);
  font-size: 0.75rem;
  text-transform: capitalize;
}

@media (min-width: 900px) {
  .compare-layout {
    grid-template-columns: 1fr 1fr;
  }

  .compare-caption {
    grid-column: 1 / -1;
  }
}
</style>
