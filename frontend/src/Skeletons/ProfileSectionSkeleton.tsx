function ProfileSectionSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="size-25 skeleton rounded-full xl:size-30" />

      <div className="flex w-full flex-col items-center gap-2">
        <div className="h-6 w-32 skeleton rounded-md xl:h-7 xl:w-40" />

        <div className="h-4 w-20 skeleton rounded-md" />
      </div>

      <div className="h-11 w-full skeleton rounded-lg xl:h-12" />
    </div>
  );
}

export default ProfileSectionSkeleton;
