import { useEffect, useMemo, useState } from 'react';

export default function DeckFilters({ items }) {
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('');
  const [sub, setSub] = useState('');
  const [sort, setSort] = useState('date');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const sp = new URLSearchParams(window.location.search);
    setQ(sp.get('q') || '');
    setCategory(sp.get('category') || '');
    setSub(sp.get('sub') || '');
    setSort(sp.get('sort') || 'date');
  }, []);

  // Sync to URL
  useEffect(() => {
    const sp = new URLSearchParams();
    if (q) sp.set('q', q);
    if (category) sp.set('category', category);
    if (sub) sp.set('sub', sub);
    if (sort) sp.set('sort', sort);
    const qs = sp.toString();
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      window.history.replaceState(null, '', qs ? `?${qs}` : path);
    }
  }, [q, category, sub, sort]);

  const filtered = useMemo(() => {
    let arr = items;
    if (q) {
      const qq = q.toLowerCase();
      arr = arr.filter((d) =>
        d.data.title.toLowerCase().includes(qq) || (d.data.tags || []).some((t) => t.toLowerCase().includes(qq))
      );
    }
    if (category) arr = arr.filter((d) => d.data.category === category);
    if (sub) arr = arr.filter((d) => d.data.subCategory === sub);
    if (sort === 'date') arr = [...arr].sort((a, b) => (b.data.date || '').localeCompare(a.data.date || ''));
    if (sort === 'size') arr = [...arr].sort((a, b) => (b.data.size || 0) - (a.data.size || 0));
    return arr;
  }, [items, q, category, sub, sort]);

  // Dispatch filter change event for client-side filtering
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('deckFiltersChanged', {
        detail: { filtered }
      }));
    }
  }, [filtered]);

  // Derive unique categories/subs
  const categories = useMemo(() => Array.from(new Set(items.map((d) => d.data.category).filter(Boolean))), [items]);
  const subs = useMemo(
    () => Array.from(new Set(items.filter((d) => !category || d.data.category === category).map((d) => d.data.subCategory).filter(Boolean))),
    [items, category]
  );

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Tìm kiếm deck theo tên hoặc tag..."
          className="block w-full pl-12 pr-4 py-4 border-2 rounded-2xl bg-white/95 backdrop-blur-md text-gray-900 placeholder-gray-600 transition-all duration-200 shadow-xl text-lg border-gray-300/60"
          style={{
            borderColor: '#6FA4AF',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(0, 0, 0, 0.06)',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#D97D55';
            e.target.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15), 0 8px 24px rgba(217, 125, 85, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#6FA4AF';
            e.target.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(0, 0, 0, 0.06)';
          }}
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        {q && (
          <button
            onClick={() => setQ('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Filters Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Category Filter */}
        <div className="relative">
          <select 
            id="category"
            className="block w-full px-4 py-3 border-2 rounded-xl bg-white/95 backdrop-blur-md focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 shadow-xl text-gray-900 font-medium appearance-none cursor-pointer border-gray-300/60"
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">🌟 Tất cả chủ đề</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                📚 {c}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* SubCategory Filter */}
        <div className="relative">
          <select 
            id="subcategory"
            className="block w-full px-4 py-3 border-2 rounded-xl bg-white/95 backdrop-blur-md focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 shadow-xl text-gray-900 font-medium appearance-none cursor-pointer border-gray-300/60"
            value={sub} 
            onChange={(e) => setSub(e.target.value)}
          >
            <option value="">🎯 Tất cả phân nhóm</option>
            {subs.map((s) => (
              <option key={s} value={s}>
                📖 {s}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Sort Filter */}
        <div className="relative">
          <select 
            id="sort"
            className="block w-full px-4 py-3 border-2 rounded-xl bg-white/95 backdrop-blur-md focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 shadow-xl text-gray-900 font-medium appearance-none cursor-pointer border-gray-300/60"
            value={sort} 
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="date">📅 Mới nhất</option>
            <option value="size">📊 Theo số thẻ</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Clear Filters */}
        <button
          onClick={() => {
            setQ('');
            setCategory('');
            setSub('');
            setSort('date');
          }}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-medium rounded-xl hover:from-gray-600 hover:to-gray-700 focus:ring-2 focus:ring-gray-500 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Xóa bộ lọc</span>
        </button>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span className="font-medium">
            Hiển thị <span className="text-blue-600 font-bold">{filtered.length}</span> trong số <span className="text-blue-600 font-bold">{items.length}</span> deck
          </span>
        </div>
        
        {(q || category || sub) && (
          <div className="flex items-center gap-1 text-xs">
            <span className="text-gray-500">Đã lọc:</span>
            {q && <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md">"{q}"</span>}
            {category && <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md">{category}</span>}
            {sub && <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-md">{sub}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
