import { useEffect, useMemo, useState } from 'react';

export default function BlogSearch({ items }) {
  const [q, setQ] = useState('');
  const [view, setView] = useState('list'); // 'grid' or 'list'
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

  // Load and save view preference
  useEffect(() => {
    const savedView = localStorage.getItem('blogView');
    if (savedView) {
      setView(savedView);
    }
  }, []);

  const handleSetView = (newView) => {
    setView(newView);
    localStorage.setItem('blogView', newView);
  };

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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Search Bar */}
      <div className="mb-8">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Tìm kiếm bài viết theo tiêu đề, nội dung hoặc tags..."
              className="block w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg placeholder-gray-400 transition-all duration-300 hover:shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* View Toggler & Results Stats */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        {/* Stats */}
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/20 shadow-lg text-sm">
          <svg className="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          <span className="font-bold text-purple-600">{filtered.length}</span>
          <span className="text-gray-600">bài viết{q && ` cho "${q}"`}</span>
        </div>

        {/* Toggler */}
        <div className="flex items-center p-1 bg-gray-200/80 rounded-xl border border-white/20 shadow-inner">
          <button onClick={() => handleSetView('list')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${view === 'list' ? 'bg-white text-purple-600 shadow' : 'text-gray-600 hover:bg-white/50'}`}>
            Danh sách
          </button>
          <button onClick={() => handleSetView('grid')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${view === 'grid' ? 'bg-white text-purple-600 shadow' : 'text-gray-600 hover:bg-white/50'}`}>
            Lưới
          </button>
        </div>
      </div>

      {/* Results Grid */}
      {filtered.length > 0 ? (
        <>
          {/* Grid View */}
          {view === 'grid' && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post) => (
                <article key={post.slug} className="group relative bg-white/80 backdrop-blur-sm rounded-3xl border border-white/20 overflow-hidden hover:shadow-2xl hover:border-white/40 transition-all duration-500 hover:-translate-y-2">
                  <a href={`/blog/${post.slug}`} className="block">
                    <div className="aspect-video bg-gradient-to-br from-blue-50 to-emerald-50 overflow-hidden relative">
                      <img src={post.data.cover || '/default-thumbnail.webp'} alt={post.data.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-6">
                      {post.data.date && (
                        <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          <span>{new Date(post.data.date).toLocaleDateString('vi-VN')}</span>
                        </div>
                      )}
                      <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">{post.data.title}</h3>
                      {post.data.summary && <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed indent-0">{post.data.summary}</p>}
                    </div>
                  </a>
                </article>
              ))}
            </div>
          )}

          {/* List View */}
          {view === 'list' && (
            <div className="space-y-4">
              {filtered.map((post) => (
                <article key={post.slug} className="group relative bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden hover:shadow-xl hover:border-white/40 transition-all duration-300">
                  <a href={`/blog/${post.slug}`} className="flex flex-col sm:flex-row items-center">
                    <div className="w-full sm:w-48 flex-shrink-0">
                      <div className="aspect-video sm:aspect-square bg-gradient-to-br from-blue-50 to-emerald-50 overflow-hidden">
                        <img src={post.data.cover || '/default-thumbnail.webp'} alt={post.data.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    </div>
                    <div className="p-5 flex-grow">
                      {post.data.date && (
                        <div className="flex items-center gap-2 mb-2 text-xs text-gray-500">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          <span>{new Date(post.data.date).toLocaleDateString('vi-VN')}</span>
                        </div>
                      )}
                      <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">{post.data.title}</h3>
                      {post.data.summary && <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed indent-0">{post.data.summary}</p>}
                    </div>
                  </a>
                </article>
              ))}
            </div>
          )}
        </>
      ) : (
        /* Empty State */
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Không tìm thấy bài viết</h2>
          <p className="text-gray-500 mb-4">Không có bài viết nào khớp với từ khóa "{q}"</p>
          <button onClick={() => setQ('')} className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            Xóa tìm kiếm
          </button>
        </div>
      )}
    </div>
  );
}
