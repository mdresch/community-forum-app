// forum-categories.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MessageSquare, Users, Code, Lightbulb, HelpCircle, Briefcase } from "lucide-react";
// If the file exists with a different extension, update the import accordingly.
// For example, if the file is ForumCategoriesSkeleton.tsx:
import ForumCategoriesSkeleton from "./forumCategoriesSkeleton";
// Or, if the file is named differently or in another folder, update the path:
// import ForumCategoriesSkeleton from "../someOtherFolder/ForumCategoriesSkeleton";
import apiService from "../services/apiService";

// Map category names to icons
const categoryIcons: Record<string, React.ReactNode> = {
  "General Discussion": <MessageSquare className="h-5 w-5" />,
  "Introductions": <Users className="h-5 w-5" />,
  "Development": <Code className="h-5 w-5" />,
  "Ideas & Feedback": <Lightbulb className="h-5 w-5" />,
  "Help & Support": <HelpCircle className="h-5 w-5" />,
  "Jobs & Opportunities": <Briefcase className="h-5 w-5" />,
  // New categories
  "Bug Reports": <HelpCircle className="h-5 w-5 text-red-500" />,
  "Showcase": <Lightbulb className="h-5 w-5 text-yellow-500" />,
  "Help Needed": <HelpCircle className="h-5 w-5 text-blue-500" />,
};

export default function ForumCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        // Simulate API call - replace with your actual endpoint
        const response = await apiService.generalRequest("/api/categories");
        setCategories(response.data || []);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <ForumCategoriesSkeleton count={6} />;
  }

  if (error) {
    return (
      <div className="forum-categories-error">
        <p>Failed to load categories: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="forum-categories">
      {categories.map((category) => (
        <div key={category.id} className="forum-category">
          <div className="category-header">
            <div className="category-icon">
              <i className={category.icon || "fas fa-comments"}></i>
            </div>
            <div className="category-content">
              <h3 className="category-title">{category.name}</h3>
              <p className="category-description">{category.description}</p>
            </div>
          </div>
          <div className="category-stats">
            <div className="stat">
              <span className="stat-number">{category.topicCount || 0}</span>
              <span className="stat-label">Topics</span>
            </div>
            <div className="stat">
              <span className="stat-number">{category.postCount || 0}</span>
              <span className="stat-label">Posts</span>
            </div>
          </div>
          <div className="last-post">
            {category.lastPost ? (
              <>
                <img
                  src={category.lastPost.author.avatar}
                  alt={category.lastPost.author.name}
                  className="post-avatar"
                />
                <div className="post-info">
                  <div className="post-title">{category.lastPost.title}</div>
                  <div className="post-meta">
                    by {category.lastPost.author.name} • {category.lastPost.timeAgo}
                  </div>
                </div>
              </>
            ) : (
              <span className="no-posts">No posts yet</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
