import { ExternalLinkIcon } from "lucide-react";
import { Link } from "react-router-dom";
import useProfileStore from "../../../store/useProfileStore";

function ProfileSection() {
  const profile = useProfileStore((state) => state.profile);
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="size-25 overflow-hidden rounded-full border border-orange-400 xl:size-30 dark:border-black">
        <img
          src={profile?.avatar_url}
          className="h-full w-full object-cover"
          alt="Profile"
        />
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="text-xl font-semibold text-(--color-text-primary) xl:text-2xl">
          {profile?.name}
        </span>
        <span className="xl:text-md text-sm text-(--color-text-secondary)">
          {profile?.username}
        </span>
        <span className="text-md mt-2 text-(--color-text-secondary) xl:text-lg">
          {profile?.bio}
        </span>
      </div>

      <Link
        to={`/profile/${profile?.username}`}
        className="text-md flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white shadow-2xl transition-all duration-200 hover:scale-102 hover:bg-orange-400 xl:text-xl"
      >
        <span>View Profile</span>
        <ExternalLinkIcon className="h-4 w-4 xl:h-5 xl:w-5" />
      </Link>
    </div>
  );
}

export default ProfileSection;
