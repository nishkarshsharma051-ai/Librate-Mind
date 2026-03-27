import { NextRequest, NextResponse } from 'next/server';
import { HABIT_PATTERNS } from '@/lib/data';

/**
 * Habit Rewiring Engine API
 * POST: Takes current usage data or triggers
 * RETURNS: Analysis of patterns + real-time alternative suggestions
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { screenTime, unlocks, topCategory } = body;

    // Simulate "engine" logic based on inputs
    // In a real high-end app, this might call a lightweight ML model or 
    // run complex heuristic checks against historical data.
    
    const analysis = [];
    
    if (screenTime > 6) {
      analysis.push(HABIT_PATTERNS.find(h => h.category === 'burnout'));
    }
    
    if (unlocks > 40) {
      analysis.push(HABIT_PATTERNS.find(h => h.category === 'phone-addiction'));
    }

    if (topCategory === 'social-media-anxiety' || (screenTime > 2 && unlocks > 20)) {
      analysis.push(HABIT_PATTERNS.find(h => h.category === 'social-media-anxiety'));
    }

    // Default if no specific match
    if (analysis.length === 0) {
      analysis.push(HABIT_PATTERNS[Math.floor(Math.random() * HABIT_PATTERNS.length)]);
    }

    return NextResponse.json({
      status: 'success',
      timestamp: Date.now(),
      patterns_detected: analysis.filter(Boolean).length,
      recommendations: analysis.filter(Boolean),
      insight: "Your digital usage shows a slight spike in short-form content consumption. Consider a 'Focus Sprint' of 25 minutes."
    });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function GET() {
  // Simple check for the engine status
  return NextResponse.json({ 
    engine: 'Habit Rewiring Engine v1.0',
    status: 'Operational',
    categories: ['phone-addiction', 'social-media-anxiety', 'notification-fatigue', 'burnout']
  });
}
