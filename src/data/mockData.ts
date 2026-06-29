export type UserType = 'player' | 'coach'

export type Profile = {
  name: string
  username: string
  role: UserType
  age: number
  grade: string
  school: string
  travelTeam: string
  primaryPosition: string
  secondaryPosition: string
  skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'elite'
  experienceYears: number
  playerConnections: number
  coachConnections: number
  bio: string
}

export type Drill = {
  id: number
  title: string
  position: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'elite'
  rating: number
  reviews: number
  summary: string
  instructions: string[]
}

export type ChatThread = {
  id: number
  name: string
  role: UserType
  lastMessage: string
  unread: number
}

export const profile: Profile = {
  name: 'Gina Ramirez',
  username: 'girami56',
  role: 'player',
  age: 16,
  grade: 'Sophomore',
  school: 'Riverside High School',
  travelTeam: 'South Bay Storm 16U',
  primaryPosition: 'Shortstop',
  secondaryPosition: 'Utility',
  skillLevel: 'intermediate',
  experienceYears: 6,
  playerConnections: 18,
  coachConnections: 4,
  bio: 'Middle infielder focused on cleaner swing path and first-step quickness.',
}

export const drills: Drill[] = [
  {
    id: 1,
    title: 'Bunting Lanes Drill',
    position: 'softball',
    level: 'intermediate',
    rating: 4.3,
    reviews: 452,
    summary: 'Build directional control and confidence while bunting under pressure.',
    instructions: [
      'Set three cone lanes in front of home plate.',
      'Execute ten bunts and land at least six in target lanes.',
      'Track launch angle and bat contact point after each rep.',
    ],
  },
  {
    id: 2,
    title: 'Rapid Transfer Grid',
    position: 'infield',
    level: 'advanced',
    rating: 4.7,
    reviews: 128,
    summary: 'Improve glove-to-hand speed for middle infield double-play turns.',
    instructions: [
      'Use four markers in a box and shuffle clockwise.',
      'Field short-hop feeds and transfer in under 0.6 seconds.',
      'Alternate forehand and backhand pickups every set.',
    ],
  },
  {
    id: 3,
    title: 'Catcher Pop Burst',
    position: 'catcher',
    level: 'elite',
    rating: 4.5,
    reviews: 91,
    summary: 'Explosive pop-time sequence with rotational power focus.',
    instructions: [
      'Receive and stick low target strikes for framing consistency.',
      'Explode to second base target with one smooth transfer.',
      'Review foot replacement and shoulder alignment each rep.',
    ],
  },
]

export const chatThreads: ChatThread[] = [
  {
    id: 1,
    name: 'Coach Carter',
    role: 'coach',
    lastMessage: 'Swing plane looked better after rep 3. Share side-by-side view next.',
    unread: 2,
  },
  {
    id: 2,
    name: 'Rivera Squad',
    role: 'player',
    lastMessage: 'Posting bunting lane scores tonight.',
    unread: 0,
  },
  {
    id: 3,
    name: 'Hitting Lab Group',
    role: 'coach',
    lastMessage: 'Reminder: Thursday evaluation clips due by 7pm.',
    unread: 4,
  },
]

export const playbackSteps = ['capture', 'annotate', 'compare', 'share'] as const
