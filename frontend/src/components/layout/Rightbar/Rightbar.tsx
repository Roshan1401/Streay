import { useNavigate } from "react-router-dom";
import ProfileSection from "./ProfileSection";
import ActivitySection from "./ActivitySection";
import ActionsSection from "./ActionsSection";
import useUserStore from "../../../store/useUserStore";
import useProfileStore from "../../../store/useProfileStore";
import { ExternalLinkIcon } from "lucide-react";
import { useEffect } from "react";
import ProfileSectionSkeleton from "../../../Skeletons/ProfileSectionSkeleton";
import ActivitySectionSkeleton from "../../../Skeletons/ActivitySectionSkeleton";
import ActionsSectionSkeleton from "../../../Skeletons/ActionSectionSkeleton";

function Rightbar() {
  const { user, loading, logOut } = useUserStore();
  const {
    loading: profileLoading,
    setProfile,
    fetchProfile,
  } = useProfileStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      setProfile(null);
    }
  }, [user?.id, setProfile, fetchProfile]);

  return (
    <div className="flex min-h-screen flex-col gap-6 px-7 py-3 lg:w-55 xl:w-75">
      {!loading && !user ? (
        <div className="mt-15">
          <h2 className="xl:text-md text-center text-sm font-semibold text-(--color-text-secondary)">
            Please log in to view your profile and activity.
          </h2>
          <button
            className="text-md mt-5 flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg bg-orange-500 px-4 py-1 font-medium text-white shadow-2xl transition-all duration-200 hover:scale-102 hover:bg-orange-400 xl:text-lg"
            onClick={() => navigate("/login")}
          >
            <span>Log in </span>
            <ExternalLinkIcon className="h-4 w-4 xl:h-5 xl:w-5" />
          </button>
        </div>
      ) : profileLoading ? (
        <>
          <ProfileSectionSkeleton />
          <ActivitySectionSkeleton />
          <ActionsSectionSkeleton />
        </>
      ) : (
        <>
          <ProfileSection />
          <ActivitySection />
          <ActionsSection />
        </>
      )}
    </div>
  );
}

export default Rightbar;
