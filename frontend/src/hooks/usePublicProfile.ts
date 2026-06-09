import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { PublicProfile , PublicProfileStats } from "../types/types";



interface DailyStats {
  date: string;
  hours: number;
}

export function usePublicProfile(username: string) {
  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [stats, setStats] = useState<PublicProfileStats | null>(null);
  const [heatmapData, setHeatmapData] = useState<DailyStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;

    const fetchAll = async () => {
      setLoading(true);

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*, social_links (platform, url)")
        .eq("username", username)
        .single();

      if (!profileData) {
        setLoading(false);
        return;
      }

      const [stateResult, dailyStatsResult] = await Promise.all([
        supabase
          .from("profile_stats")
          .select(
            "total_seconds, current_streak, total_languages, language_breakdown",
          )
          .eq("user_id", profileData.id)
          .maybeSingle(),
        supabase
          .from("daily_stats")
          .select("date, total_seconds")
          .eq("user_id", profileData.id)
          .order("date", { ascending: true }),
      ]);

      const { social_links, ...profileFields } = profileData;

      setProfile({
        profile: {
          id: profileFields.id,
          name: profileFields.name,
          username: profileFields.username,
          bio: profileFields.bio,
          avatar_url: profileFields.avatar_url,
          country: profileFields.country,
          state: profileFields.state,
          city: profileFields.city,
        },
        socialLinks: social_links ?? [],
      });

      
      const dailyData = dailyStatsResult.data?.map((item) => ({
        date: item.date,
        hours: item.total_seconds / 3600,
      })) ?? [];
      
      
      const totalHours = stateResult.data?.total_seconds ? stateResult.data.total_seconds / 3600 : 0;
      const activeDays = dailyData.length;
      const avgHours = activeDays > 0 ? totalHours / activeDays : 0;

      setStats(stateResult.data ? {
        total_hours: totalHours,
        current_streak: stateResult.data.current_streak,
        total_languages: stateResult.data.total_languages,
        avg_hours: avgHours,
        language_breakdown: stateResult.data.language_breakdown,
      } : null);

      setHeatmapData(dailyData);
      setLoading(false);

    };

    fetchAll();
  }, [username]);

  return { profile, stats, heatmapData, loading };
}
