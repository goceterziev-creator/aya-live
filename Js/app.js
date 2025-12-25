document.addEventListener("DOMContentLoaded", () => {
  const cfg = loadConfig();
  
  // UI елементи
  const modeSelect = document.getElementById("mode-select");
  const apiKeyInput = document.getElementById("api-key-input");
  const logEl = document.getElementById("log-output");
  const panel = document.getElementById("control-panel");
  const runBtn = document.getElementById("btn-run-analysis");
  const demoBtn = document.getElementById("btn-run-demo");
  
  modeSelect.value = cfg.mode;
  
  modeSelect.onchange = () => {
    cfg.mode = modeSelect.value;
    saveConfig(cfg);
  };
  
  function log(msg) {
    logEl.textContent += `${new Date().toLocaleTimeString()}: ${msg}
`;
    logEl.scrollTop = logEl.scrollHeight;
  }
  
  // Demo данни
  demoBtn.onclick = () => {
    document.getElementById("files-input").value = JSON.stringify([
      {path: "INBOX/contract.pdf", title: "Договор Клиент X", content: "Договор за разработка..."},
      {path: "INBOX/notes.txt", title: "Бележки спринт", content: "Задачи: 1. Финализирай API..."}
    ], null, 2);
    log("✅ Demo данни заредени");
  };
  
  // Основен анализ
  runBtn.onclick = async () => {
    logEl.textContent = "";
    try {
      const files = getFilesFromTextarea();
      if (!files.length) return log("❌ Няма файлове");
      
      const prompt = buildAnalysisPrompt(files);
      log(`▶ Анализирам ${files.length} файла`);
      
      const result = await callModel(cfg, prompt, apiKeyInput.value);
      
      if (result.mode === "manual") {
        log("📋 COPY този prompt:");
        log("=".repeat(60));
        log(result.promptForUser);
        log("=".repeat(60));
        log("После пастни JSON отговора в textarea и натисни 'Parse JSON'");
        return;
      }
      
      const parsed = parseAnalysisResponse(result.rawResponse);
      log("✅ РЕЗУЛТАТ:");
      log(JSON.stringify(parsed, null, 2));
      
    } catch (e) {
      log(`❌ ${e.message}`);
    }
  };
  
  document.getElementById("btn-toggle-panel").onclick = () => {
    panel.style.display = panel.style.display === "none" ? "block" : "none";
  };
});
