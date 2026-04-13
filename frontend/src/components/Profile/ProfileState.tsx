import React from "react";
import { DiVim } from "react-icons/di";
import ProfileStateRow from "./ProfileState/ProfileStateRow";

interface Props {}

function ProfileState(props: Props) {
  const {} = props;

  return (
    <div>
      <div className="px-10 my-4">
        <ProfileStateRow />
      </div>
    </div>
  );
}

export default ProfileState;
