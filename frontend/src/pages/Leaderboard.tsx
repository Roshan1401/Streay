import LeaderboardRow from "../components/leaderboard/LeaderboardRow";
import { useEffect, useState } from "react";
import { fetchLeaderboard } from "../queries/fetchLeaderboard";
import LeaderboardSkeleton from "../Skeletons/LeaderboardSkeleton";
import type { Range, LeaderboardUser } from "../types/types";
import { fetchActivity } from "../queries/fetchActivity";
import useProfileStore from "../store/useProfileStore";
import UserRow from "../components/leaderboard/UserRow";
import useUserStore from "../store/useUserStore";

function Leaderboard() {
  const { profile: userProfile, loading: profileLoading } = useProfileStore();
  const userId = userProfile?.id;
  const { user, loading: userLoading } = useUserStore();
  const [activeRow, setActiveRow] = useState<Range>(() => {
    const saved = localStorage.getItem("leaderboardActiveRow") as Range;
    return saved || "24h";
  });
  const [userRank, setUserRank] = useState<number | null>(null);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const currentUser =
    leaderboardData.find((u) => u.username === userProfile?.username) ?? null;

  const otherUsers = leaderboardData.filter(
    (u) => u.username !== userProfile?.username,
  );

  useEffect(() => {
    if (userLoading) return;
    if (user && profileLoading) return;

    const fetchData = async () => {
      setLoading(true);
      const data = await fetchLeaderboard(activeRow);
      setLeaderboardData(data);
      setLoading(false);
    };

    fetchData();
    const interval = setInterval(fetchData, 300000);
    return () => clearInterval(interval);
  }, [activeRow, userLoading, profileLoading, user?.id]);

  useEffect(() => {
    if (userLoading) return;

    if (!user || !userId) {
      setUserRank(null);
      return;
    }

    if (profileLoading) return;

    const rankFromLeaderboard = currentUser?.rank ?? null;
    if (rankFromLeaderboard) {
      setUserRank(rankFromLeaderboard);
      return;
    }

    const fetchRank = async () => {
      const data = await fetchActivity(userId, activeRow);
      setUserRank(data?.rank ?? null);
    };

    fetchRank();
  }, [userId, activeRow, userLoading, profileLoading, currentUser?.rank]);

  useEffect(() => {
    localStorage.setItem("leaderboardActiveRow", activeRow);
  }, [activeRow]);

  return (
    <>
      <div className="px-5 py-5 xl:px-15">
        <div className="my-3 flex items-center justify-center">
          <LeaderboardRow activeRow={activeRow} setActiveRow={setActiveRow} />
        </div>
        {loading ? (
          <LeaderboardSkeleton />
        ) : (
          <div className="mt-8 mb-15 lg:mb-0">
            <div className="mt-5 overflow-hidden rounded-2xl border border-(--color-border) bg-white dark:bg-[#0b0809]">
              <div className="flex flex-col gap-4 border-b border-(--color-border) px-6 py-4 md:flex-row md:items-center md:justify-between">
                <div className="max-w-sm text-center text-2xl font-medium text-(--color-text-primary) md:text-left">
                  <span className="font-bold tracking-tight text-orange-500">
                    {leaderboardData[0]?.name || "Top Developer"}
                  </span>{" "}
                  is surpassing his limits right here, right now.
                  <div className="mt-1 flex flex-col gap-1 text-sm font-medium text-(--color-text-secondary) md:flex-row md:gap-4">
                    <span className="">showing top 100 developers.</span>
                    <span>your rank: #{userRank}</span>
                  </div>
                </div>

                <div className="mx-auto inline-flex items-center gap-2 rounded-md border border-(--color-border) bg-(--color-bg-secondary) px-4 py-2 md:mx-0 md:shrink-0">
                  <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-orange-500" />
                  <span className="text-sm font-medium whitespace-nowrap text-(--color-text-primary)">
                    Updates every 5 minutes
                  </span>
                </div>
              </div>
              <div className="">
                <div className="text-md sticky top-0 z-10 hidden grid-cols-12 gap-4 bg-(--color-bg-secondary) px-8 py-4 font-semibold tracking-wide text-(--color-text-secondary) md:grid lg:px-4 xl:px-8">
                  <div className="col-span-1">Rank</div>
                  <div className="col-span-4 text-left">Developer</div>
                  <div className="col-span-2 text-center">Time Spent</div>
                  <div className="col-span-2 text-center">Streak</div>
                  <div className="col-span-3 text-right">Top Languages</div>
                </div>
                <div className="relative space-y-1">
                  {currentUser && (
                    <UserRow
                      user={currentUser}
                      index={userRank ? userRank - 1 : 0}
                      isCurrentUser={true}
                      openDropdown={openDropdown}
                      setOpenDropdown={setOpenDropdown}
                    />
                  )}
                  {otherUsers.map((user: LeaderboardUser, index: number) => {
                    return (
                      <UserRow
                        user={user}
                        index={index}
                        key={user.username || index}
                        isCurrentUser={false}
                        openDropdown={openDropdown}
                        setOpenDropdown={setOpenDropdown}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Leaderboard;
