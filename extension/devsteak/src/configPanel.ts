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
  <title>Streaky — Connect Account</title>
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
      max-width: 420px;
      background: var(--vscode-sideBar-background);
      border: 1px solid var(--vscode-panel-border);
      border-radius: 12px;
      padding: 2rem;
    }

    /* Logo */
    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 1.75rem;
    }
    .logo-icon {
      width: 70px;
      height: 70px;
      border-radius: 10px;
    }
    .logo-name {
      font-size: 20px;
      font-weight: 600;
      color: var(--vscode-foreground);
    }
    .logo-name span { color: #f97316; }

    /* Heading */
    h2 {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 6px;
      color: var(--vscode-foreground);
    }
    .sub {
      font-size: 13px;
      color: var(--vscode-descriptionForeground);
      margin-bottom: 1.5rem;
      line-height: 1.5;
    }

    /* Steps */
    .steps {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 1.5rem;
    }
    .step {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-size: 12px;
      color: var(--vscode-descriptionForeground);
    }
    .step-num {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: var(--vscode-badge-background);
      color: var(--vscode-badge-foreground);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 600;
      flex-shrink: 0;
    }
    .step a {
      color: #f97316;
      cursor: pointer;
      text-decoration: none;
    }
    .step a:hover { text-decoration: underline; }

    /* Divider */
    .divider {
      height: 1px;
      background: var(--vscode-panel-border);
      margin: 1.25rem 0;
    }

    /* Input */
    label {
      display: block;
      font-size: 12px;
      font-weight: 500;
      margin-bottom: 6px;
      color: var(--vscode-foreground);
    }
    .input-wrap {
      position: relative;
      margin-bottom: 1rem;
    }
    input {
      width: 100%;
      padding: 9px 38px 9px 12px;
      background: var(--vscode-input-background);
      border: 1px solid var(--vscode-input-border, #3c3c3c);
      border-radius: 6px;
      color: var(--vscode-input-foreground);
      font-size: 18px;
      font-family: var(--vscode-editor-font-family);
      outline: none;
      transition: border-color 0.15s;
    }
    input:focus { border-color: #f97316; }
    input::placeholder { color: var(--vscode-input-placeholderForeground); }
    .eye-btn {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      color: var(--vscode-descriptionForeground);
      font-size: 15px;
      padding: 0;
      line-height: 1;
    }
    .eye-btn:hover { color: var(--vscode-foreground); }

    /* Error / Success */
    .message {
      font-size: 12px;
      padding: 8px 12px;
      border-radius: 6px;
      margin-bottom: 1rem;
      display: none;
    }
    .message.error {
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.3);
      color: #f87171;
    }
    .message.success {
      background: rgba(34, 197, 94, 0.1);
      border: 1px solid rgba(34, 197, 94, 0.3);
      color: #4ade80;
    }
    .message.show { display: block; }

    /* Buttons */
    .btn-primary {
      width: 100%;
      padding: 9px 16px;
      background: #f97316;
      border: none;
      border-radius: 6px;
      color: white;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.15s, opacity 0.15s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    .btn-primary:hover { background: #ea6c0a; }
    .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

    .btn-link {
      width: 100%;
      margin-top: 10px;
      padding: 8px 16px;
      background: transparent;
      border: 1px solid var(--vscode-panel-border);
      border-radius: 6px;
      color: var(--vscode-descriptionForeground);
      font-size: 12px;
      cursor: pointer;
      transition: border-color 0.15s, color 0.15s;
    }
    .btn-link:hover {
      border-color: #f97316;
      color: #f97316;
    }

    /* Spinner */
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
  </style>
</head>
<body>

<div class="card">
  <div class="logo">
  <img src="${logo}" alt="Streaky Logo" class="logo-icon" />
    <span class="logo-name">Stre<span>aky</span></span>
  </div>

  <h2>Connect your account</h2>
  <p class="sub">
    Paste your API token to start tracking your coding sessions automatically.
  </p>

  <div class="steps">
    <div class="step">
      <div class="step-num">1</div>
      <span>Go to <a id="dashboard-link" src="http://localhost:5173/leaderboard">streaky → Dashboard</a></span>
    </div>
    <div class="step">
      <div class="step-num">2</div>
      <span>Click <strong>Copy API Token</strong></span>
    </div>
    <div class="step">
      <div class="step-num">3</div>
      <span>Paste it below and click Connect</span>
    </div>
  </div>

  <div class="divider"></div>

  <label for="token-input">API Token</label>
  <div class="input-wrap">
    <input
      id="token-input"
      type="password"
      placeholder="sk-xxxxxxxxxxxxxxxxxxxx"
      autocomplete="off"
      spellcheck="false"
    />
    <button class="eye-btn" id="eye-btn" title="Toggle visibility">👁</button>
  </div>

  <div class="message" id="message"></div>

  <button class="btn-primary" id="connect-btn">
    <div class="spinner"></div>
    <span class="btn-text">Connect Account</span>
  </button>

  <button class="btn-link" id="dashboard-btn"">
     Streaky Dashboard ↗
  </button>
</div>

<script>
  const vscode = acquireVsCodeApi();

  const tokenInput = document.getElementById("token-input");
  const connectBtn = document.getElementById("connect-btn");
  const messageEl  = document.getElementById("message");
  const eyeBtn     = document.getElementById("eye-btn");

  // Toggle password visibility
  eyeBtn.addEventListener("click", () => {
    const isPassword = tokenInput.type === "password";
    tokenInput.type = isPassword ? "text" : "password";
    eyeBtn.textContent = isPassword ? "🙈" : "👁";
  });

  // Open dashboard
  document.getElementById("dashboard-link").addEventListener("click", () => {
    vscode.postMessage({ command: "openDashboard" });
  });
  document.getElementById("dashboard-btn").addEventListener("click", () => {
    vscode.postMessage({ command: "openDashboard" });
  });

  // Submit token
  connectBtn.addEventListener("click", () => {
    const token = tokenInput.value.trim();
    if (!token) {
      showMessage("error", "Please paste your API token first.");
      return;
    }

    setLoading(true);
    hideMessage();
    vscode.postMessage({ command: "connect", token });
  });

  // Enter key submit
  tokenInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") connectBtn.click();
  });

  // Handle messages from extension
  window.addEventListener("message", (event) => {
    const { command, text } = event.data;

    if (command === "success") {
      setLoading(false);
      showMessage("success", "✅ Connected successfully! Tracking started.");
      tokenInput.value = "";
      connectBtn.disabled = true;
    }

    if (command === "error") {
      setLoading(false);
      showMessage("error", text || "Something went wrong.");
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
