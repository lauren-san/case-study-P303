<script setup lang="ts">
import { computed } from 'vue'
import { drills } from '../data/mockData'
import { useDrillTodoList } from '../composables/useDrillTodoList'

const quickLinks = [
  { title: 'Drill Library', to: '/drills', icon: 'mdi-baseball-diamond-outline', tone: 'primary' },
  { title: 'Share and Chat', to: '/share', icon: 'mdi-forum-outline', tone: 'primary' },
]

const { todoItems, removeDrillFromTodoList, setDrillCompleted } = useDrillTodoList()

const completedCount = computed(() => todoItems.value.filter((item) => item.completed).length)

const savedDrillTodos = computed(() => {
  return todoItems.value
    .map((item) => {
      const drill = drills.find((entry) => entry.id === item.id)
      if (!drill) {
        return null
      }

      return {
        id: drill.id,
        title: drill.title,
        detail: `${drill.position} - ${drill.level}`,
        completed: item.completed,
      }
    })
    .filter((item): item is { id: number; title: string; detail: string; completed: boolean } => Boolean(item))
})

function removeSavedDrill(id: number) {
  removeDrillFromTodoList(id)
}
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
            <div class="todo-actions">
              <v-btn to="/drills" prepend-icon="mdi-plus" class="app-btn app-btn-secondary">Add Drill</v-btn>
            </div>
            <v-alert v-if="!savedDrillTodos.length" type="info" variant="tonal" class="mb-4">
              No drills in your to-do list yet.
            </v-alert>
            <v-list v-else lines="two" class="bg-transparent pa-0">
              <v-list-item v-for="item in savedDrillTodos" :key="item.id" class="px-0">
                <template #prepend>
                  <v-checkbox-btn
                    :model-value="item.completed"
                    color="primary"
                    @update:model-value="setDrillCompleted(item.id, Boolean($event))"
                  />
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
