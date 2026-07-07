import * as vscode from "vscode";
import * as dotenv from "dotenv";

dotenv.config();

import { supabase } from "./lib/supabase";
import { startTracking } from "./tracker";
import { startSendingSessions } from "./sender";
import { configPanel } from "./configPanel";

let globalUserId: string | undefined = undefined;

export async function activate(context: vscode.ExtensionContext) {
  const token = await context.secrets.get("streaky_api_token");
  const user_id = await context.secrets.get("streaky_user_id");

  if (token && user_id) {
    globalUserId = user_id;

    await supabase
      .from("profiles")
      .update({ is_extension_active: true })
      .eq("id", user_id);

    startTracking(context);
    startSendingSessions(context);
  }

  const connectAccount = vscode.commands.registerCommand(
    "streaky.configureApiKey",
    async () => {
      const panel = vscode.window.createWebviewPanel(
        "streakyConfigureApiKey",
        "Connect to Streaky",
        vscode.ViewColumn.One,
        {
          enableScripts: true,
        },
      );

      panel.webview.html = configPanel(panel.webview, context);

      panel.webview.onDidReceiveMessage(
        async (message) => {
          if (message.command === "openDashboard") {
            await vscode.env.openExternal(
              vscode.Uri.parse("http://localhost:5173/leaderboard"),
            );

            return;
          }

          if (message.command !== "connect") return;

          const token = message.token?.trim();

          if (!token) {
            return;
          }

          try {
            panel.webview.postMessage({
              command: "loading",
            });

            const { data, error } = await supabase
              .from("api_tokens")
              .select("*")
              .eq("token", token)
              .eq("revoked", false)
              .single();

            if (error || !data) {
              panel.webview.postMessage({
                command: "error",
                message: "Invalid API token. Please try again.",
              });

              return;
            }

            await context.secrets.store("streaky_api_token", token);
            await context.secrets.store("streaky_user_id", data.user_id);

            globalUserId = data.user_id;

            const { error: updateError } = await supabase
              .from("profiles")
              .update({
                is_extension_active: true,
              })
              .eq("id", data.user_id);

            if (updateError) {
              console.error("Failed to update profile:", updateError);
            }

            startTracking(context);
            startSendingSessions(context);

            panel.webview.postMessage({
              command: "success",
            });
          } catch (error: unknown) {
            panel.webview.postMessage({
              command: "error",
              message: "Failed to connect to Streaky.",
            });

            console.error(error);
          }
        },
        undefined,
        context.subscriptions,
      );
    },
  );

  const disconnectAccount = vscode.commands.registerCommand(
    "streaky.clearApiKey",
    async () => {
      await context.secrets.delete("streaky_api_token");
      await context.secrets.delete("streaky_user_id");

      if (globalUserId) {
        await supabase
          .from("profiles")
          .update({ is_extension_active: false })
          .eq("id", globalUserId);

        globalUserId = undefined;
      }
      vscode.window.showInformationMessage("API token cleared successfully.");
    },
  );

  const checkToken = vscode.commands.registerCommand(
    "streaky.checkToken",
    async () => {
      const token = await context.secrets.get("streaky_api_token");
      const user_id = await context.secrets.get("streaky_user_id");

      console.log("Token:", token);
      console.log("User ID:", user_id);

      vscode.window.showInformationMessage(
        `Token: ${token ? "✅ Found" : "❌ Not found"} | User ID: ${user_id ? "✅ Found" : "❌ Not found"}`,
      );
    },
  );

  context.subscriptions.push(connectAccount, disconnectAccount, checkToken);
}

export async function deactivate() {
  if (!globalUserId) return;

  await supabase
    .from("profiles")
    .update({ is_extension_active: false })
    .eq("id", globalUserId);
}
