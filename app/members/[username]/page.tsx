import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { MemberProfile } from "@/components/members/member-profile"

// This would come from your database in a real application
import { getMemberByUsername } from "@/lib/data/members-data"

interface MemberPageProps {
  params: {
    username: string
  }
}

export async function generateMetadata({ params }: MemberPageProps): Promise<Metadata> {
  const member = getMemberByUsername(params.username)

  if (!member) {
    return {
      title: "Member Not Found",
    }
  }

  return {
    title: `${member.name} (@${member.username}) | Community Forum`,
    description: `View ${member.name}'s profile, contributions, and achievements in our community.`,
  }
}

export default async function MemberPage({ params }: MemberPageProps) {
  const resolvedParams = await params;
  const member = getMemberByUsername(resolvedParams.username)

  if (!member) {
    notFound()
  }

  return <MemberProfile member={member} />
}
