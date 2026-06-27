import { useNavigate } from "react-router-dom";
import type { SearchResult } from "../../types/types";

interface Props {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  is_extension_active: boolean;
  addRecentSearch?: (user: SearchResult) => void;
  removeRecentSearch?: (id: string) => void;
}

function UserSearchCard({
  id,
  name,
  username,
  avatar,
  is_extension_active,
  addRecentSearch,
  removeRecentSearch,
}: Props) {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="flex cursor-pointer items-center justify-between gap-3 px-4 py-2 hover:bg-(--color-bg-secondary)"
        onMouseDown={(e) => {
          e.preventDefault();
          navigate(`/profile/${username}`);
          addRecentSearch?.({
            id,
            name,
            username,
            is_extension_active,
            avatar: avatar ?? "",
          });
        }}
      >
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative shrink-0">
            <img
              src={avatar}
              alt="userAvatar"
              className="size-11 rounded-full object-cover ring-2 ring-orange-400 ring-offset-2 ring-offset-white dark:ring-offset-neutral-900"
            />
            {!is_extension_active && (
              <span className="absolute right-0 bottom-0 size-2.5 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-neutral-900" />
            )}
          </div>
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="truncate text-sm font-semibold text-(--color-text-primary)">
              {name}
            </span>
            <span className="truncate text-xs font-medium text-(--color-text-secondary)">
              {username}
            </span>
          </div>
        </div>
        {removeRecentSearch && (
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              removeRecentSearch(id);
            }}
            className="cursor-pointer rounded-full px-2 py-1 text-sm font-semibold text-orange-400 hover:bg-orange-300/20"
          >
            ✕
          </button>
        )}
      </div>
    </>
  );
}

export default UserSearchCard;
