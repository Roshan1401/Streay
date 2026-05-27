import { supabase } from "../lib/supabase";
type range = "24h" | "7day" | "30day";

export const getStartRange = (range: range): string => {
  const ms = {
    "24h": 24 * 60 * 60 * 1000,
    "7day": 7 * 24 * 60 * 60 * 1000,
    "30day": 30 * 24 * 60 * 60 * 1000,
  };

  return new Date(Date.now() - ms[range]).toISOString();
};

export async function fetchLeaderboard(range: range) {
  const { data, error } = await supabase
    .from("sessions")
    .select(
      "user_id, duration_seconds, language, profiles(name, username, avatar_url)",
    )
    .gte("recorded_at", getStartRange(range));

  if (error || data.length === 0) {
    console.error("Error fetching leaderboard data: ", error);
    return [];
  }

  const userMap: Record<string, any> = {};

  data.forEach((session: any) => {
    const id = session.user_id;
    if (!userMap[id]) {
      userMap[id] = {
        user_id: id,
        name: session.profiles?.name,
        username: session.profiles?.username,
        avatar_url: session.profiles?.avatar_url,
        totalSeconds: 0,
        byLanguage: {},
      };
    }

    userMap[id].totalSeconds += session.duration_seconds;

    const language = session.language;

    userMap[id].byLanguage[language] =
      (userMap[id].byLanguage[language] || 0) + session.duration_seconds;
  });

  const ranked = Object.values(userMap)
    .sort((a, b) => b.totalSeconds - a.totalSeconds)
    .slice(0, 100)
    .map((user, i) => ({
      rank: i + 1,
      name: user.name,
      username: user.username,
      avatar_url: user.avatar_url,
      timeSpent: user.totalSeconds,
      byLanguage: Object.entries(user.byLanguage)
        .sort((a: any, b: any) => b[1] - a[1])
        .map(([lang, secs]: any) => ({
          language: lang,
          hours: (secs / 3600).toFixed(1),
        })),
    }));

  return ranked;
}
