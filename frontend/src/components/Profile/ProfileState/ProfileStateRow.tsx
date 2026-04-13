import { useState } from "react";

interface Props {}
type ProfileStateRowProps = "Lang Chart" | "Top Repo";

function ProfileStateRow(props: Props) {
  const {} = props;
  const states: ProfileStateRowProps[] = ["Lang Chart", "Top Repo"];
  const [activeState, setActiveState] =
    useState<ProfileStateRowProps>("Lang Chart");

  return (
    <div className="flex flex-row  gap-2 items-center rounded-2xl bg-neutral-900 justify-center p-1   border border-(--color-border)">
      {states.map((state) => {
        const isActive = activeState === state;
        return (
          <button
            key={state}
            type="button"
            onClick={() => setActiveState(state)}
            className={[
              "rounded-2xl flex-1 cursor-pointer px-6 py-2  text-lg tracking-tight font-bold transition-colors",
              isActive
                ? "text-(--color-text-primary) bg-(--color-bg-primary)  "
                : "text-(--color-text-secondary)",
            ].join(" ")}
          >
            {state}
          </button>
        );
      })}
    </div>
  );
}

export default ProfileStateRow;
