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
    if (sort === 'size') arr = [...arr].sort((a, b) => (b.data.size || 0) - (a.data.size || 0)).reverse();
    return arr;
  }, [items, q, category, sub, sort]);

  // Derive unique categories/subs
  const categories = useMemo(() => Array.from(new Set(items.map((d) => d.data.category).filter(Boolean))), [items]);
  const subs = useMemo(
    () => Array.from(new Set(items.filter((d) => !category || d.data.category === category).map((d) => d.data.subCategory).filter(Boolean))),
    [items, category]
  );

  return (
    <div>
      {/* Filter Controls */}
      <div class="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 mb-6 shadow-sm">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div class="relative">
            <label htmlFor="search" class="sr-only">Tìm kiếm</label>
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              id="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Tìm theo tiêu đề, tags..."
              className="block w-full pl-10 pr-3 py-3 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="category" class="sr-only">Nhóm</label>
            <select 
              id="category"
              className="block w-full px-3 py-3 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base sm:text-sm appearance-none bg-white" 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Tất cả nhóm</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="subcategory" class="sr-only">Phân nhóm</label>
            <select 
              id="subcategory"
              className="block w-full px-3 py-3 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base sm:text-sm appearance-none bg-white" 
              value={sub} 
              onChange={(e) => setSub(e.target.value)}
            >
              <option value="">Tất cả phân nhóm</option>
              {subs.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="sort" class="sr-only">Sắp xếp</label>
            <select 
              id="sort"
              className="block w-full px-3 py-3 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base sm:text-sm appearance-none bg-white" 
              value={sort} 
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="date">Mới nhất</option>
              <option value="size">Nhiều thẻ</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-sm text-gray-600 order-2 sm:order-1">
            <span className="font-medium">{filtered.length}</span> kết quả
          </p>
          {(q || category || sub) && (
            <button 
              onClick={() => {
                setQ('');
                setCategory('');
                setSub('');
                setSort('date');
              }}
              className="order-1 sm:order-2 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors active:bg-blue-200 touch-manipulation"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Xóa bộ lọc
            </button>
          )}
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((d) => {
          const slug = d.slug;
          const title = d.data.title;
          const cover = d.data.cover || `/api/og/${slug}`;
          const date = d.data.date;
          const size = d.data.size;
          const category = d.data.category;
          const subCategory = d.data.subCategory;
          const tags = d.data.tags || [];
          
          return (
            <article key={slug} className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-200 active:scale-95 touch-manipulation">
              <a href={`/decks/${slug}`} className="block">
                {/* Cover Image */}
                <div className="aspect-video bg-gradient-to-br from-blue-50 to-emerald-50 overflow-hidden">
                  <img 
                    src={cover} 
                    alt={title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  {/* Category Badge */}
                  {category && (
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {category}
                      </span>
                      {subCategory && (
                        <span className="text-xs text-gray-500 truncate">/ {subCategory}</span>
                      )}
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors text-base sm:text-lg leading-tight">
                    {title}
                  </h3>

                  {/* Metadata */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-3 sm:gap-4">
                      {date && (
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-xs">{new Date(date).toLocaleDateString('vi-VN')}</span>
                        </span>
                      )}
                      {size && (
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                          <span className="text-xs">{size.toLocaleString()} thẻ</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Tags */}
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {tags.slice(0, 2).map(tag => (
                        <span key={tag} className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-600 truncate max-w-[80px] sm:max-w-none">
                          #{tag}
                        </span>
                      ))}
                      {tags.length > 2 && (
                        <span className="text-xs text-gray-400">+{tags.length - 2}</span>
                      )}
                    </div>
                  )}
                </div>
              </a>
            </article>
          );
        })}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy deck nào</h3>
          <p className="text-gray-500 mb-4">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.</p>
          <button 
            onClick={() => {
              setQ('');
              setCategory('');
              setSub('');
              setSort('date');
            }}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Xóa tất cả bộ lọc
          </button>
        </div>
      )}
    </div>
  );
}
