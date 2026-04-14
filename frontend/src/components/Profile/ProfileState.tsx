import React from "react";
import { DiVim } from "react-icons/di";
import ProfileStateRow from "./ProfileState/ProfileStateRow";
import LangChart from "./ProfileState/LangChart";

interface Props {}

function ProfileState(props: Props) {
  const {} = props;

  return (
    <div className="px-10">
      <div className=" my-8">
        <ProfileStateRow />
      </div>
      <div>{/* <LangChart /> */}</div>
    </div>
  );
}

export default ProfileState;
