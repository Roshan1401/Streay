import * as vscode from "vscode";

export function configPanel(
  webview: vscode.Webview,
  context: vscode.ExtensionContext,
): string {
  const logo = webview.asWebviewUri(
    vscode.Uri.joinPath(context.extensionUri, "src", "assets", "Streaky.ico"),
  );

  return /* html */ `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Streaky — Connect</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: var(--vscode-font-family);
      background: var(--vscode-editor-background);
      color: var(--vscode-foreground);
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 2rem;
    }

    .card {
      width: 100%;
      max-width: 400px;
      background: var(--vscode-sideBar-background);
      border: 1px solid var(--vscode-panel-border);
      border-radius: 12px;
      padding: 2rem;
      animation: fadeIn 0.25s ease-out;
    }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

    .header {
      text-align: center;
      margin-bottom: 1.75rem;
    }
    .header img {
      width: 56px;
      height: 56px;
      border-radius: 10px;
      margin-bottom: 0.75rem;
    }
    .header h1 {
      font-size: 18px;
      font-weight: 600;
      color: var(--vscode-foreground);
    }
    .header h1 span { color: #f97316; }
    .header p {
      font-size: 13px;
      color: var(--vscode-descriptionForeground);
      margin-top: 4px;
      line-height: 1.5;
    }

    .steps {
      background: var(--vscode-editor-background);
      border: 1px solid var(--vscode-panel-border);
      border-radius: 8px;
      padding: 0.75rem 1rem;
      margin-bottom: 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .step {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 12px;
      color: var(--vscode-descriptionForeground);
    }
    .step .num {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #f97316;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: 700;
      flex-shrink: 0;
    }
    .step a {
      color: #f97316;
      cursor: pointer;
      text-decoration: none;
    }
    .step a:hover { text-decoration: underline; }

    label {
      display: block;
      font-size: 11px;
      font-weight: 500;
      margin-bottom: 5px;
      color: var(--vscode-descriptionForeground);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .input-wrap {
      position: relative;
      margin-bottom: 0.75rem;
    }
    input {
      width: 100%;
      padding: 10px 40px 10px 12px;
      background: var(--vscode-input-background);
      border: 1px solid var(--vscode-input-border, #3c3c3c);
      border-radius: 8px;
      color: var(--vscode-input-foreground);
      font-size: 14px;
      font-family: var(--vscode-editor-font-family);
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    input:focus {
      border-color: #f97316;
      box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.15);
    }
    input::placeholder { color: var(--vscode-input-placeholderForeground); }
    input.error { border-color: #ef4444; }

    .eye-btn {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      color: var(--vscode-descriptionForeground);
      padding: 4px;
      border-radius: 4px;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.15s;
    }
    .eye-btn:hover { color: var(--vscode-foreground); }

    .message {
      font-size: 12px;
      padding: 8px 12px;
      border-radius: 8px;
      margin-bottom: 0.75rem;
      display: none;
      line-height: 1.4;
      animation: fadeIn 0.2s ease-out;
    }
    .message.error {
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.25);
      color: #f87171;
    }
    .message.success {
      background: rgba(34, 197, 94, 0.1);
      border: 1px solid rgba(34, 197, 94, 0.25);
      color: #4ade80;
    }
    .message.show { display: flex; align-items: center; gap: 6px; }

    .btn {
      width: 100%;
      padding: 10px 16px;
      border: none;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.15s, opacity 0.15s, transform 0.1s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    .btn:active { transform: scale(0.98); }

    .btn-primary {
      background: #f97316;
      color: white;
    }
    .btn-primary:hover { background: #ea6c0a; }
    .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

    .btn-secondary {
      margin-top: 8px;
      background: transparent;
      border: 1px solid var(--vscode-panel-border);
      color: var(--vscode-descriptionForeground);
    }
    .btn-secondary:hover {
      border-color: #f97316;
      color: #f97316;
    }

    @keyframes spin { to { transform: rotate(360deg); } }
    .spinner {
      width: 14px;
      height: 14px;
      border: 2px solid rgba(255,255,255,0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
      display: none;
    }
    .loading .spinner { display: block; }
    .loading .btn-text { display: none; }

    .connected-state {
      text-align: center;
      padding: 0.5rem 0;
    }
    .connected-state .check {
      font-size: 32px;
      margin-bottom: 0.5rem;
    }
    .connected-state p {
      font-size: 13px;
      color: var(--vscode-descriptionForeground);
      line-height: 1.5;
    }
    .hidden { display: none; }
  </style>
</head>
<body>

<div class="card" id="card">
  <div class="header">
    <img src="${logo}" alt="Streaky" />
    <h1>Stre<span>aky</span></h1>
    <p>Paste your API token to start tracking</p>
  </div>

  <div class="steps">
    <div class="step">
      <span class="num">1</span>
      <span>Open <a id="dashboard-link">Streaky Dashboard</a> → Copy API Token</span>
    </div>
    <div class="step">
      <span class="num">2</span>
      <span>Paste the token below</span>
    </div>
    <div class="step">
      <span class="num">3</span>
      <span>Click Connect — done!</span>
    </div>
  </div>

  <div id="connect-form">
    <label for="token-input">API Token</label>
    <div class="input-wrap">
      <input
        id="token-input"
        type="password"
        placeholder="sk-xxxxxxxxxxxxxxxxxxxx"
        autocomplete="off"
        spellcheck="false"
      />
      <button class="eye-btn" id="eye-btn" title="Toggle visibility">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      </button>
    </div>

    <div class="message" id="message"></div>

    <button class="btn btn-primary" id="connect-btn">
      <div class="spinner"></div>
      <span class="btn-text">Connect Account</span>
    </button>
  </div>

  <div id="connected-state" class="connected-state hidden">
    <div class="check">🎉</div>
    <p><strong style="color: var(--vscode-foreground);">Connected!</strong><br/>Your coding sessions are being tracked.</p>
  </div>

  <button class="btn btn-secondary" id="dashboard-btn">
    Open Streaky Dashboard ↗
  </button>
</div>

<script>
  const vscode = acquireVsCodeApi();

  const tokenInput = document.getElementById("token-input");
  const connectBtn = document.getElementById("connect-btn");
  const messageEl  = document.getElementById("message");
  const eyeBtn     = document.getElementById("eye-btn");
  const form       = document.getElementById("connect-form");
  const connected  = document.getElementById("connected-state");

  let hidden = true;

  eyeBtn.addEventListener("click", () => {
    hidden = !hidden;
    tokenInput.type = hidden ? "password" : "text";
    eyeBtn.innerHTML = hidden
      ? \`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>\`
      : \`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>\`;
  });

  function openDashboard() {
    vscode.postMessage({ command: "openDashboard" });
  }

  document.getElementById("dashboard-link").addEventListener("click", openDashboard);
  document.getElementById("dashboard-btn").addEventListener("click", openDashboard);

  connectBtn.addEventListener("click", () => {
    const token = tokenInput.value.trim();
    if (!token) {
      showMessage("error", "Please paste your API token first.");
      tokenInput.classList.add("error");
      return;
    }
    tokenInput.classList.remove("error");
    setLoading(true);
    hideMessage();
    vscode.postMessage({ command: "connect", token });
  });

  tokenInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") connectBtn.click();
  });

  tokenInput.addEventListener("input", () => {
    tokenInput.classList.remove("error");
  });

  window.addEventListener("message", (event) => {
    const { command, message } = event.data;

    if (command === "success") {
      setLoading(false);
      showMessage("success", "✅ Connected! Tracking started.");
      tokenInput.value = "";
      connectBtn.disabled = true;
      setTimeout(() => {
        form.classList.add("hidden");
        connected.classList.remove("hidden");
      }, 600);
    }

    if (command === "error") {
      setLoading(false);
      showMessage("error", message || "Something went wrong. Please try again.");
    }
  });

  function setLoading(state) {
    connectBtn.classList.toggle("loading", state);
    connectBtn.disabled = state;
  }

  function showMessage(type, text) {
    messageEl.className = "message " + type + " show";
    messageEl.textContent = text;
  }

  function hideMessage() {
    messageEl.className = "message";
    messageEl.textContent = "";
  }
</script>
</body>
</html>`;
}
