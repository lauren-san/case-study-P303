<script setup lang="ts">
import { ref } from 'vue'

export type MediaAttachment = {
  id: number
  name: string
  type: 'image' | 'video'
}

const emit = defineEmits<{
  send: [{ text: string; attachments: MediaAttachment[] }]
}>()

const message = ref('')
const attachments = ref<MediaAttachment[]>([])
const mediaInput = ref<HTMLInputElement | null>(null)

function openMediaPicker() {
  mediaInput.value?.click()
}

function addMedia(event: Event) {
  const input = event.target as HTMLInputElement
  const files = Array.from(input.files ?? [])

  for (const file of files) {
    const type: MediaAttachment['type'] = file.type.startsWith('video') ? 'video' : 'image'
    attachments.value.push({
      id: Date.now() + Math.floor(Math.random() * 1000),
      name: file.name,
      type,
    })
  }

  input.value = ''
}

function removeAttachment(id: number) {
  attachments.value = attachments.value.filter((item) => item.id !== id)
}

function submit() {
  const text = message.value.trim()
  if (!text && !attachments.value.length) {
    return
  }

  emit('send', {
    text,
    attachments: [...attachments.value],
  })

  message.value = ''
  attachments.value = []
}
</script>

<template>
  <div class="composer-wrap">
    <input
      ref="mediaInput"
      type="file"
      accept="image/*,video/*"
      multiple
      class="hidden-media-input"
      @change="addMedia"
    />

    <v-text-field
      v-model="message"
      variant="outlined"
      hide-details
      placeholder="Share feedback, videos, or pictures..."
      density="comfortable"
      @keydown.enter="submit"
    />

    <div class="composer-actions">
      <v-btn class="app-btn app-btn-secondary" prepend-icon="mdi-paperclip" @click="openMediaPicker">Attach</v-btn>
      <v-btn class="app-btn app-btn-primary" prepend-icon="mdi-send" @click="submit">Send</v-btn>
    </div>

    <div v-if="attachments.length" class="attachment-chips">
      <v-chip
        v-for="item in attachments"
        :key="item.id"
        closable
        size="small"
        color="secondary"
        variant="outlined"
        :prepend-icon="item.type === 'video' ? 'mdi-video-outline' : 'mdi-image-outline'"
        @click:close="removeAttachment(item.id)"
      >
        {{ item.name }}
      </v-chip>
    </div>
  </div>
</template>

<style scoped>
.composer-wrap {
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr;
}

.hidden-media-input {
  display: none;
}

.composer-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.attachment-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
