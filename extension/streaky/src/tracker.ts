import * as vscode from "vscode";

type Session = {
  language: string;
  duration: number;
  session_date: string;
  recorded_at: string;
};

let currentLanguage: string | null = null;
let sessionStartTime: number = 0;
let lastActivityTime: number = 0;
let isIdle: boolean = false;
let sessions: Session[] = [];

export function saveCurrentSession() {
  if (!currentLanguage || sessionStartTime === 0) return;

  if (Date.now() - sessionStartTime < 5000) {
    return;
  }

  const session: Session = {
    language: currentLanguage,
    duration: Math.floor((Date.now() - sessionStartTime) / 1000),
    session_date: new Date(sessionStartTime).toISOString().split("T")[0],
    recorded_at: new Date().toISOString(),
  };

  const existingLanguage = sessions.find(
    (s) => s.language === session.language,
  );

  if (existingLanguage) {
    existingLanguage.duration += session.duration;
    existingLanguage.recorded_at = session.recorded_at;
  } else {
    sessions.push(session);
    console.log("Session saved:", session);
  }
  sessionStartTime = 0;
}

export const getSessions = () => sessions;
export const clearSessions = () => {
  sessions = [];
};

export function startTracking(context: vscode.ExtensionContext) {
  const activeEditor = vscode.window.activeTextEditor;
  if (activeEditor && activeEditor.document.languageId !== "plaintext") {
    currentLanguage = activeEditor.document.languageId;
    sessionStartTime = Date.now();
    lastActivityTime = Date.now();
    isIdle = false;
  }
  const editorListner = vscode.window.onDidChangeActiveTextEditor((editor) => {
    if (!editor) return;

    const language = editor.document.languageId;
    if (language === "plaintext") return;

    saveCurrentSession();
    currentLanguage = language;
    sessionStartTime = Date.now();
    lastActivityTime = Date.now();
    isIdle = false;
  });

  const documentListner = vscode.workspace.onDidChangeTextDocument(() => {
    if (!currentLanguage) return;

    lastActivityTime = Date.now();

    if (isIdle) {
      isIdle = false;
      sessionStartTime = Date.now();
    }
  });

  const idleInterval = setInterval(() => {
    const idleTime = Date.now() - lastActivityTime;

    if (!isIdle && idleTime > 2 * 60 * 1000) {
      isIdle = true;
      saveCurrentSession();
    }
  }, 30 * 1000);

  context.subscriptions.push(editorListner, documentListner, {
    dispose: () => clearInterval(idleInterval),
  });
}
