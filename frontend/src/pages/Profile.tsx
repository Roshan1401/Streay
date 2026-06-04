import ProfileHeader from "../components/Profile/ProfileHeader";
import Status from "../components/Profile/Status";
import HeatMap from "../components/Profile/HeatMap/HeatMap";
import ProfileState from "../components/Profile/ProfileState/ProfileState";
import { useParams } from "react-router-dom";
import { usePublicProfile } from "../hooks/usePublicProfile";
import ProfileHeaderSkeleton from "../Skeletons/ProfileHeaderSkeleton";
import StatusSkeleton from "../Skeletons/StatusSkeleton";

function Profile() {  
  const { username } = useParams();
  const { profile, loading } = usePublicProfile(username || "");

  

  return (
    <div>
      {loading ? (
        <ProfileHeaderSkeleton />
      ) : (
        <ProfileHeader profileData={profile} />
      )}
      <div className="mt-10">
        {loading ? (
          <StatusSkeleton />
        ) : (
          <Status />
        )}
      </div>
      <div>
        <HeatMap />
      </div>
      <div>
        <ProfileState />
      </div>
    </div>
  );
}

export default Profile;
