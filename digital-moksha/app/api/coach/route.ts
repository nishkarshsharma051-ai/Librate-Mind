import { NextRequest, NextResponse } from 'next/server';
import { COACH_SYSTEM_PROMPT } from '@/lib/data';

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'No API key' }, { status: 503 });
  }

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        max_tokens: 200,
        messages: [
          { role: 'system', content: COACH_SYSTEM_PROMPT },
          ...messages,
        ],
      }),
    });

    if (!res.ok) throw new Error(await res.text());
    const data = await res.json();
    return NextResponse.json({ content: data.choices[0].message.content });
  } catch (err) {
    return NextResponse.json({ error: 'AI unavailable' }, { status: 500 });
  }
}
