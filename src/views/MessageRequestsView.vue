<template>
  <v-container fluid class="page-wrap">
    <v-card rounded="xl" class="surface-card">
      <v-card-text>
        <div class="requests-head-row">
          <v-btn
            class="app-btn app-btn-secondary requests-back-btn"
            icon="mdi-arrow-left"
            to="/share"
            aria-label="Back to messages"
          />
          <h2 class="requests-title">Message Requests</h2>
        </div>
        <p class="requests-empty">No recent message requests.</p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
.requests-head-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.requests-back-btn {
  width: 40px;
  height: 40px;
  min-width: 40px;
  min-height: 40px;
  border-radius: 50% !important;
  padding: 0;
}

.requests-title {
  margin: 0;
  font-family: 'Barlow Condensed', sans-serif;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.requests-empty {
  margin: 0;
  color: rgba(13, 41, 31, 0.62);
  font-size: 0.92rem;
}
</style>
