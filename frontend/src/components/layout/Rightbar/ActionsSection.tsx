import { SignOutIcon } from "../../../assets/Icons/index";
import { CircleAlert, CopyIcon, ShieldCheck } from "lucide-react";
import useTokenStore from "../../../store/useTokenStore";
import { createApiToken } from "../../../api/token";
import useUserStore from "../../../store/useUserStore";
import { useExtensionStatus } from "../../../hooks/useExtenstionStatus";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface ActionProps {
  handleLogout: () => void;
}

function ActionsSection(props: ActionProps) {
  const { handleLogout } = props;
  const user = useUserStore((state) => state.user);
  let { isActive, fetchStatus } = useExtensionStatus(user?.id || "");
  const token = useTokenStore((state) => state.token);
  const setToken = useTokenStore((state) => state.setToken);

  const [loadingConnection, setLoadingConnection] = useState(false);
  const handleCopyToken = async () => {
    try {
      if (!user) return;
      let tokenToCopy = token;

      if (!tokenToCopy) {
        tokenToCopy = await createApiToken(user?.id);
        if (tokenToCopy) {
          setToken(tokenToCopy);
        }
      }

      if (tokenToCopy) {
        await navigator.clipboard.writeText(tokenToCopy);
        toast.success("API token copied!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    } catch (error) {
      console.error("Failed to copy token: ", error);
      toast.error("Failed to copy token. Please try again.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <button
        className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-(--color-border-secondary) bg-(--color-bg-secondary) px-3 py-2 text-(--color-text-primary) transition-all hover:border-orange-500/50 hover:bg-orange-500/10 active:border-orange-500 active:bg-orange-500/20 active:text-orange-500"
        onClick={handleCopyToken}
      >
        <CopyIcon className="h-4 w-4 xl:h-5 xl:w-5" />
        <span className="text-xs font-medium xl:text-sm">Copy API token</span>
      </button>
      <ToastContainer />

      <div className="rounded-md border border-(--color-border-secondary) bg-(--color-bg-secondary) p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2">
            {isActive ? (
              <ShieldCheck className="mt-1 h-4 w-4 text-green-400 xl:h-5 xl:w-5" />
            ) : (
              <CircleAlert className="h-4 w-4 text-orange-500 xl:h-5 xl:w-5" />
            )}
            <div className="flex flex-col">
              <div className="text-sm font-medium text-(--color-text-primary)">
                Extension
              </div>
              <div className="text-xs text-(--color-text-secondary)">
                IDE integration
              </div>
            </div>
          </div>
          <span
            className={`hidden rounded-md px-2 py-1 text-xs font-semibold xl:flex ${isActive ? "bg-green-900/30 text-green-400" : "bg-orange-900/30 text-orange-500"}`}
          >
            {isActive ? "Active" : "Inactive"}
          </span>
        </div>
        <button
          className="mt-3 w-full cursor-pointer rounded-md border border-(--color-border) bg-(--color-bg-primary) px-3 py-2 text-xs font-medium text-(--color-text-primary) transition-colors hover:border-orange-500/50 active:border-orange-500 active:bg-orange-500/20 active:text-orange-500 xl:text-sm"
          onClick={async () => {
            setLoadingConnection(true);
            // Simulate a delay for the connection test
            await new Promise((resolve) => setTimeout(resolve, 1000));
            fetchStatus();
            setLoadingConnection(false);
          }}
        >
          {loadingConnection ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin text-orange-500" />
            </span>
          ) : (
            "Test Connection"
          )}
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
