<script setup lang="ts">
import { ref } from 'vue'
import MessageComposer from '../components/chat/MessageComposer.vue'
import { chatThreads } from '../data/mockData'

const feed = ref<string[]>([
  'Coach Carter: Nice hip rotation in clip 2.',
  'You: Uploading side-by-side now.',
  'Coach Carter: Pause at contact and draw shoulder angle.',
])

function sendMessage(message: string) {
  feed.value.push(`You: ${message}`)
}
</script>

<template>
  <v-container fluid class="page-wrap">
    <v-row>
      <v-col cols="12" md="5" lg="4">
        <v-card rounded="xl" class="surface-card h-100">
          <v-card-title>Chats</v-card-title>
          <v-list lines="two">
            <v-list-item
              v-for="thread in chatThreads"
              :key="thread.id"
              :title="thread.name"
              :subtitle="thread.lastMessage"
              prepend-icon="mdi-account-circle"
            >
              <template #append>
                <v-chip v-if="thread.unread" size="small" color="primary">{{ thread.unread }}</v-chip>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" md="7" lg="8">
        <v-card rounded="xl" class="surface-card h-100 d-flex flex-column">
          <v-card-title>Share and Feedback</v-card-title>
          <v-card-text class="flex-grow-1">
            <v-list density="comfortable">
              <v-list-item v-for="(entry, idx) in feed" :key="idx" :title="entry" />
            </v-list>
          </v-card-text>
          <v-card-actions>
            <MessageComposer @send="sendMessage" class="w-100" />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
