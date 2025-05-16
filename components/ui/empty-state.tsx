"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  icon: React.ReactNode
  title: string
  description: string
  action?: {
    label: string
    href: string
    onClick?: () => void
  }
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-muted p-6 text-muted-foreground">{icon}</div>
      <h3 className="mt-6 text-xl font-semibold">{title}</h3>
      <p className="mt-2 max-w-sm text-muted-foreground">{description}</p>

      {action && (
        <div className="mt-6">
          {action.onClick ? (
            <Button onClick={action.onClick}>{action.label}</Button>
          ) : (
            <Button asChild>
              <Link href={action.href}>{action.label}</Link>
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
