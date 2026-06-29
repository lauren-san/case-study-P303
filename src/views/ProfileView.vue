<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { profile } from '../data/mockData'
import fieldImage from '../../Context/field.jpeg'
import profilePicture from '../../Context/Profile-pic.jpeg'

const positionOptions = [
  'Pitcher',
  'Catcher',
  'First Base',
  'Second Base',
  'Third Base',
  'Shortstop',
  'Right Field',
  'Left Field',
  'Center Field',
  'Utility',
]

const roleOptions = [
  { title: 'Player', value: 'player' },
  { title: 'Coach', value: 'coach' },
]

const skillLevelOptions = [
  { title: 'Beginner', value: 'beginner' },
  { title: 'Intermediate', value: 'intermediate' },
  { title: 'Advanced', value: 'advanced' },
  { title: 'Elite', value: 'elite' },
]

const gradeOptions = [
  'Kindergarten',
  '1st Grade',
  '2nd Grade',
  '3rd Grade',
  '4th Grade',
  '5th Grade',
  '6th Grade',
  '7th Grade',
  '8th Grade',
  'Freshman',
  'Sophomore',
  'Junior',
  'Senior',
  'College Freshman',
  'College Sophomore',
  'College Junior',
  'College Senior',
  'Graduate',
]

const form = ref({
  name: profile.name,
  username: profile.username,
  role: profile.role,
  age: profile.age,
  grade: profile.grade,
  school: profile.school,
  travelTeam: profile.travelTeam,
  primaryPosition: profile.primaryPosition,
  secondaryPosition: profile.secondaryPosition,
  skillLevel: profile.skillLevel,
  experienceYears: profile.experienceYears,
  bio: profile.bio,
})

const currentProfilePicture = ref(profilePicture)
const photoUploadInput = ref<HTMLInputElement | null>(null)

type ProfileVideo = {
  id: number
  title: string
  duration: string
  uploaded: string
}

const profileVideos = ref<ProfileVideo[]>([
  { id: 1, title: 'Hitting Session - Tee Work', duration: '00:42', uploaded: 'Jun 27, 2026' },
  { id: 2, title: 'Infield Footwork Progression', duration: '01:16', uploaded: 'Jun 24, 2026' },
  { id: 3, title: 'Throwing Mechanics Side View', duration: '00:58', uploaded: 'Jun 21, 2026' },
])

const initialFormSnapshot = ref(JSON.stringify(form.value))
const initialProfilePicture = ref(currentProfilePicture.value)
const initialVideoSnapshot = ref(JSON.stringify(profileVideos.value))

const showUnsavedDialog = ref(false)
const showSavedSnackbar = ref(false)
const pendingNavigation = ref<null | (() => void)>(null)

const hasUnsavedChanges = computed(() => {
  const formChanged = JSON.stringify(form.value) !== initialFormSnapshot.value
  const photoChanged = currentProfilePicture.value !== initialProfilePicture.value
  const videosChanged = JSON.stringify(profileVideos.value) !== initialVideoSnapshot.value
  return formChanged || photoChanged || videosChanged
})

const videoUploadInput = ref<HTMLInputElement | null>(null)

function openVideoUpload() {
  videoUploadInput.value?.click()
}

function openPhotoUpload() {
  photoUploadInput.value?.click()
}

function handlePhotoUpload(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) {
    return
  }

  currentProfilePicture.value = URL.createObjectURL(file)
  input.value = ''
}

function handleVideoUpload(event: Event) {
  const input = event.target as HTMLInputElement
  const files = Array.from(input.files ?? [])

  for (const file of files) {
    profileVideos.value.unshift({
      id: Date.now() + Math.floor(Math.random() * 1000),
      title: file.name,
      duration: 'Pending',
      uploaded: 'Just now',
    })
  }

  input.value = ''
}

function commitProfileChanges() {
  initialFormSnapshot.value = JSON.stringify(form.value)
  initialProfilePicture.value = currentProfilePicture.value
  initialVideoSnapshot.value = JSON.stringify(profileVideos.value)
}

function saveProfile() {
  commitProfileChanges()
  showSavedSnackbar.value = true
}

function stayOnProfile() {
  showUnsavedDialog.value = false
  pendingNavigation.value = null
}

function discardAndLeave() {
  showUnsavedDialog.value = false
  const continueNavigation = pendingNavigation.value
  pendingNavigation.value = null
  continueNavigation?.()
}

function saveAndLeave() {
  commitProfileChanges()
  showSavedSnackbar.value = true
  showUnsavedDialog.value = false
  const continueNavigation = pendingNavigation.value
  pendingNavigation.value = null
  continueNavigation?.()
}

onBeforeRouteLeave((_to, _from, next) => {
  if (!hasUnsavedChanges.value) {
    next()
    return
  }

  showUnsavedDialog.value = true
  pendingNavigation.value = () => next()
  next(false)
})

function handleBeforeUnload(event: BeforeUnloadEvent) {
  if (!hasUnsavedChanges.value) {
    return
  }

  event.preventDefault()
  event.returnValue = ''
}

onMounted(() => {
  window.addEventListener('beforeunload', handleBeforeUnload)
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload)
})
</script>

