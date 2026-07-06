import { supabase } from "./lib/supabase";
import * as vscode from "vscode";
import { clearSessions, getSessions } from "./tracker";
import { saveCurrentSession } from "./tracker";

export async function startSendingSessions(context: vscode.ExtensionContext) {
  setInterval(
    async () => {
      vscode.window.showInformationMessage(
        "Sending coding sessions to Streaky...",
      );
      const token = await context.secrets.get("streaky_api_token");
      const user_id = await context.secrets.get("streaky_user_id");

      if (!token || !user_id) {
        vscode.window.showErrorMessage(
          "API token or user ID not found. Please connect your account.",
        );
        console.error("API token or user ID not found. Cannot send sessions.");
        return;
      }
      saveCurrentSession();
      const sessions = getSessions();
      if (sessions.length === 0) {
        vscode.window.showInformationMessage("No coding sessions to send.");
        console.log("No sessions to send.");
        return;
      }
      vscode.window.showInformationMessage(
        `Sessions: ${JSON.stringify(sessions)}`,
      );
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

        vscode.window.showInformationMessage(
          `Sessions sent to Streaky successfully. Data: ${JSON.stringify(data)}`,
        );

        if (error) {
          vscode.window.showErrorMessage(
            "Failed to send sessions: " + JSON.stringify(error),
          );
          console.error("Failed to send sessions:", error);
          return;
        }

        try {
          await supabase
            .from("profiles")
            .update({ last_active: new Date().toISOString() })
            .eq("id", user_id);
        } catch (error) {
          vscode.window.showErrorMessage(
            "Failed to update profile last active at : " + error,
          );
          console.error(
            "Failed to update profile last active profile at:",
            error,
          );
        }

        clearSessions();
      } catch (error) {
        vscode.window.showErrorMessage(
          "Failed to send sessions: " + JSON.stringify(error),
        );
        console.error("Failed to send sessions:", error);
      }
    },
    5 * 60 * 1000,
  ); // send every 5 minutes
}
