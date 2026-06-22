import { supabase } from "../lib/supabase";
import type { Range } from "../types/types";
import { getStartRange } from "./getStartRange";

export async function fetchLeaderboard(range: Range) {
  const { data, error } = await supabase
    .from("sessions")
    .select(
      "user_id, duration_seconds, language, profiles(name, username, avatar_url, social_links(platform,url))",
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
        github_url:
          session.profiles?.social_links
            ?.find((link: any) => link.platform === "github")
            ?.url.replace(/\/$/, "")
            .split("/")
            .pop() || "",
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
      github_url: user.github_url,
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
