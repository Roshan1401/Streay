import * as vscode from "vscode";
import { supabase } from "./lib/supabase";
import { startTracking } from "./tracker";
import { startSendingSessions } from "./sender";

let globalUserId: string | undefined = undefined;

export async function activate(context: vscode.ExtensionContext) {
  const token = await context.secrets.get("devsteak_api_token");
  const user_id = await context.secrets.get("devsteak_user_id");

  vscode.window.showInformationMessage(
    `DevSteak extension activated. API token ${token ? "found" : "not found"}. User ID ${user_id ? "found" : "not found"}.`,
  );

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
    "devsteak.configureApiKey",
    async () => {
      const token = await vscode.window.showInputBox({
        placeHolder: "Paste your API token ",
        password: true,
      });

      if (!token) {
        vscode.window.showErrorMessage("API token is required.");
        return;
      }

      try {
        const { data, error } = await supabase
          .from("api_tokens")
          .select("*")
          .eq("token", token)
          .eq("revoked", false)
          .single();

        if (error || !data) {
          vscode.window.showErrorMessage(
            "Invalid API token. Please try again.",
          );
          return;
        }

        await context.secrets.store("devsteak_api_token", token);
        await context.secrets.store("devsteak_user_id", data.user_id);

        globalUserId = data.user_id;

        const { error: updateError } = await supabase
          .from("profiles")
          .update({ is_extension_active: true })
          .eq("id", data.user_id);

        if (updateError)
          console.error("Failed to update profile:", updateError);
        startTracking(context);
        startSendingSessions(context);

        vscode.window.showInformationMessage("API token saved successfully.");
      } catch (error: unknown) {
        vscode.window.showErrorMessage(
          "Failed to connect to DevSteak: " + error,
        );
      }
    },
  );

  const disconnectAccount = vscode.commands.registerCommand(
    "devsteak.clearApiKey",
    async () => {
      await context.secrets.delete("devsteak_api_token");
      await context.secrets.delete("devsteak_user_id");

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
    "devsteak.checkToken",
    async () => {
      const token = await context.secrets.get("devsteak_api_token");
      const user_id = await context.secrets.get("devsteak_user_id");

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
