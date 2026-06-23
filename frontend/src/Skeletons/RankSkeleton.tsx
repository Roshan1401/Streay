export function RankSkeleton() {
  return (
    <div className="space-y-1">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="mx-2 my-3 animate-pulse rounded-xl border border-(--color-border) bg-(--color-bg-secondary) md:m-0 md:rounded-none md:border-0 md:border-t"
        >
          <div className="flex items-center gap-2 p-3 sm:px-3.5 sm:py-4 md:hidden">
            <div className="size-8 shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            <div className="size-8 shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            <div className="flex flex-1 items-center justify-between gap-2">
              <div className="h-3 w-28 rounded bg-zinc-300 dark:bg-zinc-700" />
              <div className="h-3 w-10 rounded bg-zinc-300 dark:bg-zinc-700" />
            </div>
          </div>

          <div className="hidden grid-cols-12 gap-4 px-8 py-6 md:grid lg:px-4 lg:py-8 xl:px-8">
            <div className="col-span-1 flex items-center">
              <div className="size-9 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            </div>
            <div className="col-span-4 flex items-center gap-3">
              <div className="size-11 shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              <div className="space-y-2">
                <div className="h-3 w-32 rounded bg-zinc-300 dark:bg-zinc-700" />
                <div className="h-2 w-20 rounded bg-zinc-200 dark:bg-zinc-800" />
              </div>
            </div>
            <div className="col-span-2 flex items-center justify-center">
              <div className="h-7 w-16 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
            </div>
            <div className="col-span-3 flex items-center justify-center">
              <div className="h-6 w-14 rounded-full bg-zinc-200 dark:bg-zinc-800" />
            </div>
            <div className="col-span-2 flex flex-col items-center justify-center gap-1.5">
              <div className="h-2.5 w-20 rounded bg-zinc-300 dark:bg-zinc-700" />
              <div className="h-2 w-14 rounded bg-zinc-200 dark:bg-zinc-800" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
