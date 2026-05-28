import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export function useExtensionStatus(userId: string) {
  const [isActive, setIsActive] = useState(false);

  const fetchStatus = async () => {
    supabase
      .from("profiles")
      .select("is_extension_active")
      .eq("id", userId)
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.error("Error fetching extension status:", error);
          setIsActive(false);
          return;
        }
        setIsActive(data?.is_extension_active);
      });
  };
  useEffect(() => {
    if (!userId) return;

    fetchStatus();
    const channel = supabase
      .channel("extension_status")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "profiles",
          filter: `id=eq.${userId}`,
        },
        (payload) => {
          setIsActive(payload.new.is_extension_active);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);
  return { isActive, fetchStatus };
}
supabase;
