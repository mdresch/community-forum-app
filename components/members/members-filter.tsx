"use client"

import { Button } from "@/components/ui/button"

interface MembersFilterProps {
  selectedRole: string
  onRoleChange: (role: string) => void
}

export function MembersFilter({ selectedRole, onRoleChange }: MembersFilterProps) {
  const roles = [
    { id: "all", label: "All Members" },
    { id: "admin", label: "Admins" },
    { id: "moderator", label: "Moderators" },
    { id: "elite member", label: "Elite Members" },
    { id: "member", label: "Regular Members" },
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {roles.map((role) => (
        <Button
          key={role.id}
          variant={selectedRole === role.id ? "default" : "outline"}
          size="sm"
          onClick={() => onRoleChange(role.id)}
        >
          {role.label}
        </Button>
      ))}
    </div>
  )
}
