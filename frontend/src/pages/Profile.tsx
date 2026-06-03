import ProfileHeader from "../components/Profile/ProfileHeader";
import Status from "../components/Profile/Status";
import HeatMap from "../components/Profile/HeatMap/HeatMap";
import ProfileState from "../components/Profile/ProfileState/ProfileState";
import { useParams } from "react-router-dom";
import { usePublicProfile } from "../hooks/usePublicProfile";

function Profile() {
  const { username } = useParams();
  const { profile, loading } = usePublicProfile(username || "");

  if (loading) {
    return <div className="p-8 text-(--color-text-secondary)">Loading profile...</div>;
  }

  return (
    <div>
      <div>
        <ProfileHeader profileData={profile} />
      </div>
      <div className="mt-10">
        <Status />
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
