import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/ProfileView.vue'
import VideoStudioView from '../views/VideoStudioView.vue'
import DrillLibraryView from '../views/DrillLibraryView.vue'
import ChatView from '../views/ChatView.vue'
import ReviewDrillView from '../views/ReviewDrillView.vue'
import MessageRequestsView from '../views/MessageRequestsView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/profile', name: 'profile', component: ProfileView },
    { path: '/studio', name: 'studio', component: VideoStudioView },
    { path: '/drills', name: 'drills', component: DrillLibraryView },
    { path: '/share', name: 'share', component: ChatView },
    { path: '/share/requests', name: 'requests', component: MessageRequestsView },
    { path: '/review', name: 'review', component: ReviewDrillView },
  ],
})

export default router
