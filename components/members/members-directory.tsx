"use client"

import { useState } from "react"
import { MemberCard } from "@/components/members/member-card"
import { MembersFilter } from "@/components/members/members-filter"
import { Pagination } from "@/components/members/pagination"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Users } from "lucide-react"

// Mock data for community members
const mockMembers = [
  {
    id: 1,
    name: "Alex Johnson",
    username: "alexj",
    avatar: "/placeholder.svg?height=100&width=100",
    role: "Admin",
    joinDate: "Jan 2022",
    reputation: 4850,
    posts: 342,
    badges: ["Founder", "Top Contributor", "Problem Solver"],
    online: true,
    bio: "Full-stack developer passionate about React and TypeScript. Community admin and regular contributor.",
    location: "San Francisco, CA",
    website: "https://alexj.dev",
    lastActive: "Just now",
  },
  {
    id: 2,
    name: "Sarah Chen",
    username: "sarahc",
    avatar: "/placeholder.svg?height=100&width=100",
    role: "Moderator",
    joinDate: "Mar 2022",
    reputation: 3720,
    posts: 256,
    badges: ["Moderator", "Helpful", "Early Adopter"],
    online: true,
    bio: "UX designer and accessibility advocate. I help keep the community friendly and inclusive.",
    location: "Toronto, Canada",
    website: "https://sarahchen.design",
    lastActive: "5 minutes ago",
  },
  {
    id: 3,
    name: "Miguel Rodriguez",
    username: "miguelr",
    avatar: "/placeholder.svg?height=100&width=100",
    role: "Elite Member",
    joinDate: "Jun 2022",
    reputation: 2890,
    posts: 187,
    badges: ["Elite", "Tutorial Writer", "Bug Hunter"],
    online: false,
    bio: "Backend developer specializing in Node.js and databases. I love helping newcomers get started.",
    location: "Madrid, Spain",
    website: "https://miguelr.tech",
    lastActive: "2 hours ago",
  },
  {
    id: 4,
    name: "Priya Patel",
    username: "priyap",
    avatar: "/placeholder.svg?height=100&width=100",
    role: "Elite Member",
    joinDate: "Aug 2022",
    reputation: 2450,
    posts: 163,
    badges: ["Elite", "Question Master", "Mentor"],
    online: false,
    bio: "Machine learning engineer and educator. I enjoy discussing AI ethics and practical ML applications.",
    location: "Bangalore, India",
    website: "https://priyapatel.ai",
    lastActive: "Yesterday",
  },
  {
    id: 5,
    name: "David Kim",
    username: "davidk",
    avatar: "/placeholder.svg?height=100&width=100",
    role: "Member",
    joinDate: "Oct 2022",
    reputation: 1870,
    posts: 124,
    badges: ["Rising Star", "Helpful", "Active Voter"],
    online: true,
    bio: "Mobile developer focused on React Native and Flutter. Always looking to learn and share knowledge.",
    location: "Seoul, South Korea",
    website: "https://davidkim.dev",
    lastActive: "Just now",
  },
  {
    id: 6,
    name: "Emma Wilson",
    username: "emmaw",
    avatar: "/placeholder.svg?height=100&width=100",
    role: "Member",
    joinDate: "Dec 2022",
    reputation: 1340,
    posts: 98,
    badges: ["Enthusiast", "Good Question", "Friendly"],
    online: false,
    bio: "Frontend developer and CSS enthusiast. I love creating beautiful, accessible user interfaces.",
    location: "London, UK",
    website: "https://emmawilson.io",
    lastActive: "3 days ago",
  },
  {
    id: 7,
    name: "Omar Hassan",
    username: "omarh",
    avatar: "/placeholder.svg?height=100&width=100",
    role: "Member",
    joinDate: "Feb 2023",
    reputation: 980,
    posts: 76,
    badges: ["Fast Learner", "Helpful", "Good Answer"],
    online: true,
    bio: "DevOps engineer specializing in containerization and CI/CD pipelines. Always happy to help with deployment issues.",
    location: "Cairo, Egypt",
    website: "https://omarhassan.tech",
    lastActive: "30 minutes ago",
  },
  {
    id: 8,
    name: "Sophia Martinez",
    username: "sophiam",
    avatar: "/placeholder.svg?height=100&width=100",
    role: "Member",
    joinDate: "Apr 2023",
    reputation: 720,
    posts: 54,
    badges: ["Newcomer", "Quick Learner"],
    online: false,
    bio: "Game developer and 3D artist. I'm passionate about creating immersive experiences and solving technical challenges.",
    location: "Mexico City, Mexico",
    website: "https://sophiamartinez.art",
    lastActive: "1 week ago",
  },
  {
    id: 9,
    name: "Jamal Williams",
    username: "jamalw",
    avatar: "/placeholder.svg?height=100&width=100",
    role: "Member",
    joinDate: "Jun 2023",
    reputation: 540,
    posts: 42,
    badges: ["Newcomer", "Good Question"],
    online: false,
    bio: "Cloud architect with expertise in AWS and Azure. I enjoy helping teams scale their infrastructure efficiently.",
    location: "Atlanta, GA",
    website: "https://jamalwilliams.cloud",
    lastActive: "2 days ago",
  },
  {
    id: 10,
    name: "Aisha Khan",
    username: "aishak",
    avatar: "/placeholder.svg?height=100&width=100",
    role: "Member",
    joinDate: "Aug 2023",
    reputation: 320,
    posts: 28,
    badges: ["Newcomer"],
    online: true,
    bio: "Security researcher and ethical hacker. I'm passionate about helping developers build more secure applications.",
    location: "Lahore, Pakistan",
    website: "https://aishakhan.security",
    lastActive: "1 hour ago",
  },
  {
    id: 11,
    name: "Lucas Silva",
    username: "lucass",
    avatar: "/placeholder.svg?height=100&width=100",
    role: "Member",
    joinDate: "Oct 2023",
    reputation: 180,
    posts: 17,
    badges: ["Newcomer"],
    online: false,
    bio: "Data scientist focused on NLP and computer vision. I love discussing the latest AI research and applications.",
    location: "São Paulo, Brazil",
    website: "https://lucassilva.data",
    lastActive: "4 days ago",
  },
  {
    id: 12,
    name: "Zoe Chen",
    username: "zoec",
    avatar: "/placeholder.svg?height=100&width=100",
    role: "Member",
    joinDate: "Dec 2023",
    reputation: 90,
    posts: 8,
    badges: ["Newcomer"],
    online: true,
    bio: "Product manager and former developer. I enjoy bridging the gap between technical and business perspectives.",
    location: "Vancouver, Canada",
    website: "https://zoechen.product",
    lastActive: "15 minutes ago",
  },
]

