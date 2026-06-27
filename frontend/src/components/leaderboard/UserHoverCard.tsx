import { ChartIcon, ClockIcon, FlameIcon } from "../../assets/Icons";
import { usePublicProfile } from "../../hooks/usePublicProfile";
interface Props {
  rank: number;
  username: string;
}

function UserHoverCard(props: Props) {
  const { rank, username } = props;

  const { profile, stats } = usePublicProfile(username);
  const userProfile = profile?.profile;

  return (
    <div className="w-[300px] overflow-hidden rounded-2xl border border-(--color-border) bg-(--color-bg-primary) px-2 py-3 shadow-2xl">
      {/* Banner */}
      <div className="relative">
        <div className="absolute top-3 right-3 rounded-lg bg-orange-500 px-3 py-1 text-sm font-bold text-white">
          #{rank}
        </div>

        <div className="h-20 w-20 overflow-hidden rounded-full border-4 border-(--color-bg-primary)">
          <img
            src={userProfile?.avatar_url}
            className="h-full w-full object-cover"
            alt=""
          />
        </div>
      </div>

      {/* Content */}
      <div className="mt-4 px-2">
        <h2 className="text-xl font-bold text-(--color-text-primary)">
          {userProfile?.name}
        </h2>

        <p className="text-sm text-orange-500">@{userProfile?.username}</p>

        <p className="mt-2 text-sm text-(--color-text-secondary)">
          {userProfile?.bio}
        </p>

        <div className="mt-5 grid grid-cols-3 gap-3">
          <div className="rounded-xl text-center">
            <FlameIcon className="mx-auto h-5 w-5 text-orange-500" />

            <div className="flex flex-col gap-1">
              <p className="mt-2 text-lg font-bold">{stats?.current_streak}</p>

              <span className="text-xs text-(--color-text-secondary)">
                Streak
              </span>
            </div>
          </div>

          <div className="rounded-xl text-center">
            <ClockIcon className="mx-auto h-5 w-5 text-blue-500" />

            <div className="flex flex-col gap-1">
              <p className="mt-2 text-lg font-bold">{stats?.total_hours}</p>

              <span className="text-xs text-(--color-text-secondary)">
                Hours
              </span>
            </div>
          </div>

          <div className="rounded-xl text-center">
            <ChartIcon className="mx-auto h-5 w-5 text-green-500" />
            <div className="flex flex-col gap-1">
              <p className="mt-2 text-lg font-bold">{stats?.avg_hours}</p>

              <span className="text-xs text-(--color-text-secondary)">Avg</span>
            </div>
          </div>
        </div>

        <button
          className="text-md mt-5 w-full cursor-pointer rounded-lg bg-orange-500 py-2 font-semibold text-white transition hover:bg-orange-600"
          onClick={() => (window.location.href = `/profile/${username}`)}
        >
          View Profile
        </button>
      </div>
    </div>
  );
}

export default UserHoverCard;
