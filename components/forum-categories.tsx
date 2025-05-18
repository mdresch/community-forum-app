// forum-categories.tsx
"use client";

import React from "react";
import Link from "next/link"
import { MessageSquare, Users, Code, Lightbulb, HelpCircle, Briefcase } from "lucide-react"
import { useCategories } from "@/hooks/useForumData"

// Map category names to icons
const categoryIcons: Record<string, React.ReactNode> = {
  "General Discussion": <MessageSquare className="h-5 w-5" />,
  "Introductions": <Users className="h-5 w-5" />,
  "Development": <Code className="h-5 w-5" />,
  "Ideas & Feedback": <Lightbulb className="h-5 w-5" />,
  "Help & Support": <HelpCircle className="h-5 w-5" />,
  "Jobs & Opportunities": <Briefcase className="h-5 w-5" />,
};

export default function ForumCategories() {
  const { categories, isLoading } = useCategories();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {/* Your existing skeleton loader */}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <Link 
          key={category._id} 
          href={`/forums/${category.slug}`}
          className="flex items-start gap-4 rounded-lg border p-4 hover:border-primary transition-colors"
        >
          <div className="mt-1">{categoryIcons[category.name] || <MessageSquare className="h-5 w-5" />}</div>
          <div className="flex-1 space-y-2">
            <div className="flex justify-between items-start">
              <h3 className="font-medium">{category.name}</h3>
              <div className="text-sm text-muted-foreground">
                {category.threadCount} threads
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{category.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
