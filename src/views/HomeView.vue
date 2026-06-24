<script setup lang="ts">
import { drills, profile } from '../data/mockData'

const quickLinks = [
  { title: 'Video Studio', to: '/studio', icon: 'mdi-video-outline', color: 'primary' },
  { title: 'Drill Library', to: '/drills', icon: 'mdi-baseball-diamond-outline', color: 'secondary' },
  { title: 'Share and Chat', to: '/share', icon: 'mdi-forum-outline', color: 'primary' },
  { title: 'Review a Drill', to: '/review', icon: 'mdi-star-outline', color: 'secondary' },
]
</script>

<template>
  <v-container fluid class="page-wrap">
    <v-row>
      <v-col cols="12" lg="8">
        <v-card rounded="xl" class="surface-card hero-panel mb-4">
          <v-card-text>
            <v-chip color="primary" prepend-icon="mdi-home">Home</v-chip>
            <h1 class="page-title mt-4">Develop your game with focused video feedback.</h1>
            <p class="page-copy">
              Record, annotate, compare, and share your clips with coaches and teammates to improve
              mechanics session by session.
            </p>
            <div class="quick-grid">
              <v-btn
                v-for="link in quickLinks"
                :key="link.to"
                :to="link.to"
                :prepend-icon="link.icon"
                :color="link.color"
                variant="flat"
                rounded="pill"
              >
                {{ link.title }}
              </v-btn>
            </div>
          </v-card-text>
        </v-card>

        <v-row>
          <v-col cols="12" md="6" v-for="drill in drills" :key="drill.id">
            <v-card rounded="lg" class="surface-card h-100">
              <v-card-title>{{ drill.title }}</v-card-title>
              <v-card-subtitle>{{ drill.position }} · {{ drill.level }}</v-card-subtitle>
              <v-card-text>
                {{ drill.summary }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" lg="4">
        <v-card rounded="xl" class="surface-card mb-4">
          <v-card-title>Player Snapshot</v-card-title>
          <v-card-text>
            <v-list density="compact" lines="one">
              <v-list-item title="Name" :subtitle="profile.name" />
              <v-list-item title="Role" :subtitle="profile.role" />
              <v-list-item title="Position" :subtitle="profile.position" />
              <v-list-item title="Skill Level" :subtitle="profile.skillLevel" />
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-btn to="/profile" color="primary" prepend-icon="mdi-account">View Profile</v-btn>
          </v-card-actions>
        </v-card>

        <v-card rounded="xl" class="surface-card">
          <v-card-title>Today Focus</v-card-title>
          <v-card-text>
            <v-timeline side="end" density="compact" truncate-line="both">
              <v-timeline-item dot-color="primary" size="small" icon="mdi-camera">Upload swing clip</v-timeline-item>
              <v-timeline-item dot-color="secondary" size="small" icon="mdi-ruler">Mark hip/shoulder angles</v-timeline-item>
              <v-timeline-item dot-color="primary" size="small" icon="mdi-share-variant">Send notes to Coach Carter</v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
