// Mock data for members
const members = [
  {
    id: 1,
    name: "Alex Johnson",
    username: "alexj",
    avatar: "/placeholder.svg?height=400&width=400",
    role: "Admin",
    joinDate: "Jan 2020",
    reputation: 15420,
    posts: 1243,
    badges: [
      "5 Year Member",
      "1000+ Posts",
      "Top Contributor",
      "Helpful Expert",
      "Problem Solver",
      "Code Guru",
      "Community Leader",
      "First Reply",
      "Early Adopter",
      "Beta Tester",
    ],
    online: true,
    bio: "Full-stack developer passionate about React, Next.js, and building community tools. Admin of this forum since 2020.",
    location: "San Francisco, CA",
    website: "https://alexjohnson.dev",
    lastActive: "Just now",
    verified: true,
    followers: 342,
    following: 128,
    trustLevel: 4,
    reputationLevel: "Legend",
    reputationProgress: 85,
    reputationPoints: 15420,
    nextLevelPoints: 20000,
    activities: [
      {
        id: "act1",
        type: "post",
        title: "How to optimize React performance",
        content:
          "I've found that using React.memo and useMemo hooks can significantly improve performance in large applications...",
        timestamp: "2 hours ago",
        link: "/forums/react/optimizing-performance",
        category: "React",
      },
      {
        id: "act2",
        type: "thread",
        title: "Next.js 15 Features Discussion",
        content: "Let's discuss the new features in Next.js 15 and how they can improve our development workflow...",
        timestamp: "Yesterday",
        link: "/forums/nextjs/nextjs-15-features",
        category: "Next.js",
      },
      {
        id: "act3",
        type: "badge",
        title: "Problem Solver",
        timestamp: "3 days ago",
        link: "/badges/problem-solver",
      },
      {
        id: "act4",
        type: "like",
        title: "TypeScript Best Practices",
        timestamp: "1 week ago",
        link: "/forums/typescript/best-practices",
      },
      {
        id: "act5",
        type: "poll",
        title: "Which state management library do you prefer?",
        timestamp: "2 weeks ago",
        link: "/forums/react/state-management-poll",
      },
    ],
    threads: [
      {
        id: "thread1",
        title: "Next.js 15 Features Discussion",
        excerpt: "Let's discuss the new features in Next.js 15 and how they can improve our development workflow...",
        category: "Next.js",
        categorySlug: "nextjs",
        timestamp: "Yesterday",
        replies: 24,
        views: 342,
        likes: 56,
        isPinned: true,
        slug: "nextjs-15-features",
      },
      {
        id: "thread2",
        title: "React Server Components: A Deep Dive",
        excerpt: "In this thread, I want to explore React Server Components in depth and discuss best practices...",
        category: "React",
        categorySlug: "react",
        timestamp: "Last week",
        replies: 42,
        views: 567,
        likes: 89,
        slug: "react-server-components-deep-dive",
      },
      {
        id: "thread3",
        title: "TypeScript Tips for Large Codebases",
        excerpt: "Managing TypeScript in large projects can be challenging. Here are some tips I've learned...",
        category: "TypeScript",
        categorySlug: "typescript",
        timestamp: "2 weeks ago",
        replies: 18,
        views: 230,
        likes: 45,
        slug: "typescript-tips-large-codebases",
      },
    ],
    reputationHistory: {
      events: [
        {
          id: "rep1",
          type: "post",
          points: 15,
          source: "Thread: React Performance Tips",
          timestamp: "Today",
          description: "Quality post in React Performance Tips",
        },
        {
          id: "rep2",
          type: "received_like",
          points: 10,
          source: "User: @sarahdev",
          timestamp: "Yesterday",
          description: "Received like on your comment",
        },
        {
          id: "rep3",
          type: "badge",
          points: 50,
          source: "Badge: Problem Solver",
          timestamp: "3 days ago",
          description: "Earned the Problem Solver badge",
        },
        {
          id: "rep4",
          type: "downvote",
          points: -2,
          source: "Thread: CSS Grid vs Flexbox",
          timestamp: "Last week",
          description: "Downvote on your comment",
        },
        {
          id: "rep5",
          type: "thread",
          points: 25,
          source: "Created: Next.js 15 Features",
          timestamp: "Last week",
          description: "Created popular discussion thread",
        },
      ],
      stats: {
        total: 15420,
        thisMonth: 320,
        thisWeek: 75,
        distribution: {
          posts: 45,
          likes: 30,
          badges: 15,
          other: 10,
        },
      },
    },
  },
  {
    id: 2,
    name: "Sarah Miller",
    username: "sarahdev",
    avatar: "/placeholder.svg?height=400&width=400",
    role: "Moderator",
    joinDate: "Mar 2021",
    reputation: 8750,
    posts: 876,
    badges: ["2 Year Member", "500+ Posts", "Helpful Expert", "Bug Hunter"],
    online: false,
    bio: "Frontend developer specializing in UI/UX. Passionate about accessible web design and modern CSS techniques.",
    location: "Portland, OR",
    website: "https://sarahmiller.design",
    lastActive: "3 hours ago",
    verified: true,
    followers: 215,
    following: 87,
    trustLevel: 3,
    reputationLevel: "Expert",
    reputationProgress: 60,
    reputationPoints: 8750,
    nextLevelPoints: 10000,
  },
  {
    id: 3,
    name: "Miguel Rodriguez",
    username: "miguelr",
    avatar: "/placeholder.svg?height=400&width=400",
    role: "Elite Member",
    joinDate: "Aug 2022",
    reputation: 4320,
    posts: 432,
    badges: ["1 Year Member", "100+ Posts", "Quick Responder"],
    online: true,
    bio: "Backend developer working with Node.js and databases. Always learning and sharing knowledge with the community.",
    location: "Miami, FL",
    lastActive: "1 hour ago",
    verified: false,
    followers: 98,
    following: 120,
    trustLevel: 2,
    reputationLevel: "Contributor",
    reputationProgress: 75,
    reputationPoints: 4320,
    nextLevelPoints: 5000,
  },
]

export function getAllMembers() {
  return members
}

export function getMemberByUsername(username: string) {
  return members.find((member) => member.username === username)
}

export function getMemberById(id: number) {
  return members.find((member) => member.id === id)
}
