const AYA_CONFIG = {
  mode: "manual",
  proxyUrl: "https://your-worker.workers.dev/ai", 
  storageKey: "aya_live_v1"
};

function loadConfig() {
  try {
    const saved = JSON.parse(localStorage.getItem(AYA_CONFIG.storageKey) || "{}");
    return { ...AYA_CONFIG, ...saved };
  } catch { return AYA_CONFIG; }
}

function saveConfig(cfg) {
  localStorage.setItem(AYA_CONFIG.storageKey, JSON.stringify(cfg));
}
