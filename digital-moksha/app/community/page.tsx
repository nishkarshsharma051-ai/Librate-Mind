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
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-end md:items-center justify-center p-4 animate-fade-in">
          <div className="card w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-smoke">Share Your Experience</h3>
              <button onClick={() => setShowModal(false)} className="neu-btn w-8 h-8 flex items-center justify-center text-slate">
                <X size={14} />
              </button>
            </div>

            <div className="neu-inset rounded-2xl p-1.5 flex gap-1 flex-wrap bg-fog/30">
              {(Object.entries(CAT_META) as [keyof typeof CAT_META, typeof CAT_META[keyof typeof CAT_META]][]).map(([key, meta]) => (
                <button
                  key={key}
                  onClick={() => setNewCat(key)}
                  className={clsx(
                    'flex-1 py-2 px-3 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap',
                    newCat === key ? 'neu-surface-sm text-iron shadow-sm' : 'text-slate hover:bg-mist/40'
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
              className="w-full neu-inset rounded-2xl px-4 py-3 text-sm text-iron placeholder-slate"
            />

            <textarea
              value={newBody}
              onChange={e => setNewBody(e.target.value)}
              placeholder="Share what you're going through..."
              rows={4}
              className="w-full neu-inset rounded-2xl px-4 py-3 text-sm text-iron placeholder-slate resize-none"
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2.5 text-sm text-slate cursor-pointer select-none">
                <div
                  onClick={() => setAnon(a => !a)}
                  className={clsx('w-10 h-6 rounded-full border-2 transition-all relative cursor-pointer', anon ? 'border-silver' : 'border-mist')}
                >
                  <div className={clsx('absolute top-0.5 w-4 h-4 rounded-full transition-all', anon ? 'left-4 bg-silver' : 'left-0.5 bg-mist')} />
                </div>
                Post anonymously
              </label>
              <button
                onClick={submit}
                disabled={!newBody.trim()}
                className="neu-btn px-5 py-2.5 text-sm font-semibold text-iron disabled:opacity-40"
              >
                Share
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto px-5 py-8 space-y-6 page-enter">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-smoke">Community</h1>
            <p className="text-sm text-slate mt-1">Anonymous peer support — real stories, real help</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="neu-btn flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-iron flex-shrink-0"
          >
            <PenSquare size={15} /> Share
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide pt-1">
          <button
            onClick={() => setFilter('all')}
            className={clsx(
              'flex-shrink-0 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2',
              filter === 'all' ? 'neu-surface-sm text-iron' : 'bg-white text-slate shadow-sm border border-mist hover:border-silver/50'
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
                'flex-shrink-0 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2',
                filter === key ? 'neu-surface-sm text-iron' : 'bg-white text-slate shadow-sm border border-mist hover:border-silver/50'
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
