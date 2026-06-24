<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  send: [string]
}>()

const message = ref('')

function submit() {
  if (!message.value.trim()) {
    return
  }

  emit('send', message.value.trim())
  message.value = ''
}
</script>

<template>
  <div class="composer-wrap">
    <v-text-field
      v-model="message"
      variant="outlined"
      hide-details
      placeholder="Share a clip note or ask for feedback..."
      density="comfortable"
      @keydown.enter="submit"
    />
    <v-btn color="primary" prepend-icon="mdi-send" @click="submit">Send</v-btn>
  </div>
</template>

<style scoped>
.composer-wrap {
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr;
}

@media (min-width: 700px) {
  .composer-wrap {
    grid-template-columns: 1fr auto;
    align-items: center;
  }
}
</style>
