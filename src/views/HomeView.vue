<script setup lang="ts">
import { computed, ref } from 'vue'
import { drills } from '../data/mockData'

const quickLinks = [
  { title: 'Video Studio', to: '/studio', icon: 'mdi-video-outline', tone: 'primary' },
  { title: 'Drill Library', to: '/drills', icon: 'mdi-baseball-diamond-outline', tone: 'primary' },
  { title: 'Share and Chat', to: '/share', icon: 'mdi-forum-outline', tone: 'primary' },
]

const savedDrillTodos = ref(
  drills.map((drill, index) => ({
    id: drill.id,
    title: drill.title,
    detail: `${drill.position} - ${drill.level}`,
    completed: index === 0,
  })),
)

function removeSavedDrill(id: number) {
  savedDrillTodos.value = savedDrillTodos.value.filter((item) => item.id !== id)
}

const completedCount = computed(
  () => savedDrillTodos.value.filter((item) => item.completed).length,
)

const progressValue = computed(() => {
  if (!savedDrillTodos.value.length) {
    return 0
  }

  return Math.round((completedCount.value / savedDrillTodos.value.length) * 100)
})
</script>

<template>
  <v-container fluid class="page-wrap">
    <v-row>
      <v-col cols="12">
        <v-card rounded="xl" class="surface-card hero-panel mb-4">
          <v-card-text>
            <h1 class="page-title mt-4">Develop your game with focused video feedback.</h1>
            <p class="page-copy">
              Record, annotate, compare, and share your clips with coaches and teammates to improve
              mechanics session by session.
            </p>
            <div class="quick-list">
              <v-btn
                v-for="link in quickLinks"
                :key="link.to"
                :to="link.to"
                :prepend-icon="link.icon"
                :class="['app-btn', link.tone === 'secondary' ? 'app-btn-secondary' : 'app-btn-primary']"
                variant="flat"
              >
                {{ link.title }}
              </v-btn>
            </div>
          </v-card-text>
        </v-card>

        <v-card rounded="xl" class="surface-card">
          <v-card-item>
            <v-card-title>Saved Drill To-Do List</v-card-title>
            <v-card-subtitle>
              {{ completedCount }} of {{ savedDrillTodos.length }} completed
            </v-card-subtitle>
          </v-card-item>
          <v-card-text>
            <v-progress-linear
              :model-value="progressValue"
              color="primary"
              height="10"
              rounded
              class="mb-4"
            />
            <div class="todo-actions">
              <v-btn to="/drills" prepend-icon="mdi-plus" class="app-btn app-btn-secondary">Add Drill</v-btn>
            </div>
            <v-list lines="two" class="bg-transparent pa-0">
              <v-list-item v-for="item in savedDrillTodos" :key="item.id" class="px-0">
                <template #prepend>
                  <v-checkbox-btn v-model="item.completed" color="primary" />
                </template>
                <v-list-item-title :class="{ 'text-decoration-line-through': item.completed }">
                  {{ item.title }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ item.detail }}
                </v-list-item-subtitle>
                <template #append>
                  <v-btn
                    icon="mdi-trash-can-outline"
                    variant="text"
                    color="error"
                    density="comfortable"
                    @click="removeSavedDrill(item.id)"
                  />
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

    </v-row>
  </v-container>
</template>

<style scoped>
.quick-list {
  margin-top: 22px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.todo-actions {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  margin: 4px 0 14px;
}
</style>
