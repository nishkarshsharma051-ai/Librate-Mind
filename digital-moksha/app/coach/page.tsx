'use client';
import { useState, useRef, useEffect } from 'react';
import AppShell from '@/components/layout/AppShell';
import DynamicIcon from '@/components/DynamicIcon';
import { DAILY_CHALLENGES, AI_MOCK_RESPONSES, COACH_SYSTEM_PROMPT } from '@/lib/data';
import { Send, Bot, User, Sparkles, MessageSquarePlus } from 'lucide-react';
import { clsx } from 'clsx';

type Message = { role: 'user' | 'assistant'; content: string; ts: number };

export default function CoachPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi! I\'m your AI Detox Coach. I\'m here to help you build healthier digital habits — no judgment, just practical support. What\'s on your mind today?',
      ts: Date.now(),
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeChallenge, setActiveChallenge] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: 'user', content: input.trim(), ts: Date.now() };
    setMessages(p => [...p, userMsg]);
    setInput('');
    setLoading(true);

    // Try API, fallback to mock
    try {
      const res = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })) }),
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(p => [...p, { role: 'assistant', content: data.content, ts: Date.now() }]);
      } else throw new Error('fallback');
    } catch {
      await new Promise(r => setTimeout(r, 900 + Math.random() * 800));
      const mock = AI_MOCK_RESPONSES[Math.floor(Math.random() * AI_MOCK_RESPONSES.length)];
      setMessages(p => [...p, { role: 'assistant', content: mock, ts: Date.now() }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto px-5 py-8 flex flex-col h-[calc(100vh-80px)] gap-6 page-enter">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-smoke">AI Detox Coach</h1>
          <p className="text-sm text-slate mt-1">Practical support for healthier digital habits</p>
        </div>

        {/* Daily Challenge strip */}
        <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide pt-1">
          {DAILY_CHALLENGES.map(c => (
            <button
              key={c.id}
              onClick={() => {
                setActiveChallenge(c.id === activeChallenge ? null : c.id);
                if (c.id !== activeChallenge) {
                  setInput(`Can you help me with the "${c.title}" challenge? ${c.desc}`);
                }
              }}
              className={clsx(
                'flex-shrink-0 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 mt-1 mb-1',
                activeChallenge === c.id
                  ? 'neu-surface-sm text-iron shadow-sm scale-[0.98]'
                  : 'bg-white text-slate shadow-sm border border-mist hover:border-silver/50 hover:shadow-md'
              )}
            >
              <DynamicIcon name={c.icon || 'Zap'} size={14} />
              {c.title}
            </button>
          ))}
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {messages.map((m, i) => (
            <div key={i} className={clsx('flex gap-3 items-start animate-slide-up', m.role === 'user' && 'flex-row-reverse')}>
              <div className={clsx(
                'w-8 h-8 rounded-2xl flex items-center justify-center flex-shrink-0',
                m.role === 'assistant' ? 'neu-surface-sm' : 'bg-smoke'
              )}>
                {m.role === 'assistant'
                  ? <Bot size={14} className="text-slate" />
                  : <User size={14} className="text-fog" />
                }
              </div>
              <div className={clsx(
                'max-w-[78%] px-4 py-3 rounded-3xl text-sm leading-relaxed',
                m.role === 'assistant'
                  ? 'glass-card text-iron'
                  : 'bg-smoke text-fog rounded-tr-sm'
              )}>
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3 items-start animate-fade-in">
              <div className="w-8 h-8 rounded-2xl neu-surface-sm flex items-center justify-center">
                <Bot size={14} className="text-slate" />
              </div>
              <div className="glass-card px-4 py-3 rounded-3xl">
                <div className="flex gap-1.5 items-center">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="w-2 h-2 rounded-full bg-silver animate-pulse-soft" style={{ animationDelay: `${i * 0.2}s` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input row */}
        <div className="flex gap-3 items-end">
          <div className="flex-1 neu-inset rounded-3xl px-4 py-3 flex items-center gap-2">
            <Sparkles size={14} className="text-silver flex-shrink-0" />
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
              placeholder="Ask your coach anything..."
              className="flex-1 bg-transparent text-sm text-iron placeholder-slate outline-none"
            />
          </div>
          <button
            onClick={send}
            disabled={!input.trim() || loading}
            className={clsx(
              'w-12 h-12 rounded-2xl flex items-center justify-center transition-all',
              input.trim() && !loading ? 'bg-smoke text-fog shadow-card' : 'neu-surface-sm text-silver'
            )}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </AppShell>
  );
}
