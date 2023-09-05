import * as vscode from "vscode";

import { generateAiCommitCommand, setOpenaiApiKey } from "@commands";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "gptcommit@max.generateAICommit",
      generateAiCommitCommand
    )
  );
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "gptcommit@max.setOpenAIApiKey",
      setOpenaiApiKey
    )
  );
}

export function deactivate() {}
