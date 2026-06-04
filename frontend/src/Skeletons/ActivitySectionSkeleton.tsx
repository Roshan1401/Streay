function ActivitySectionSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="mx-auto h-3 w-32 skeleton rounded-md" />

      <div className="grid grid-cols-1 gap-3 text-center xl:grid-cols-2">
        <div className="h-22.5 w-40 skeleton rounded-md xl:h-27.5 xl:w-27.5" />
        <div className="h-22.5 w-40 skeleton rounded-md xl:h-27.5 xl:w-27.5" />
        <div className="h-22.5 w-40 skeleton rounded-md xl:h-27.5 xl:w-27.5" />
        <div className="h-22.5 w-40 skeleton rounded-md xl:h-27.5 xl:w-27.5" />
      </div>
    </div>
  );
}

export default ActivitySectionSkeleton;
