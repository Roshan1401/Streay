import ProfileHeader from "../components/Profile/ProfileHeader";
import Status from "../components/Profile/Status";
import HeatMap from "../components/Profile/HeatMap/HeatMap";
import ProfileState from "../components/Profile/ProfileState";

interface Props {}

function Profile(props: Props) {
  const {} = props;

  return (
    <div>
      <div>
        <ProfileHeader />
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
