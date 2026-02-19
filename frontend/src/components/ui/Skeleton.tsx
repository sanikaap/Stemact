interface SkeletonProps {
  className?: string;
  lines?: number;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}
    />
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4">
          <Skeleton className="h-4 w-4/12" />
          <Skeleton className="h-4 w-2/12" />
          <Skeleton className="h-4 w-2/12" />
          <Skeleton className="h-4 w-1/12" />
          <Skeleton className="h-4 w-1/12" />
          <Skeleton className="h-4 w-1/12" />
        </div>
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="card p-5 space-y-3 animate-pulse">
      <Skeleton className="h-3 w-1/3" />
      <Skeleton className="h-7 w-1/2" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  );
}
