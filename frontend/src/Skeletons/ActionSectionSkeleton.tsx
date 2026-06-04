function ActionsSectionSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {/* Copy API Token Button */}
      <div className="flex items-center justify-center gap-2 rounded-md border border-(--color-border-secondary) bg-(--color-bg-secondary) px-3 py-2">
        <div className="h-4 w-4 skeleton rounded-full xl:h-5 xl:w-5" />

        <div className="h-4 w-28 skeleton rounded-md" />
      </div>

      {/* Extension Card */}
      <div className="rounded-md border border-(--color-border-secondary) bg-(--color-bg-secondary) p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2">
            <div className="h-4 w-4 skeleton rounded-full xl:h-5 xl:w-5" />

            <div className="flex flex-col gap-2">
              <div className="h-4 w-20 skeleton rounded-md" />

              <div className="h-3 w-24 skeleton rounded-md" />
            </div>
          </div>

          <div className="hidden h-3 w-14 skeleton rounded-md xl:flex" />
        </div>

        {/* Test Connection Button */}
        <div className="mt-3 h-9 w-full skeleton rounded-md" />
      </div>

      {/* Sign Out Button */}
      <div className="h-9 w-full skeleton rounded-md" />
    </div>
  );
}

export default ActionsSectionSkeleton;
