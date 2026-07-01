<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import MessageComposer, { type MediaAttachment } from '../components/chat/MessageComposer.vue'
import { chatThreads, type ChatThread } from '../data/mockData'
import coachImage1 from '../../Context/Coach.jpeg'
import coachImage2 from '../../Context/coach-2.jpeg'
import coachImage3 from '../../Context/coach-3.jpeg'
import playerImage1 from '../../Context/player-profile-1.jpeg'
import playerImage2 from '../../Context/player-profile-2.jpeg'
import playerImage3 from '../../Context/Player-profile-3.jpeg'
import playerImage4 from '../../Context/Player-profile-4.jpeg'
import playerImage5 from '../../Context/player-profile-5.jpeg'
import playerImage6 from '../../Context/Player-profile-6.jpeg'

type DiscoverUser = {
  id: number
  name: string
  role: 'player' | 'coach'
  organization: string
  avatar: string
}

type ChatMessage = {
  id: number
  sender: 'you' | 'them'
  text: string
  time: string
  attachments: MediaAttachment[]
}

const discoverUsers = ref<DiscoverUser[]>([
  { id: 101, name: 'Coach Carter', role: 'coach', organization: 'Metro Elite Staff', avatar: coachImage1 },
  { id: 102, name: 'Lia Rivera', role: 'player', organization: 'South Bay Storm 16U', avatar: playerImage1 },
  { id: 103, name: 'Coach Nguyen', role: 'coach', organization: 'Velocity Pitch Lab', avatar: coachImage2 },
  { id: 104, name: 'Maya Thompson', role: 'player', organization: 'Canyon Ridge High', avatar: playerImage2 },
  { id: 105, name: 'Elena Ruiz', role: 'player', organization: 'West Valley Gold', avatar: playerImage3 },
])

function shuffledUserIds(ids: number[]): number[] {
  const shuffled = [...ids]
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    const current = shuffled[index]
    shuffled[index] = shuffled[swapIndex]
    shuffled[swapIndex] = current
  }
  return shuffled
}

function avatarForThread(thread: ChatThread): string {
  const matchedUser = discoverUsers.value.find((user) => user.name === thread.name)
  if (matchedUser) {
    return matchedUser.avatar
  }

  const fallbackCoachImages = [coachImage1, coachImage2, coachImage3]
  const fallbackPlayerImages = [playerImage4, playerImage5, playerImage6]
  return thread.role === 'coach' ? fallbackCoachImages[thread.id % fallbackCoachImages.length] : fallbackPlayerImages[thread.id % fallbackPlayerImages.length]
}

const connectedUserIds = ref<number[]>([])
const suggestedUserOrder = ref<number[]>(
  shuffledUserIds(discoverUsers.value.map((user) => user.id)),
)
const threadList = ref<ChatThread[]>([...chatThreads])

const searchTerm = ref('')
const composeSearchTerm = ref('')
const activeThreadId = ref<number>(threadList.value[0]?.id ?? 1)
const showComposeDialog = ref(false)
const showChatScreen = ref(false)
const connectFeedbackOpen = ref(false)
const connectFeedbackText = ref('')
const isComposerFocused = ref(false)
const keyboardOffset = ref(0)

const conversations = ref<Record<number, ChatMessage[]>>({
  1: [
    { id: 1, sender: 'them', text: 'Nice hip rotation in clip 2.', time: '4:08 PM', attachments: [] },
    { id: 2, sender: 'you', text: 'Uploading side-by-side now.', time: '4:10 PM', attachments: [] },
    {
      id: 3,
      sender: 'them',
      text: 'Pause at contact and draw shoulder angle.',
      time: '4:12 PM',
      attachments: [],
    },
  ],
  2: [
    { id: 1, sender: 'them', text: 'Posting bunting lane scores tonight.', time: '3:20 PM', attachments: [] },
  ],
  3: [
    { id: 1, sender: 'them', text: 'Thursday evaluation clips due by 7pm.', time: '2:02 PM', attachments: [] },
  ],
})

const filteredThreads = computed(() => {
  const term = searchTerm.value.trim().toLowerCase()
  if (!term) {
    return threadList.value
  }

  return threadList.value.filter((thread) => {
    return `${thread.name} ${thread.lastMessage}`.toLowerCase().includes(term)
  })
})

const suggestedUsers = computed(() => {
  const term = searchTerm.value.trim().toLowerCase()
  const orderedUsers = suggestedUserOrder.value
    .map((id) => discoverUsers.value.find((user) => user.id === id))
    .filter((user): user is DiscoverUser => Boolean(user))

  return orderedUsers
    .filter((user) => {
      const matches = !term || `${user.name} ${user.organization}`.toLowerCase().includes(term)
      return matches
    })
    .slice(0, 3)
})

