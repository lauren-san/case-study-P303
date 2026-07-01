# MyDiamond - Product Brief

## Overview
MyDiamond is a mobile-first softball development app focused on drills, team communication, and player progress tracking.

The app supports:
- Profile management for players and coaches
- Drill discovery and drill detail learning flows
- Drill to-do tracking across screens
- Team messaging with connection workflows
- Practice and game schedule visibility

## Design Reference
Primary interaction and layout direction come from this Figma prototype:

- [View Figma Prototype](https://www.figma.com/proto/wax8RxrsS4SEe2ctUopA58/DP2?t=urmDwa2PaehCfwIh-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&node-id=86-1&starting-point-node-id=86%3A1&show-proto-sidebar=1)

Usage notes:
- Match component structure and spacing patterns from the prototype.
- Prioritize mobile behavior and card-contained transitions.
- Use context assets/screenshots as visual support where needed.

## Tech Stack
- Framework: Vue 3
- Build: Vite
- Language: TypeScript
- Routing: Vue Router
- UI: Vuetify 3

## Current Product Scope

### 1. Home Dashboard
- Hero section with quick action links
- Practice and game calendar section
- Saved drill to-do list with:
  - checkbox completion state
  - strike-through for checked items
  - remove actions
  - persistent local storage-backed state

### 2. Drill Library
- Search by keyword
- Filtering by position, level, and focus
- Recommended and popular drill sections
- Drill detail opens inside the mobile card flow (not fullscreen popup)
- Drill detail includes:
  - media area (image or embedded video)
  - rating and review count
  - drill tags
  - summary and step-by-step instructions
- Add to To-Do List behavior:
  - confirmation feedback
  - visual state change after added
  - shared state reflected on Home to-do list

### 3. Messaging (Share/Chat)
- Suggested profiles (3 at a time)
- Connect action with confirmation feedback
- Connected button state after click
- Message list and in-card thread view
- Thread opens as a contained screen inside the mobile card (IG-like flow)
- Composer supports text + attachments

### 4. Profile
- User profile screen and related data presentation

### 5. Message Requests
- Requests screen routed from chat area

## Navigation and Route Decisions
- Active primary areas:
  - Home
  - Drill Library
  - Share/Chat
  - Profile
- Removed from active navigation:
  - Video page
  - Review Drill page
- Legacy route handling:
  - `/studio` redirects to `/`
  - `/review` redirects to `/`

## Data and State Behavior
- Drill to-do list is shared across Home and Drill Library.
- To-do list persistence is handled through local storage.
- Connected profile state in chat is local/session behavior.

## Responsive and UX Expectations

### Mobile (Primary)
- Card-contained screen transitions
- Bottom navigation persistence
- Large tap targets and compact readable density

### Tablet/Desktop (Secondary)
- Maintain functional parity
- Preserve readability and spacing without breaking mobile-first patterns

## Accessibility and Interaction Principles
- Clear text hierarchy and concise labels
- High contrast for interactive controls
- Explicit state indicators (connected, added, checked)
- Keyboard-accessible inputs and controls where applicable

## Next Candidate Enhancements
- Backend persistence and auth for drills, connections, and chat
- Real-time chat updates
- Calendar CRUD and team sync integration
- Drill review submission flow (rating + written feedback)
- Notifications and reminders

## Open Questions
- Should connect state persist per user account or remain session-only?
- Should to-do completion sync across devices/accounts?
- What is the source of truth for calendar events (static, team admin, external calendar)?
- Should drill reviews be public, team-only, or coach-only?