export function ProductSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Image skeleton */}
      <div className="relative aspect-square bg-gray-200 rounded-lg mb-8" />
      
      {/* Title and price skeleton */}
      <div className="space-y-4 mb-8">
        <div className="h-8 bg-gray-200 rounded w-3/4" />
        <div className="h-6 bg-gray-200 rounded w-1/4" />
      </div>
      
      {/* Description skeleton */}
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-4/6" />
      </div>

      {/* Button skeleton */}
      <div className="h-12 bg-gray-200 rounded w-full mt-8" />
    </div>
  )
} 