const composeSuggestedUsers = computed(() => {
  const term = composeSearchTerm.value.trim().toLowerCase()
  return discoverUsers.value.filter((user) => {
    if (!term) {
      return true
    }
    return `${user.name} ${user.organization} ${user.role}`.toLowerCase().includes(term)
  })
})

const activeThread = computed(() => {
  return threadList.value.find((thread) => thread.id === activeThreadId.value) ?? threadList.value[0]
})

const activeMessages = computed(() => conversations.value[activeThreadId.value] ?? [])

const composerShellStyle = computed(() => {
  if (!isComposerFocused.value || keyboardOffset.value <= 0) {
    return {}
  }

  return {
    transform: `translateY(-${keyboardOffset.value}px)`,
  }
})

function updateKeyboardOffset() {
  if (typeof window === 'undefined' || typeof window.visualViewport === 'undefined') {
    keyboardOffset.value = 0
    return
  }

  const viewport = window.visualViewport
  if (!viewport) {
    keyboardOffset.value = 0
    return
  }

  const offset = window.innerHeight - viewport.height - viewport.offsetTop
  keyboardOffset.value = Math.max(0, Math.round(offset))
}

function handleComposerFocusChange(isFocused: boolean) {
  isComposerFocused.value = isFocused
  if (!isFocused) {
    keyboardOffset.value = 0
    return
  }

  updateKeyboardOffset()
}

function connectUser(userId: number) {
  if (connectedUserIds.value.includes(userId)) {
    return
  }

  connectedUserIds.value.push(userId)
}

function handleConnect(userId: number) {
  const user = discoverUsers.value.find((item) => item.id === userId)
  if (!user) {
    return
  }

  if (connectedUserIds.value.includes(userId)) {
    connectFeedbackText.value = `You are already connected with ${user.name}.`
    connectFeedbackOpen.value = true
    return
  }

  connectUser(userId)
  connectFeedbackText.value = `Connected with ${user.name}.`
  connectFeedbackOpen.value = true
}

function openThread(threadId: number) {
  activeThreadId.value = threadId
  const thread = threadList.value.find((item) => item.id === threadId)
  if (thread) {
    thread.unread = 0
  }
  showChatScreen.value = true
}

function startChatWithUser(userId: number) {
  const user = discoverUsers.value.find((item) => item.id === userId)
  if (!user) {
    return
  }

  const existingThread = threadList.value.find((item) => item.name === user.name)
  if (existingThread) {
    openThread(existingThread.id)
    showComposeDialog.value = false
    return
  }

  const nextId = Math.max(0, ...threadList.value.map((item) => item.id)) + 1
  const newThread: ChatThread = {
    id: nextId,
    name: user.name,
    role: user.role,
    lastMessage: 'New chat started.',
    unread: 0,
  }

  threadList.value.unshift(newThread)
  conversations.value[nextId] = []
  openThread(nextId)
  showComposeDialog.value = false
}

function closeChatScreen() {
  showChatScreen.value = false
}

onMounted(() => {
  if (typeof window === 'undefined' || typeof window.visualViewport === 'undefined') {
    return
  }

  const viewport = window.visualViewport
  if (!viewport) {
    return
  }

  viewport.addEventListener('resize', updateKeyboardOffset)
  viewport.addEventListener('scroll', updateKeyboardOffset)
})

onBeforeUnmount(() => {
  if (typeof window === 'undefined' || typeof window.visualViewport === 'undefined') {
    return
  }

  const viewport = window.visualViewport
  if (!viewport) {
    return
  }

  viewport.removeEventListener('resize', updateKeyboardOffset)
  viewport.removeEventListener('scroll', updateKeyboardOffset)
})

function sendMessage(payload: { text: string; attachments: MediaAttachment[] }) {
  const targetId = activeThreadId.value
  if (!conversations.value[targetId]) {
    conversations.value[targetId] = []
  }

  conversations.value[targetId].push({
    id: Date.now(),
    sender: 'you',
    text: payload.text,
    time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
    attachments: payload.attachments,
  })

  const thread = threadList.value.find((item) => item.id === targetId)
  if (!thread) {
    return
  }

  if (payload.text) {
    thread.lastMessage = payload.text
  } else if (payload.attachments.length) {
    thread.lastMessage = `Sent ${payload.attachments.length} attachment(s)`
  }
}
</script>

