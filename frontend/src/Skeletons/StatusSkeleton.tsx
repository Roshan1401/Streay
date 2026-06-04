function StatusSkeleton() {
    return (
      <div className="grid grid-cols-1 gap-5 px-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-4 xl:gap-5 xl:px-10">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex h-25 w-full justify-between rounded-xl skeleton border border-(--color-border-secondary)  p-4 xl:px-6 xl:py-5 dark:bg-[#1b1718]/50"
          />
        ))}
      </div>
    );
  }
  
  export default StatusSkeleton;