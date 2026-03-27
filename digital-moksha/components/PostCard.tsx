import { CAT_META, timeAgo } from '@/lib/data';
import { Heart, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import DynamicIcon from './DynamicIcon';

interface PostCardProps {
  id: string;
  title: string;
  body: string;
  category: keyof typeof CAT_META;
  avatarIcon: string;
  author: string;
  reactions: number;
  comments: number;
  ts: number;
  reacted?: boolean;
  onReact?: (id: string) => void;
}

export default function PostCard({ id, title, body, category, avatarIcon, author, reactions, comments, ts, reacted: initReacted, onReact }: PostCardProps) {
  const [reacted, setReacted] = useState(initReacted ?? false);
  const [count, setCount] = useState(reactions);
  const meta = CAT_META[category];

  const handleReact = () => {
    const next = !reacted;
    setReacted(next);
    setCount(c => next ? c + 1 : c - 1);
    onReact?.(id);
  };

  return (
    <article className="card p-5 space-y-3 animate-slide-up">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-2xl neu-surface-sm flex items-center justify-center flex-shrink-0">
          <DynamicIcon name={avatarIcon} size={16} className="text-slate" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-iron truncate">{author}</p>
          <p className="text-xs text-slate">{timeAgo(ts)}</p>
        </div>
        <span
          className="category-pill flex-shrink-0 text-[10px] flex items-center gap-1.5"
          style={{ background: meta.bg, color: meta.color }}
        >
          <DynamicIcon name={meta.icon} size={10} />
          {meta.label}
        </span>
      </div>

      {/* Content */}
      <h3 className="text-sm font-semibold text-smoke leading-snug">{title}</h3>
      <p className="text-sm text-slate leading-relaxed line-clamp-3">{body}</p>

      {/* Footer */}
      <div className="flex items-center gap-4 pt-1 border-t border-mist">
        <button
          onClick={handleReact}
          className="flex items-center gap-1.5 text-xs font-medium transition-all"
          style={{ color: reacted ? '#FF7CB0' : '#8A8A8A' }}
        >
          <Heart size={14} fill={reacted ? '#FF7CB0' : 'none'} strokeWidth={2} />
          {count} relate
        </button>
        <button className="flex items-center gap-1.5 text-xs font-medium text-slate hover:text-iron transition-colors">
          <MessageSquare size={14} />
          {comments} replies
        </button>
      </div>
    </article>
  );
}
