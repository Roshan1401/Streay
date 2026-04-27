import { SignOutIcon } from "../../../assets/Icons/index";
import { CircleAlert, CopyIcon } from "lucide-react";

interface ActionProps {
  handleLogout: () => void;
}

function ActionsSection(props: ActionProps) {
  const { handleLogout } = props;

  return (
    <div className="flex flex-col gap-3">
      <button className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-(--color-border-secondary) bg-(--color-bg-secondary) px-3 py-2 text-(--color-text-primary) transition-all hover:border-orange-500/50 hover:bg-orange-500/10 active:border-orange-500 active:bg-orange-500/20 active:text-orange-500">
        <CopyIcon className="h-4 w-4 xl:h-5 xl:w-5" />
        <span className="text-xs font-medium xl:text-sm">Copy API token</span>
      </button>

      <div className="rounded-md border border-(--color-border-secondary) bg-(--color-bg-secondary) p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2">
            <CircleAlert className="h-4 w-4 text-orange-500 xl:h-5 xl:w-5" />
            <div className="flex flex-col">
              <div className="text-sm font-medium text-(--color-text-primary)">
                Extension
              </div>
              <div className="text-xs text-(--color-text-secondary)">
                IDE integration
              </div>
            </div>
          </div>
          <span className="hidden text-xs font-semibold text-orange-500 xl:flex">
            Inactive
          </span>
        </div>
        <button className="mt-3 w-full cursor-pointer rounded-md border border-(--color-border) bg-(--color-bg-primary) px-3 py-2 text-xs font-medium text-(--color-text-primary) transition-colors hover:border-orange-500/50 active:border-orange-500 active:bg-orange-500/20 active:text-orange-500 xl:text-sm">
          Test connection
        </button>
      </div>

      <button
        className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-orange-500/30 bg-(--color-bg-primary) px-3 py-2 text-xs font-bold text-orange-500 transition-colors hover:border-orange-500/60 active:border-orange-500 active:bg-orange-500/20 active:text-orange-100 xl:text-sm"
        onClick={handleLogout}
      >
        <SignOutIcon className="h-4 w-4 xl:h-5 xl:w-5" />
        <span>Sign Out</span>
      </button>
    </div>
  );
}

export default ActionsSection;
