function ProfileStateSkeleton() {
  return (
    <div className="px-4 xl:px-10">
      <div className="my-8">
        <div className="flex gap-2 rounded-full bg-neutral-900 p-1.5">
          <div className="skeleton h-10 w-full rounded-full"></div>
          <div className="skeleton h-10 w-full rounded-full"></div>
        </div>
      </div>

      <div className="${ isTransitioning my-10 mb-28 flex h-auto w-full items-center justify-center transition-all duration-200 ease-out lg:mb-10">
        <div className="skeleton h-110 w-full rounded-xl"></div>
      </div>
    </div>
  );
}

export default ProfileStateSkeleton;