<template>
  <v-container fluid class="page-wrap">
    <v-card rounded="xl" class="surface-card">
      <v-img
        class="profile-banner"
        height="184"
        cover
        :src="fieldImage"
        alt="softball field"
      />
      <div class="profile-avatar-wrap">
        <v-avatar size="136" class="avatar-ring profile-avatar">
          <v-img :src="currentProfilePicture" alt="profile picture" />
        </v-avatar>
        <v-btn
          class="avatar-edit-btn"
          icon="mdi-camera-outline"
          size="small"
          density="comfortable"
          @click="openPhotoUpload"
        />
      </div>
      <v-card-text>
        <input
          ref="photoUploadInput"
          type="file"
          accept="image/*"
          class="hidden-photo-input"
          @change="handlePhotoUpload"
        />
        <h1 class="page-title">{{ profile.name }}</h1>
        <p class="subtitle">{{ profile.username }}</p>

        <div class="stats-row">
          <div>
            <strong>{{ profile.playerConnections }}</strong>
            <p>player connections</p>
          </div>
          <div>
            <strong>{{ profile.coachConnections }}</strong>
            <p>coach connections</p>
          </div>
        </div>

        <v-row class="mt-4" dense>
          <v-col cols="12" md="6">
            <v-text-field v-model="form.name" label="Name" variant="underlined" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="form.username" label="Username" variant="underlined" />
          </v-col>
          <v-col cols="12" md="6">
            <v-select v-model="form.role" :items="roleOptions" label="Account Type" variant="underlined" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.age"
              type="number"
              min="4"
              max="40"
              step="1"
              label="Age"
              variant="underlined"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              v-model="form.grade"
              :items="gradeOptions"
              label="Grade"
              variant="underlined"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="form.school" label="School" variant="underlined" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="form.travelTeam" label="Travel Team" variant="underlined" />
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              v-model="form.primaryPosition"
              :items="positionOptions"
              label="Primary Position"
              variant="underlined"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              v-model="form.secondaryPosition"
              :items="positionOptions"
              label="Secondary Position"
              variant="underlined"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              v-model="form.skillLevel"
              :items="skillLevelOptions"
              label="Skill Level"
              variant="underlined"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model.number="form.experienceYears"
              type="number"
              min="0"
              max="30"
              label="Experience (years)"
              variant="underlined"
            />
          </v-col>
          <v-col cols="12">
            <v-textarea v-model="form.bio" label="Bio" variant="outlined" rows="3" />
          </v-col>
          <v-col cols="12">
            <input
              ref="videoUploadInput"
              type="file"
              accept="video/*"
              multiple
              class="hidden-video-input"
              @change="handleVideoUpload"
            />
            <div class="profile-video-actions">
              <div>
                <p class="profile-photo-label">Profile Videos</p>
                <p class="upload-help">Players can upload videos here to showcase mechanics and progress on their profile.</p>
              </div>
              <v-btn class="app-btn app-btn-secondary" prepend-icon="mdi-video-plus" @click="openVideoUpload">Upload Video</v-btn>
            </div>

            <v-list class="video-list" lines="two">
              <v-list-item
                v-for="video in profileVideos"
                :key="video.id"
                prepend-icon="mdi-play-circle-outline"
                :title="video.title"
                :subtitle="`${video.duration} • ${video.uploaded}`"
              />
            </v-list>
          </v-col>
        </v-row>

        <v-btn class="mt-2 app-btn app-btn-primary" prepend-icon="mdi-content-save" :disabled="!hasUnsavedChanges" @click="saveProfile">Save Changes</v-btn>
      </v-card-text>
    </v-card>

    <v-snackbar
      v-model="showSavedSnackbar"
      color="primary"
      location="bottom"
      :timeout="3000"
      rounded="pill"
    >
      <v-icon icon="mdi-check-circle-outline" class="mr-2" />
      Changes saved.
    </v-snackbar>

    <v-dialog v-model="showUnsavedDialog" max-width="430" persistent>
      <v-card rounded="lg">
        <v-card-title>Unsaved Changes</v-card-title>
        <v-card-text>
          You have unsaved updates on this profile. Do you want to save before leaving?
        </v-card-text>
        <v-card-actions class="dialog-actions">
          <v-btn class="app-btn app-btn-secondary" @click="stayOnProfile">Stay</v-btn>
          <v-btn class="app-btn app-btn-secondary" @click="discardAndLeave">Discard</v-btn>
          <v-btn class="app-btn app-btn-primary" @click="saveAndLeave">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
.profile-avatar-wrap {
  position: relative;
  width: fit-content;
  margin: -68px auto 10px;
  z-index: 2;
}

.profile-avatar {
  margin: 0;
}

.avatar-edit-btn {
  position: absolute;
  right: 8px;
  top: 8px;
  width: 34px;
  height: 34px;
  min-width: 34px;
  border-radius: 50%;
  background: var(--md-primary);
  color: #fff;
  border: 2px solid #f2f5ef;
  z-index: 3;
  pointer-events: auto;
}

.upload-help {
  margin: 8px 0 0;
  font-size: 0.86rem;
  color: rgba(13, 41, 31, 0.72);
}

.hidden-video-input {
  display: none;
}

.hidden-photo-input {
  display: none;
}

.profile-video-actions {
  display: grid;
  gap: 12px;
  margin-bottom: 12px;
}

.video-list {
  border: 1px solid rgba(13, 41, 31, 0.12);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.65);
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 0 16px 16px;
}
</style>