export function MembersDirectory() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState("reputation")
  const [filterRole, setFilterRole] = useState("all")
  const [filterOnline, setFilterOnline] = useState(false)

  const itemsPerPage = 8

  // Filter members based on search query and filters
  const filteredMembers = mockMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.bio.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRole = filterRole === "all" || member.role.toLowerCase() === filterRole.toLowerCase()
    const matchesOnline = !filterOnline || member.online

    return matchesSearch && matchesRole && matchesOnline
  })

  // Sort members based on selected sort option
  const sortedMembers = [...filteredMembers].sort((a, b) => {
    switch (sortBy) {
      case "reputation":
        return b.reputation - a.reputation
      case "posts":
        return b.posts - a.posts
      case "newest":
        return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime()
      case "oldest":
        return new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime()
      case "alphabetical":
        return a.name.localeCompare(b.name)
      default:
        return b.reputation - a.reputation
    }
  })

  // Paginate members
  const totalPages = Math.ceil(sortedMembers.length / itemsPerPage)
  const paginatedMembers = sortedMembers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-muted-foreground" />
          <span className="text-muted-foreground">
            {filteredMembers.length} {filteredMembers.length === 1 ? "member" : "members"}
          </span>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search members..."
              className="w-full pl-8 sm:w-[250px]"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1) // Reset to first page on new search
              }}
            />
          </div>

          <Select
            value={sortBy}
            onValueChange={(value) => {
              setSortBy(value)
              setCurrentPage(1) // Reset to first page on sort change
            }}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="reputation">Reputation (High to Low)</SelectItem>
              <SelectItem value="posts">Post Count (High to Low)</SelectItem>
              <SelectItem value="newest">Newest Members</SelectItem>
              <SelectItem value="oldest">Oldest Members</SelectItem>
              <SelectItem value="alphabetical">Alphabetical (A-Z)</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            className="w-full sm:w-auto"
            onClick={() => {
              setFilterOnline(!filterOnline)
              setCurrentPage(1) // Reset to first page on filter change
            }}
          >
            {filterOnline ? "Show All" : "Show Online Only"}
          </Button>
        </div>
      </div>

      <MembersFilter
        selectedRole={filterRole}
        onRoleChange={(role) => {
          setFilterRole(role)
          setCurrentPage(1) // Reset to first page on filter change
        }}
      />

      {paginatedMembers.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {paginatedMembers.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      ) : (
        <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <Users className="h-10 w-10 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No members found</h3>
          <p className="mt-2 text-sm text-muted-foreground">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}
    </div>
  )
}
