import React from "react";

interface ForumCategoriesSkeletonProps {
  count?: number;
}

const ForumCategoriesSkeleton: React.FC<ForumCategoriesSkeletonProps> = ({ count = 6 }) => (
  <div className="forum-categories-skeleton">
    {Array.from({ length: count }).map((_, idx) => (
      <div key={idx} className="forum-category-skeleton">
        <div className="skeleton-header">
          <div className="skeleton-icon" />
          <div className="skeleton-title" />
        </div>
        <div className="skeleton-description" />
        <div className="skeleton-stats" />
        <div className="skeleton-last-post" />
      </div>
    ))}
  </div>
);

export default ForumCategoriesSkeleton;