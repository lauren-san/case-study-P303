<script setup lang="ts">
import { ref } from 'vue'
import { profile } from '../data/mockData'
import fieldImage from '../../Context/field.jpeg'
import profilePicture from '../../Context/Profile-pic.jpeg'

const form = ref({
  name: profile.name,
  username: profile.username,
  role: profile.role,
  position: profile.position,
  skillLevel: profile.skillLevel,
  experienceYears: profile.experienceYears,
  bio: profile.bio,
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
      <v-avatar size="136" class="avatar-ring profile-avatar">
        <v-img :src="profilePicture" alt="profile picture" />
      </v-avatar>
      <v-card-text>
        <div class="profile-photo-actions">
          <div>
            <p class="profile-photo-label">Profile picture</p>
            <p class="subtitle">Update the photo coaches and teammates see first.</p>
          </div>
          <v-btn class="app-btn app-btn-secondary" prepend-icon="mdi-camera-outline">Update Photo</v-btn>
        </div>

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
            <v-select v-model="form.role" :items="['player', 'coach']" label="Account Type" variant="underlined" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="form.position" label="Primary Position" variant="underlined" />
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              v-model="form.skillLevel"
              :items="['beginner', 'intermediate', 'advanced', 'elite']"
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
            <v-file-input label="Profile media" prepend-icon="mdi-camera" variant="outlined" />
          </v-col>
        </v-row>

        <v-btn class="mt-2 app-btn app-btn-primary" prepend-icon="mdi-content-save">Save Changes</v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
.profile-photo-actions {
  display: grid;
  gap: 12px;
  margin-bottom: 20px;
}

.profile-photo-label {
  margin: 0;
  font-weight: 700;
  color: rgba(13, 41, 31, 0.88);
}
</style>
