export default function ProfileHeaderSkeleton() {
    return(
        <div>
        <div className="relative">
          <div className="skeleton h-40 border-b border-(--color-border) md:h-50 xl:h-70" />
  
          <div className="lg:-bottom-15.7 skeleton absolute -bottom-12 left-4 size-26 rounded-full  md:-bottom-18 md:left-6 md:size-36 xl:-bottom-25 xl:left-1/8 xl:size-50 xl:-translate-x-1/2 2xl:left-30" />
        </div>
  
        <div className="relative pt-15 md:pt-22 xl:pt-32">
          <div className="flex flex-col gap-2 px-4 xl:px-10">
            <div className="skeleton h-8 w-40 rounded-md md:h-10 md:w-56" />
  
            <div className="skeleton h-5 w-28 rounded-md md:w-36" />
  
            <div className="mt-2 flex flex-col gap-2">
              <div className="skeleton h-5 w-full max-w-md rounded-md" />
              <div className="skeleton h-5 w-3/4 max-w-sm rounded-md" />
            </div>
  
            <div className="mt-7 flex flex-col items-center gap-5 md:flex-row">
              <div className="grid grid-cols-3 gap-2 md:flex">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="skeleton h-10 w-28 rounded-lg"
                  />
                ))}
              </div>
  
              <div className="skeleton h-11 w-full rounded-lg md:w-32 md:rounded-full" />
            </div>
          </div>
  
          <div className="absolute top-10 right-3 p-4 md:top-17 lg:top-18 lg:right-5 xl:top-28">
            <div className="skeleton h-10 w-10 rounded-xl md:h-11 md:w-28" />
          </div>
        </div>
      </div>
    )
}