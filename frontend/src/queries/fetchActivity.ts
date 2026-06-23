import { supabase } from "../lib/supabase";
import { getStartRange } from "./getStartRange";
import type { UserActivityStats, Range } from "../types/types";

export async function fetchActivity(
  userId: string,
  range: Range,
): Promise<UserActivityStats | null> {
  try {
    const { data: allSessions, error: allSessionError } = await supabase
      .from("sessions")
      .select("user_id, duration_seconds")
      .gte("recorded_at", getStartRange(range));

    if (allSessionError) throw allSessionError;

    if (!allSessions) return { rank: null, streak: 0, timeSpent: 0 };

    const userMap: Record<string, number> = {};

    allSessions.forEach((session) => {
      userMap[session.user_id] =
        (userMap[session.user_id] || 0) + session.duration_seconds;
    });

    const ranked = Object.entries(userMap).sort((a, b) => b[1] - a[1]) as [
      string,
      number,
    ][];

    const rankedIndex = ranked.findIndex(([id]) => id === userId);
    const rank = rankedIndex !== -1 ? rankedIndex + 1 : null;
    const timeSpent = userMap[userId] || 0;

    if (timeSpent === 0) {
      return {
        rank: null,
        streak: 0,
        timeSpent: 0,
      };
    }

    const { data: streakData, error: streakError } = await supabase
      .from("profile_stats")
      .select("current_streak")
      .eq("user_id", userId)
      .single();

    if (streakError) throw streakError;
    return {
      rank,
      streak: streakData ? streakData.current_streak : 0,
      timeSpent,
    };
  } catch (error) {
    console.error("Error fetching activity data: ", error);
    return null;
  }
}
