function ActionsSectionSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-center gap-2 rounded-md border border-(--color-border-secondary) bg-(--color-bg-secondary) px-3 py-2">
        <div className="skeleton h-4 w-4 rounded-full xl:h-5 xl:w-5" />

        <div className="skeleton h-4 w-28 rounded-md" />
      </div>

      <div className="rounded-md border border-(--color-border-secondary) bg-(--color-bg-secondary) p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2">
            <div className="skeleton h-4 w-4 rounded-full xl:h-5 xl:w-5" />

            <div className="flex flex-col gap-2">
              <div className="skeleton h-4 w-20 rounded-md" />

              <div className="skeleton h-3 w-24 rounded-md" />
            </div>
          </div>

          <div className="skeleton hidden h-3 w-14 rounded-md xl:flex" />
        </div>

        <div className="skeleton mt-3 h-9 w-full rounded-md" />
      </div>
    </div>
  );
}

export default ActionsSectionSkeleton;
