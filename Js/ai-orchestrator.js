function buildAnalysisPrompt(files) {
  return `Ти си SII + EIRA. Анализирай тези файлове:

${JSON.stringify(files, null, 2)}

ОТГОВОР САМО С JSON:
{
  "projects": ["Проект А", "Проект Б"],
  "folders_to_create": ["/Проект_А/Договори"],
  "files_to_move": [{"from": "INBOX/file1.pdf", "to": "/Проект_А/file1.pdf"}],
  "tasks": [{"title": "Задача 1", "project": "Проект А"}]
}`;
}

function parseAnalysisResponse(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  const jsonStr = text.slice(start, end + 1);
  return JSON.parse(jsonStr);
}
