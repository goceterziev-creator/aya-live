export async function handler(event) {
  try {
    // Allow only POST
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
  contents: [
    {
      role: "user",
      parts: [
        {
          text: prompt
        }
      ]
    }
  ],
  generationConfig: {
    temperature: 0.7,
    maxOutputTokens: 700
  }
})


    // Build prompt (NO template literals, NO fancy chars)
    const prompt =
      "You are AYA, a luxury travel intelligence system.\n\n" +
      "Destination: " + (body.destination || "not specified") + "\n" +
      "Dates: " + (body.date_from || "?") + " to " + (body.date_to || "?") + "\n" +
      "People: " + (body.people || "?") + "\n" +
      "Style: " + (body.style || "not specified") + "\n" +
      "Notes: " + (body.notes || "none") + "\n\n" +
      "Return a calm, structured, premium travel recommendation.\n" +
      "Use clear sections and practical guidance.";

    // Call Gemini
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 700
          },
          safetySettings: [
            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_SEXUAL_CONTENT", threshold: "BLOCK_NONE" }
          ]
        })
      }
    );

    const data = await response.json();

    // Extract text safely from ANY Gemini response
    let text = "";

    if (data && Array.isArray(data.candidates) && data.candidates.length > 0) {
      const candidate = data.candidates[0];

      if (candidate.content && Array.isArray(candidate.content.parts)) {
        text = candidate.content.parts
          .map(p => p.text)
          .filter(Boolean)
          .join("\n");
      }
    }

    if (!text && data && data.promptFeedback) {
      text = "The request was blocked or returned no content. Please adjust the input.";
    }

    if (!text) {
      text = "AYA did not receive usable content from Gemini.";
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "Function crashed",
        details: error.message
      })
    };
  }
}
