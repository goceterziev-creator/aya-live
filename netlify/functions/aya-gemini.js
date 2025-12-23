{\rtf1\ansi\ansicpg1252\cocoartf2513
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww10800\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 export async function handler(event) \{\
  try \{\
    const body = JSON.parse(event.body || "\{\}");\
\
    const prompt = `\
You are AYA \'97 a luxury travel intelligence agent.\
\
User context:\
Destination: $\{body.destination\}\
Dates: $\{body.date_from\} to $\{body.date_to\}\
People: $\{body.people\}\
Style: $\{body.style\}\
Notes: $\{body.notes\}\
\
Task:\
Return a clear, calm, luxury-focused travel recommendation.\
Use structured sections:\
- Overview\
- Accommodation logic\
- Location advice\
- Budget ranges\
- Clear next step\
\
Tone: discreet, confident, premium.\
`;\
\
    const res = await fetch(\
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=" +\
        process.env.GEMINI_API_KEY,\
      \{\
        method: "POST",\
        headers: \{ "Content-Type": "application/json" \},\
        body: JSON.stringify(\{\
          contents: [\{ parts: [\{ text: prompt \}] \}]\
        \})\
      \}\
    );\
\
    const data = await res.json();\
    const text =\
      data.candidates?.[0]?.content?.parts?.[0]?.text ||\
      "AYA could not generate a response.";\
\
    return \{\
      statusCode: 200,\
      body: JSON.stringify(\{ text \})\
    \};\
  \} catch (err) \{\
    return \{\
      statusCode: 500,\
      body: JSON.stringify(\{ error: err.message \})\
    \};\
  \}\
\}\
}