<template>
  <v-container fluid class="page-wrap">
    <v-card rounded="xl" class="surface-card">
      <v-card-text>
        <div v-if="!showChatScreen">
        <div class="chat-header">
          <h2 class="chat-title">Messages</h2>
          <v-btn
            class="compose-icon-btn"
            icon="mdi-square-edit-outline"
            variant="flat"
            :elevation="0"
            aria-label="Compose message"
            @click="showComposeDialog = true"
          />
        </div>

        <v-text-field
          v-model="searchTerm"
          prepend-inner-icon="mdi-magnify"
          placeholder="Search"
          variant="outlined"
          density="compact"
          hide-details
          class="mb-4"
        />

        <section class="mb-4">
          <div class="section-head">Suggested Profiles</div>
          <div class="suggested-strip">
            <v-sheet
              v-for="user in suggestedUsers"
              :key="user.id"
              rounded="lg"
              class="suggested-card"
            >
              <v-avatar size="40">
                <v-img :src="user.avatar" :alt="`${user.name} profile picture`" cover />
              </v-avatar>
              <div class="suggested-meta">
                <p class="suggested-name">{{ user.name }}</p>
                <p class="suggested-org">{{ user.organization }}</p>
              </div>
              <v-btn
                :class="connectedUserIds.includes(user.id) ? 'app-btn app-btn-primary connect-btn' : 'app-btn app-btn-secondary connect-btn'"
                size="small"
                :disabled="connectedUserIds.includes(user.id)"
                @click="handleConnect(user.id)"
              >
                {{ connectedUserIds.includes(user.id) ? 'Connected' : 'Connect' }}
              </v-btn>
            </v-sheet>
            <p v-if="!suggestedUsers.length" class="empty-note">No suggested profiles for this search.</p>
          </div>
        </section>

        <section>
          <div class="messages-head-row">
            <div class="section-head messages-head">Messages</div>
            <router-link class="requests-link" to="/share/requests">Requests</router-link>
          </div>
          <v-list lines="two" class="chat-thread-list">
            <v-list-item
              v-for="thread in filteredThreads"
              :key="thread.id"
              :title="thread.name"
              :subtitle="thread.lastMessage"
              rounded="lg"
              @click="openThread(thread.id)"
            >
              <template #prepend>
                <v-avatar size="40">
                  <v-img :src="avatarForThread(thread)" :alt="`${thread.name} profile picture`" cover />
                </v-avatar>
              </template>
              <template #append>
                <v-chip v-if="thread.unread" size="small" color="primary">{{ thread.unread }}</v-chip>
              </template>
            </v-list-item>
          </v-list>
        </section>
        </div>

        <div v-else class="chat-screen">
          <div class="chat-screen-header">
            <v-btn
              icon
              size="small"
              elevation="0"
              class="back-btn"
              @click="closeChatScreen"
            >
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <div class="chat-screen-title-wrap">
              <h3 class="chat-screen-title">{{ activeThread?.name || 'Chat' }}</h3>
              <p class="chat-screen-subtitle">{{ activeThread?.role === 'coach' ? 'Coach' : 'Player' }}</p>
            </div>
          </div>

          <div class="chat-feed-wrap">
            <div v-if="!activeMessages.length" class="empty-note">Start the conversation by sending a message, video, or picture.</div>
            <div
              v-for="message in activeMessages"
              :key="message.id"
              class="message-row"
              :class="message.sender === 'you' ? 'from-you' : 'from-them'"
            >
              <v-sheet class="message-bubble" rounded="lg">
                <p v-if="message.text" class="message-text">{{ message.text }}</p>
                <div v-if="message.attachments.length" class="message-attachments">
                  <v-chip
                    v-for="attachment in message.attachments"
                    :key="attachment.id"
                    size="small"
                    variant="outlined"
                    :prepend-icon="attachment.type === 'video' ? 'mdi-video-outline' : 'mdi-image-outline'"
                  >
                    {{ attachment.name }}
                  </v-chip>
                </div>
                <p class="message-time">{{ message.time }}</p>
              </v-sheet>
            </div>
          </div>

          <div class="chat-composer-shell" :style="composerShellStyle">
            <MessageComposer @send="sendMessage" @focus-change="handleComposerFocusChange" class="w-100" />
          </div>
        </div>
      </v-card-text>
    </v-card>

    <v-dialog v-model="showComposeDialog" max-width="420">
      <v-card rounded="lg">
        <v-card-title>New Message</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="composeSearchTerm"
            prepend-inner-icon="mdi-magnify"
            placeholder="Search people"
            variant="outlined"
            density="compact"
            hide-details
            class="mb-3"
          />
          <div class="section-head">Suggested People</div>
          <v-list lines="two">
            <v-list-item
              v-for="user in composeSuggestedUsers"
              :key="user.id"
              :title="user.name"
              :subtitle="`${user.organization} • ${user.role}`"
            >
              <template #prepend>
                <v-avatar size="34">
                  <v-img :src="user.avatar" :alt="`${user.name} profile picture`" cover />
                </v-avatar>
              </template>
              <template #append>
                <v-btn class="app-btn app-btn-primary" size="small" @click="startChatWithUser(user.id)">
                  Chat
                </v-btn>
              </template>
            </v-list-item>
          </v-list>
          <p v-if="!composeSuggestedUsers.length" class="empty-note mt-2">No suggested people match this search.</p>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="connectFeedbackOpen" color="primary" timeout="2200" location="bottom">
      {{ connectFeedbackText }}
    </v-snackbar>
  </v-container>
