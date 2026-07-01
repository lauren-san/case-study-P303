import { computed, ref, watch } from 'vue'

type DrillTodoItem = {
  id: number
  completed: boolean
}

const STORAGE_KEY = 'drillTodoItems'

function loadTodoItems(): DrillTodoItem[] {
  if (typeof window === 'undefined') {
    return []
  }

  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    return []
  }

  try {
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      return []
    }

    // Backward compatibility: migrate older numeric id storage format.
    if (parsed.every((item) => Number.isInteger(item))) {
      return parsed.map((id) => ({ id: Number(id), completed: false }))
    }

    return parsed
      .filter((item): item is DrillTodoItem => {
        return (
          typeof item === 'object' &&
          item !== null &&
          Number.isInteger((item as DrillTodoItem).id) &&
          typeof (item as DrillTodoItem).completed === 'boolean'
        )
      })
      .map((item) => ({ id: item.id, completed: item.completed }))
  } catch {
    return []
  }
}

const todoItems = ref<DrillTodoItem[]>(loadTodoItems())

watch(
  todoItems,
  (value) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    }
  },
  { deep: true },
)

export function useDrillTodoList() {
  const todoDrillIds = computed(() => todoItems.value.map((item) => item.id))

  function isInTodoList(drillId: number): boolean {
    return todoItems.value.some((item) => item.id === drillId)
  }

  function addDrillToTodoList(drillId: number): boolean {
    if (isInTodoList(drillId)) {
      return false
    }

    todoItems.value = [...todoItems.value, { id: drillId, completed: false }]
    return true
  }

  function removeDrillFromTodoList(drillId: number) {
    todoItems.value = todoItems.value.filter((item) => item.id !== drillId)
  }

  function setDrillCompleted(drillId: number, completed: boolean) {
    todoItems.value = todoItems.value.map((item) => {
      if (item.id !== drillId) {
        return item
      }

      return { ...item, completed }
    })
  }

  return {
    todoItems,
    todoDrillIds,
    isInTodoList,
    addDrillToTodoList,
    removeDrillFromTodoList,
    setDrillCompleted,
  }
}
