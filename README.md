# MyDiamond

MyDiamond is a mobile-first Vue app for softball players and coaches to manage drills, connect through chat, and keep track of practice priorities.

This project is built with Vue 3, Vite, TypeScript, Vue Router, and Vuetify 3.

## Current App Scope

The current implementation includes:

- Home dashboard
	- Quick actions
	- Practice and game calendar
	- Saved drill to-do list with checkboxes and persistence
- Drill library
	- Search and filters (position, level, focus)
	- Drill detail screen inside the mobile card flow
	- Ratings, reviews count, instructions, and media
	- Add to to-do list with confirmation and button state feedback
- Share / Chat
	- Suggested profiles with connect action and confirmation
	- In-card message thread screen (no popup modal)
	- Message composer with text and media attachment support
- Profile page
- Message requests page

Notes:

- Video page and review drill page are removed from app navigation and routing.
- Legacy routes `/studio` and `/review` redirect to `/`.

## Tech Stack

- Vue 3
- Vite
- TypeScript
- Vue Router
- Vuetify 3
- Material Design Icons

## Getting Started

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Project Structure

- `src/views` - Route-level screens
- `src/components` - Reusable UI components
- `src/composables` - Shared state/logic (for example drill to-do state)
- `src/data` - Mock app data
- `src/router` - Route definitions
- `src/styles` - Global styling

## Design + Product Reference

See the product brief in `BRIEF.md` for product direction and scope expectations.
