import ProfileHeader from "../components/Profile/ProfileHeader";
import Status from "../components/Profile/Status";
import HeatMap from "../components/Profile/HeatMap/HeatMap";

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
    </div>
  );
}

export default Profile;
