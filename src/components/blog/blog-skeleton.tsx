export function BlogSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Image skeleton */}
      <div className="relative aspect-video mb-8 bg-gray-200 rounded-lg" />
      
      {/* Title skeleton */}
      <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
      
      {/* Date skeleton */}
      <div className="h-4 bg-gray-200 rounded w-32 mb-8" />
      
      {/* Content skeleton */}
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-4/6" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-3/6" />
      </div>
    </div>
  )
} 