</template>

<style scoped>
.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.chat-title {
  margin: 0;
  font-family: 'Barlow Condensed', sans-serif;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.compose-icon-btn {
  width: 38px;
  height: 38px;
  min-width: 38px;
  border-radius: 50%;
  background: #0a9b5a;
  color: #ffffff;
  border: 0;
  box-shadow: none !important;
}

.section-head {
  font-weight: 700;
  margin-bottom: 8px;
}

.messages-head-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 2px;
}

.messages-head {
  margin-bottom: 0;
}

.requests-link {
  color: rgba(13, 41, 31, 0.48);
  font-size: 0.86rem;
  font-weight: 600;
  text-decoration: none;
}

.requests-link:hover {
  color: rgba(13, 41, 31, 0.64);
  text-decoration: underline;
}

.suggested-strip {
  display: grid;
  gap: 10px;
}

.suggested-card {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border: 1px solid rgba(13, 41, 31, 0.12);
}

.suggested-meta {
  min-width: 0;
}

.suggested-name {
  margin: 0;
  font-weight: 700;
  font-size: 0.95rem;
}

.suggested-org {
  margin: 2px 0 0;
  font-size: 0.78rem;
  color: rgba(13, 41, 31, 0.66);
}

.chat-thread-list {
  max-height: 360px;
  overflow-y: auto;
  margin-top: 0;
}

.chat-thread-list :deep(.v-list-item-title) {
  font-weight: 700;
  font-size: 0.95rem;
}

.chat-thread-list :deep(.v-list-item) {
  padding-left: 4px;
  padding-right: 4px;
}

.chat-thread-list :deep(.v-list-item__prepend) {
  margin-right: 10px;
  margin-inline-end: 10px;
}

.chat-thread-list :deep(.v-list-item__spacer) {
  width: 0;
}

.chat-thread-list :deep(.v-list-item__content) {
  text-align: left;
}

.chat-thread-list :deep(.v-list-item__append) {
  margin-left: 8px;
}

.chat-thread-list :deep(.v-list-item-subtitle) {
  text-align: left;
}

.connect-btn :deep(.v-btn__content) {
  font-size: 0.85rem;
  font-weight: 700;
}

.chat-feed-wrap {
  display: grid;
  gap: 10px;
  align-content: start;
  min-height: 220px;
  flex: 1;
  overflow-y: auto;
}

.chat-screen {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 60vh;
}

.chat-screen-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(13, 41, 31, 0.12);
}

.chat-screen-title-wrap {
  min-width: 0;
}

.chat-screen-title {
  margin: 0;
  font-size: 1.02rem;
  font-weight: 700;
}

.chat-screen-subtitle {
  margin: 2px 0 0;
  font-size: 0.8rem;
  color: rgba(13, 41, 31, 0.65);
}

.chat-composer-shell {
  border-top: 1px solid rgba(13, 41, 31, 0.12);
  padding-top: 10px;
}

.back-btn {
  flex-shrink: 0;
  width: 40px !important;
  height: 40px !important;
  min-width: 40px !important;
  border-radius: 50% !important;
  border: 1.5px solid var(--md-primary) !important;
  color: var(--md-primary) !important;
  background: transparent !important;
  box-shadow: none !important;
}

.empty-note {
  color: rgba(13, 41, 31, 0.64);
  font-size: 0.9rem;
}

.message-row {
  display: flex;
}

.from-you {
  justify-content: flex-end;
}

.from-them {
  justify-content: flex-start;
}

.message-bubble {
  max-width: 94%;
  padding: 10px 12px;
  border: 1px solid rgba(13, 41, 31, 0.12);
}

.from-you .message-bubble {
  background: rgba(10, 155, 90, 0.14);
}

.from-them .message-bubble {
  background: rgba(47, 111, 205, 0.08);
}

.message-text {
  margin: 0;
}

.message-time {
  margin: 6px 0 0;
  font-size: 0.72rem;
  color: rgba(13, 41, 31, 0.6);
}

.message-attachments {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}
</style>
