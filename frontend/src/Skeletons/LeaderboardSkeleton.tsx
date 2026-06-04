function LeaderboardSkeleton() {
  return (
    <div className="mt-8">
      <div className="mt-5 overflow-hidden rounded-2xl border border-(--color-border) bg-white dark:bg-[#0b0809]">
        {/* Update Badge */}
        <div className="flex justify-center border-b border-(--color-border) px-6 py-4 md:justify-end">
          <div className="inline-flex items-center gap-2 rounded-xl border border-(--color-border) bg-(--color-bg-secondary) px-4 py-2">
            <div className="h-3 w-3 skeleton rounded-full " />
            <div className="h-4 w-36  rounded skeleton" />
          </div>
        </div>

        {/* Desktop Header */}
        <div className="text-md sticky top-0 z-10 hidden grid-cols-12 gap-4 bg-(--color-bg-secondary) px-8 py-4 md:grid lg:px-4 xl:px-8">
          <div className="col-span-1 h-4 w-10 rounded skeleton" />
          <div className="col-span-5 h-4 w-24 rounded skeleton" />
          <div className="col-span-2 mx-auto h-4 w-24 rounded skeleton" />
          <div className="col-span-4 ml-auto h-4 w-28 rounded skeleton" />
        </div>

        {/* Rows */}
        <div className="space-y-1">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="mx-2 my-3 rounded-xl border border-(--color-border) bg-(--color-bg-secondary) md:m-0 md:rounded-none md:border-0 md:border-t"
            >
              <div className="flex items-center gap-2 p-3 sm:px-3.5 sm:py-4 md:grid md:grid-cols-12 md:gap-4 md:px-8 md:py-6 lg:px-4 lg:py-8 xl:px-8">
                {/* Rank */}
                <div className="col-span-1 flex">
                  <div className="h-8 w-8 skeleton rounded-full  md:h-9 md:w-9 " />
                </div>

                {/* Developer */}
                <div className="col-span-5 flex items-center gap-3">
                  <div className="h-8 w-8 skeleton rounded-full md:h-11 md:w-11" />
                  <div className="flex flex-col gap-2">
                    <div className="mx-2 h-4 w-15 skeleton rounded sm:w-20 md:mx-0 md:w-24" />
                    <div className="hidden h-3 w-20 skeleton rounded md:block" />
                  </div>
                </div>

                {/* Time Spent */}
                <div className="col-span-2 flex justify-center">
                  <div className="h-4 w-10 skeleton rounded md:w-16" />
                </div>

                {/* Mobile Arrow */}
                <div className="h-5 w-5 skeleton rounded md:hidden" />

                {/* Languages — col-span-4, grid ke andar */}
                <div className="col-span-4 hidden justify-end gap-2 md:flex">
                  <div className="h-7 w-14 skeleton rounded-md" />
                  <div className="h-7 w-16 skeleton rounded-md" />
                  <div className="h-7 w-12 skeleton rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LeaderboardSkeleton;
