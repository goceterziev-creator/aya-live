// В aya-gemini.js - Gemini играе и двата роля
const geminiAnalysis = await model.generateContent(`
Ти си SII + EIRA. Анализирай тези файлове и дай инструкции:

${files}

Инструкции:
1. Категоризирай по проект
2. Предложи папкова структура
3. Генерирай JSON със задачи за мен

Отговор в този формат:
{
  "projects": ["Проект А", "Проект Б"],
  "folders_to_create": ["/Проект_А/Договори", ...],
  "files_to_move": [
    {"from": "INBOX/file1.pdf", "to": "/Проект_А/Договори/file1.pdf"}
  ]
}
`);
