type Range = "24h" | "7day" | "30day";
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
    banner_url: string;
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
  total_hours: number;
  total_languages: number;
  current_streak: number;
  avg_hours: number;
  language_breakdown: Record<string, number>;
}

interface ChartProps {
  languages: { language: string; hours: number }[];
  getColor: (index: number) => string;
}

interface SearchResult {
  id: string;
  name: string;
  username: string;
  avatar: string;
  is_extension_active: boolean;
}
interface ProfileRPC {
  id: string;
  name: string;
  username: string;
  avatar_url: string;
  is_extension_active: boolean;
}

type Tab = "Lang Chart" | "Badges";

interface SelectOption {
  label: string;
  value: string;
}

type FieldKey = "country" | "state" | "city";
type Mode = "global" | "region";
type Period = "24h" | "7d" | "30d" | "allTime";

interface RankUser {
  id: string;
  rank: number;
  name: string;
  username: string;
  avatar_url: string;
  hours: number;
  streak_days: number;
  country: string;
  state: string;
  city: string;
}

interface LeaderboardUser {
  rank: number;
  id: string;
  name: string | null;
  username: string | null;
  avatar_url: string;
  is_extension_active: boolean;
  github_url: string;
  timeSpent: number;
  streak: number;
  byLanguage: {
    language: string;
    hours: string;
  }[];
}

interface UserRank {
  rank: number;
  total_developers: number;
  top_percent: number;
  user_hours: number;
}

export type {
  Range,
  UserActivityStats,
  PublicProfile,
  PublicProfileStats,
  ChartProps,
  SearchResult,
  ProfileRPC,
  Tab,
  SelectOption,
  FieldKey,
  Mode,
  Period,
  RankUser,
  LeaderboardUser,
  UserRank,
};
