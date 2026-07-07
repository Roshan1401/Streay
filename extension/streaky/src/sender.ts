import { supabase } from "./lib/supabase";
import * as vscode from "vscode";
import { clearSessions, getSessions } from "./tracker";
import { saveCurrentSession } from "./tracker";

export async function startSendingSessions(context: vscode.ExtensionContext) {
  setInterval(
    async () => {
      const token = await context.secrets.get("streaky_api_token");
      const user_id = await context.secrets.get("streaky_user_id");

      if (!token || !user_id) {
        return;
      }
      saveCurrentSession();
      const sessions = getSessions();
      if (sessions.length === 0) {
        return;
      }

      try {
        const { data, error } = await supabase.from("sessions").insert(
          sessions.map((session) => ({
            user_id: user_id,
            language: session.language,
            duration_seconds: session.duration,
            session_date: session.session_date,
            recorded_at: session.recorded_at,
          })),
        );

        if (error) {
          return;
        }

        try {
          await supabase
            .from("profiles")
            .update({ last_active: new Date().toISOString() })
            .eq("id", user_id);
        } catch (error) {
          console.error(
            "Failed to update profile last active profile at:",
            error,
          );
        }

        clearSessions();
      } catch (error) {
        console.error("Failed to send sessions:", error);
      }
    },
    5 * 60 * 1000,
  ); // send every 5 minutes
}
