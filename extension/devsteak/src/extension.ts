import * as vscode from "vscode";
import { supabase } from "./lib/supabase";

export function activate(context: vscode.ExtensionContext) {
  const connectAccount = vscode.commands.registerCommand(
    "devsteak.configureAccount",
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

  context.subscriptions.push(connectAccount);
}

export function deactivate() {}
