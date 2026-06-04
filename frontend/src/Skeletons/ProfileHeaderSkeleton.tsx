// ProfileHeaderSkeleton.tsx
function ProfileHeaderSkeleton() {
    return (
      <div>
        {/* Banner skeleton */}
        <div className="relative">
          <div className="h-40 skeleton border-b border-(--color-border) md:h-50 xl:h-70" />
          
          {/* Avatar skeleton */}
          <div className="lg:-bottom-15.7 absolute -bottom-12 left-4 size-26 skeleton border-2 border-(--color-border) md:-bottom-18 md:left-6 md:size-36 xl:-bottom-25 xl:left-1/8 xl:size-50 xl:-translate-x-1/2 2xl:left-30" />
        </div>
  
        {/* Content skeleton */}
        <div className="relative pt-15 md:pt-22 xl:pt-32">
          <div className="flex flex-col gap-3 px-4 xl:px-10">
            
            {/* Name */}
            <div className="h-7 w-48 skeleton md:h-9 md:w-64 xl:h-11 xl:w-80" />
            
            {/* Username */}
            <div className="h-5 w-32 skeleton md:h-6 md:w-40" />
            
            {/* Bio */}
            <div className="h-5 w-72 skeleton md:h-6 md:w-96" />
  
            {/* Social links skeleton */}
            <div className="mt-7 flex flex-col items-center gap-5 md:flex-row">
              <div className="grid grid-cols-3 gap-2 md:flex">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-9 w-24 skeleton"
                  />
                ))}
              </div>
              {/* Add link button skeleton */}
              <div className="h-9 w-full skeleton md:h-9 md:w-9 md:rounded-full" />
            </div>  
          </div>
  
          {/* Edit button skeleton */}
          <div className="absolute top-10 right-3 p-4 md:top-17 lg:top-18 lg:right-5 xl:top-28">
            <div className="h-9 w-9 skeleton md:h-9 md:w-20 md:rounded-lg" />
          </div>
        </div>
      </div>
    )
  }
  
  export default ProfileHeaderSkeleton