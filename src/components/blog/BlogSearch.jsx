import { useEffect, useMemo, useState } from 'react';

export default function BlogSearch({ items }) {
  const [q, setQ] = useState('');
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const sp = new URLSearchParams(window.location.search);
    setQ(sp.get('q') || '');
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const sp = new URLSearchParams();
    if (q) sp.set('q', q);
    const qs = sp.toString();
    window.history.replaceState(null, '', qs ? `?${qs}` : window.location.pathname);
  }, [q]);

  const filtered = useMemo(() => {
    const qq = q.toLowerCase();
    return items.filter((p) => {
      const t = p.data.title?.toLowerCase() || '';
      const s = p.data.summary?.toLowerCase() || '';
      const tags = (p.data.tags || []).join(' ').toLowerCase();
      return !qq || t.includes(qq) || s.includes(qq) || tags.includes(qq);
    });
  }, [items, q]);

  return (
    <div>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Tìm theo tiêu đề/tags/tóm tắt"
        className="rounded border px-3 py-2 w-full"
      />
      <p className="mt-2 text-sm text-gray-600">{filtered.length} bài viết</p>
      <ul className="mt-4 space-y-2">
        {filtered.map((p) => (
          <li key={p.slug}>
            <a className="text-blue-700 hover:underline" href={`/blog/${p.slug}`}>{p.data.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
