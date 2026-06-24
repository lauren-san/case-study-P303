# MyDiamond – Product Brief

## Overview
MyDiamond is a responsive web app for softball players and coaches to improve performance through video analysis, feedback, and skill development.

Users can:
- Create player or coach profiles
- Record and analyze form videos
- Annotate videos (draw lines, slow motion, compare clips)
- Share videos with coaches or peers
- Discover drills by position and skill level

---

## Design Reference
Primary design direction and interaction patterns are based on the Figma prototype:

- [View Figma Prototype](https://www.figma.com/proto/wax8RxrsS4SEe2ctUopA58/DP2?t=urmDwa2PaehCfwIh-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&node-id=86-1&starting-point-node-id=86%3A1&show-proto-sidebar=1)

- Also view the screenshots of the Figma in the context folder

**Usage notes:**
- Treat this as the source of truth for layout, flows, and UI behavior
- Use Vuetify 3 components to match structure and spacing
- Follow responsive behavior implied in the prototype

---

## Tech Stack
- **Framework:** Vue 3
- **UI Library:** Vuetify 3
- **Architecture:** Component-based, mobile-first

---

## Core Features

### 1. Profiles
**User Types**
- Player
- Coach

**Capabilities**
- Create and edit profile
- Add position, skill level, and experience
- Upload profile media
- Add connections (players or coaches)
- Edit profile

---

### 2. Video Capture & Upload
- Record video or upload existing files
- Store videos in a personal library

---

### 3. Video Analysis Tools
Users can:
- Draw overlay lines and angles
- Slow down playback
- Step through frames
- Compare:
  - Video to video
  - Video to image
  - Image to image

---

### 4. Sharing & Feedback
- Share videos with specific users in a chat (coach or player)

---

### 5. Drill Library
- Browse drills by:
  - Position (pitcher, catcher, infield, outfield, 1B, 2B, 3B, SS)
  - Skill level (beginner, intermediate, advanced, elite)
- Drill detail includes:
  - Instructions
  - Video examples
  - Rating from other users
- Should be able to leave a review on a drill. Includes:
    - star rating
    - written feedback
    - answer the question if they think the skill level is in the correct category

---

## Key Screens
- Home 
- Profile (Player / Coach)
- Video Library
- Video Player + Analysis Tools + compare
- Drill Library
- Drill Detail pop up
- Share / chat
- review drill 

---

## Responsive Behavior

### Mobile
- Stacked layout
- Full-width video player
- Simplified navigation

### Tablet
- Two-column layouts
- Persistent navigation elements

### Desktop
- Multi-panel layout (video, tools, comments)
- Expanded navigation

---

## Vuetify Component Guidance
Use standard Vuetify components:

- Layout: `v-container`, `v-row`, `v-col`
- Navigation: `v-app-bar`, `v-navigation-drawer`, `v-tabs`
- Cards: `v-card`
- Forms: `v-text-field`, `v-select`, `v-file-input`
- Buttons: `v-btn`

**Custom components required:**
- Video player controls
- Annotation overlays
- Comparison viewer

---

## Accessibility & UX Principles
- Use clear, simple language
- Ensure high contrast for overlays
- Provide large tap targets on mobile
- Support keyboard navigation on desktop
- Do not rely on color alone for meaning

---

## Notes / Assumptions
- Video processing and annotation require custom logic
- Performance considerations for playback and editing
- Authentication and permissions not fully defined

---

## Open Questions
- Real-time vs delayed feedback?
- File size limits for uploads?
- Role-based permissions?
- Drill content source (static vs CMS)?