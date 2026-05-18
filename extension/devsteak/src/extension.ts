import * as vscode from "vscode";
import { supabase } from "./lib/supabase";
import { startTracking } from "./tracker";

export async function activate(context: vscode.ExtensionContext) {
  const token = await context.secrets.get("devsteak_api_token");

  if (token) {
    startTracking(context);
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

        vscode.window.showInformationMessage(
          "Successfully connected to DevSteak!",
        );
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
      vscode.window.showInformationMessage("API token cleared successfully.");
    },
  );

  context.subscriptions.push(connectAccount, disconnectAccount);
}
