<script setup lang="ts">
import { ref } from 'vue'
import AnnotationOverlay from '../components/video/AnnotationOverlay.vue'
import ComparisonViewer from '../components/video/ComparisonViewer.vue'
import VideoPlayerControls from '../components/video/VideoPlayerControls.vue'

type Tool = 'line' | 'arrow' | 'triangle'

const tool = ref<Tool | null>('line')
const compareMode = ref<'video-video' | 'video-image' | 'image-image'>('video-video')
const speed = ref(0.8)

const tools: Array<{ icon: string; value: Tool }> = [
  { icon: 'mdi-minus', value: 'line' },
  { icon: 'mdi-arrow-top-right', value: 'arrow' },
  { icon: 'mdi-triangle-outline', value: 'triangle' },
]

function setTool(value: Tool) {
  tool.value = value
}
</script>

<template>
  <v-container fluid class="page-wrap">
    <v-row>
      <v-col cols="12" lg="8">
        <v-card rounded="xl" class="surface-card overflow-hidden">
          <div class="studio-stage">
            <v-img
              src="https://images.unsplash.com/photo-1644458214588-bf02f200f87e?auto=format&fit=crop&w=1400&q=80"
              alt="swing analysis frame"
              cover
              height="420"
            />
            <AnnotationOverlay :active-tool="tool" />
            <div class="tool-stack">
              <v-btn
                v-for="item in tools"
                :key="item.value"
                :icon="item.icon"
                :color="tool === item.value ? 'primary' : undefined"
                variant="tonal"
                @click="setTool(item.value)"
              />
            </div>
          </div>
          <VideoPlayerControls v-model="speed" @play="void 0" @step="void 0" />
        </v-card>
      </v-col>

      <v-col cols="12" lg="4">
        <v-card rounded="xl" class="surface-card h-100">
          <v-card-title>Comparison Viewer</v-card-title>
          <v-card-text>
            <v-tabs v-model="compareMode" color="primary" align-tabs="start" density="comfortable">
              <v-tab value="video-video">Video to Video</v-tab>
              <v-tab value="video-image">Video to Image</v-tab>
              <v-tab value="image-image">Image to Image</v-tab>
            </v-tabs>
            <ComparisonViewer :compare-mode="compareMode" class="mt-4" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
