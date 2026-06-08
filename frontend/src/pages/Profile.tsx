import ProfileHeader from "../components/Profile/ProfileHeader";
import Status from "../components/Profile/Status";
import ProfileState from "../components/Profile/ProfileState/ProfileState";
import { useParams } from "react-router-dom";
import { usePublicProfile } from "../hooks/usePublicProfile";
import ProfileHeaderSkeleton from "../Skeletons/ProfileHeaderSkeleton";
import StatusSkeleton from "../Skeletons/StatusSkeleton";
import HeatMapCalender from "../components/Profile/HeatMap/HeatMapCalender";
import HeatMapCalenderSkeleton from "../Skeletons/HeatMapCalenderSkeleton";
import ProfileStateSkeleton from "../Skeletons/ProfileStateSkeleton";

function Profile() {
  const { username } = useParams();
  const { profile, loading, stats, heatmapData } = usePublicProfile(
    username || "",
  );

  return (
    <div>
      {loading ? (
        <ProfileHeaderSkeleton />
      ) : (
        <ProfileHeader profileData={profile} />
      )}
      <div className="mt-10">
        {loading ? <StatusSkeleton /> : <Status stats={stats} />}
      </div>
      <div>
        {loading ? (
          <HeatMapCalenderSkeleton />
        ) : (
          <HeatMapCalender heatmapData={heatmapData} />
        )}
      </div>
      <div>
        {loading ? (
          <ProfileStateSkeleton />
        ) : (
          <ProfileState
            languageStats={stats?.language_breakdown ?? {}}
            totalHours={stats?.total_hours ?? 0}
          />
        )}
      </div>
    </div>
  );
}

export default Profile;
