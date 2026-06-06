type range = "24h" | "7day" | "30day";
interface UserActivityStats {
  rank: number | null;
  streak: number;
  timeSpent: number;
}

interface PublicProfile {
  profile: {
    id: string;
    name: string;
    username: string;
    bio: string | null;
    avatar_url: string;
    country: string | null;
    state: string | null;
    city: string | null;
  } | null;
  socialLinks:
    | {
        platform: string;
        url: string;
      }[]
    | null;
}
interface PublicProfileStats {
  total_seconds: number;
  total_languages: number;
  current_streak: number;
  avg_hours : number;
  language_breakdown: Record<string, number>;
}

export type { range, UserActivityStats, PublicProfile , PublicProfileStats };
