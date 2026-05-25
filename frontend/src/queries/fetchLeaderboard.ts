import { supabase } from "../lib/supabase";
type range = "24h" | "7d" | "30d";

const getStartRange = (range: range): string => {
  const ms = {
    "24h": 24 * 60 * 60 * 1000,
    "7d": 7 * 24 * 60 * 60 * 1000,
    "30d": 30 * 24 * 60 * 60 * 1000,
  };

  return new Date(Date.now() - ms[range]).toISOString();
};

export async function fetchLeaderboard(range: range) {
  const { data, error } = await supabase
    .from("sessions")
    .select("user_id, duration, language, profiles(name, username, avatar_url)")
    .gte("recorded_at", getStartRange(range));

  if (error || !data) {
    console.error("Error fetching leaderboard data: ", error);
    return null;
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

    userMap[id].totalSeconds += session.duration;

    const language = session.language;

    userMap[id].byLanguage[language] =
      (userMap[id].byLanguage[language] || 0) + session.duration;
  });

  const ranked = Object.values(userMap)
    .sort((a, b) => b.totalSeconds - a.totalSeconds)
    .slice(0, 100)
    .map((user, i) => ({
      rank: i + 1,
      name: user.name,
      username: user.username,
      avatar_url: user.avatar_url,
      totalSeconds: user.totalSeconds,
      byLanguage: Object.entries(user.byLanguage)
        .sort((a: any, b: any) => b[1] - a[1])
        .map(([lang, secs]: any) => ({
          language: lang,
          hours: (secs / 3600).toFixed(1),
        })),
    }));

  return ranked;
}
