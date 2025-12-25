async function callModel(cfg, prompt, apiKey) {
  if (cfg.mode === "manual") {
    return { mode: "manual", promptForUser: prompt };
  }
  
  // PaLM 2 чрез прокси
  const res = await fetch(cfg.proxyUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "text-bison-001", prompt })
  });
  
  const data = await res.json();
  return { mode: "palm2", rawResponse: data.text };
}
