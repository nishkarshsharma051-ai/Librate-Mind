'use client';
import { useState } from 'react';
import AppShell from '@/components/layout/AppShell';
import PostCard from '@/components/PostCard';
import DynamicIcon from '@/components/DynamicIcon';
import { COMMUNITY_POSTS, CAT_META, Post } from '@/lib/data';
import { PenSquare, X, Plus, Info } from 'lucide-react';
import { clsx } from 'clsx';

type Category = keyof typeof CAT_META | 'all';

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>(COMMUNITY_POSTS);
  const [filter, setFilter] = useState<Category>('all');
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');
  const [newCat, setNewCat] = useState<keyof typeof CAT_META>('phone-addiction');
  const [anon, setAnon] = useState(true);

  const filtered = filter === 'all' ? posts : posts.filter(p => p.category === filter);

  const submit = () => {
    if (!newBody.trim()) return;
    const post = {
      id: 'p' + Date.now(),
      title: newTitle.trim() || 'Anonymous Story',
      body: newBody.trim(),
      category: newCat,
      avatarIcon: ['Shield', 'Heart', 'Wind', 'Zap', 'Target'][Math.floor(Math.random() * 5)],
      author: anon ? 'Anonymous Explorer' : 'You',
      reactions: 0,
      comments: 0,
      ts: Date.now(),
      reacted: false,
    };
    setPosts(p => [post, ...p]);
    setNewTitle(''); setNewBody(''); setShowModal(false);
  };

  return (
    <AppShell>
      {/* Post Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-end md:items-center justify-center p-4 animate-fade-in">
          <div className="glass-card w-full max-w-lg p-8 space-y-6 border-mist shadow-hero-glow">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-primary tracking-tight">Share Your Experience</h3>
              <button onClick={() => setShowModal(false)} className="neu-btn w-10 h-10 flex items-center justify-center text-muted hover:text-primary">
                <X size={16} />
              </button>
            </div>

            <div className="neu-inset rounded-2xl p-1.5 flex gap-1 flex-wrap bg-surface/50 border border-mist">
              {(Object.entries(CAT_META) as [keyof typeof CAT_META, typeof CAT_META[keyof typeof CAT_META]][]).map(([key, meta]) => (
                <button
                  key={key}
                  onClick={() => setNewCat(key)}
                  className={clsx(
                    'flex-1 py-2 px-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 whitespace-nowrap',
                    newCat === key ? 'neu-surface-sm text-primary shadow-sm border border-mist' : 'text-muted hover:text-primary'
                  )}
                >
                  <DynamicIcon name={meta.icon} size={12} />
                  {meta.label.split(' ')[0]}
                </button>
              ))}
            </div>

            <input
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              placeholder="Give it a title (optional)"
              className="w-full neu-inset rounded-2xl px-5 py-3.5 text-sm text-primary placeholder-muted bg-surface/30 border border-mist focus:border-primary/30 transition-all outline-none"
            />

            <textarea
              value={newBody}
              onChange={e => setNewBody(e.target.value)}
              placeholder="Share what you're going through..."
              rows={4}
              className="w-full neu-inset rounded-2xl px-5 py-4 text-sm text-primary placeholder-muted bg-surface/30 border border-mist focus:border-primary/30 transition-all outline-none resize-none"
            />

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-3 text-xs font-bold text-muted uppercase tracking-widest cursor-pointer select-none">
                <div
                  onClick={() => setAnon(a => !a)}
                  className={clsx('w-10 h-6 rounded-full border-2 transition-all relative cursor-pointer', anon ? 'border-primary/30 bg-primary/10' : 'border-mist bg-surface')}
                >
                  <div className={clsx('absolute top-0.5 w-4 h-4 rounded-full transition-all shadow-sm', anon ? 'left-4 bg-primary' : 'left-0.5 bg-muted')} />
                </div>
                Anonymous
              </label>
              <button
                onClick={submit}
                disabled={!newBody.trim()}
                className="neu-btn px-6 py-3 text-[10px] font-black uppercase tracking-widest text-primary disabled:opacity-30 disabled:grayscale transition-all"
              >
                Post Story
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto px-5 py-8 space-y-6 page-enter">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-primary tracking-tight">Community</h1>
            <p className="text-sm text-muted font-medium mt-1 italic">Anonymous peer support — real stories, real help</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="neu-btn flex items-center gap-2 px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-primary flex-shrink-0"
          >
            <PenSquare size={15} /> Share
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-2.5 overflow-x-auto pb-4 scrollbar-hide pt-1">
          <button
            onClick={() => setFilter('all')}
            className={clsx(
              'flex-shrink-0 px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2',
              filter === 'all' ? 'neu-surface-sm text-primary' : 'bg-surface/50 text-muted shadow-sm border border-mist hover:border-secondary/50'
            )}
          >
            <DynamicIcon name="LayoutGrid" size={14} />
            All Feed
          </button>
          {(Object.entries(CAT_META) as [keyof typeof CAT_META, typeof CAT_META[keyof typeof CAT_META]][]).map(([key, meta]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={clsx(
                'flex-shrink-0 px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border',
                filter === key ? 'neu-surface-sm text-primary border-mist shadow-hero-glow' : 'bg-surface/50 text-muted shadow-sm border-mist hover:border-secondary/50'
              )}
            >
              <DynamicIcon name={meta.icon} size={14} />
              {meta.label}
            </button>
          ))}
        </div>

        {/* Feed */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-slate">
              <p className="text-2xl mb-2">🕊️</p>
              <p className="text-sm">Nothing here yet. Be the first to share.</p>
            </div>
          ) : filtered.map(p => (
            <PostCard key={p.id} {...p} />
          ))}
        </div>
      </div>
    </AppShell>
  );
}
