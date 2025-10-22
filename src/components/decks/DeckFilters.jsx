import { useEffect, useMemo, useState } from 'react';

// Import emoji utilities
import { getCategoryEmoji, getSubCategoryEmoji } from '@/lib/utils';

// Utility function to normalize text (remove diacritics, lowercase)
function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^\w\s]/g, ' ') // Replace punctuation with spaces
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
}

// Advanced loose word search function
function looseWordSearch(query, title, tags = []) {
  console.log('looseWordSearch called with query:', query, 'title:', title, 'tags:', tags);
  if (!query.trim()) return { matches: true, score: 0, highlights: [] };

  const normalizedQuery = normalizeText(query);
  const normalizedTitle = normalizeText(title);
  const queryWords = normalizedQuery.split(/\s+/).filter(word => word.length > 0);

  // Filter out very short words (1 char) unless they're numbers or special chars
  const filteredQueryWords = queryWords.filter(word =>
    word.length > 1 || /^\d+$/.test(word) || /[^\w\s]/.test(word)
  );

  console.log('filteredQueryWords:', filteredQueryWords);

  if (filteredQueryWords.length === 0) return { matches: false, score: 0, highlights: [] };

  let totalScore = 0;
  let allWordsMatched = true;
  const highlights = [];

  // Check each query word against title and tags
  for (const queryWord of filteredQueryWords) {
    let wordMatched = false;
    let bestScore = 0;
    let bestMatch = '';

    // Split title into words for matching
    const titleWords = normalizedTitle.split(/\s+/);

    for (const titleWord of titleWords) {
      if (titleWord.includes(queryWord)) {
        wordMatched = true;

        // Calculate match score
        let score = 1; // Base score for partial match

        if (titleWord === queryWord) {
          score = 10; // Exact match
        } else if (titleWord.startsWith(queryWord)) {
          score = 5; // Starts with match
        } else if (queryWord.length >= 3) {
          score = 2; // Contains match for longer words
        }

        if (score > bestScore) {
          bestScore = score;
          // Store the original word from title, not normalized
          const originalIndex = normalizedTitle.indexOf(titleWord);
          bestMatch = title.split(/\s+/)[titleWords.indexOf(titleWord)];
        }
      }
    }

    // Also check tags
    for (const tag of tags) {
      const normalizedTag = normalizeText(tag);
      if (normalizedTag.includes(queryWord)) {
        wordMatched = true;
        let score = 1;

        if (normalizedTag === queryWord) {
          score = 8; // Exact match in tag
        } else if (normalizedTag.startsWith(queryWord)) {
          score = 4; // Starts with match in tag
        }

        if (score > bestScore) {
          bestScore = score;
          bestMatch = tag; // Use original tag text
        }
      }
    }

    if (wordMatched) {
      totalScore += bestScore;
      highlights.push(bestMatch);
    } else {
      allWordsMatched = false;
    }
  }

  // Bonus for consecutive words in title
  const queryPhrase = filteredQueryWords.join(' ');
  if (normalizedTitle.includes(queryPhrase)) {
    totalScore += 15; // Significant bonus for consecutive matches
  }

  // Bonus for shorter titles (more relevant)
  const titleLength = title.split(/\s+/).length;
  if (titleLength <= 10) {
    totalScore += 2;
  }

  const result = {
    matches: allWordsMatched,
    score: totalScore,
    highlights
  };
  console.log('looseWordSearch result:', result);
  return result;
}

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
    console.log('Filtering with q:', q, 'items length:', items.length);
    let arr = items.map(item => ({
      ...item,
      searchResult: q ? looseWordSearch(q, item.data.title, item.data.tags) : { matches: true, score: 0, highlights: [] }
    }));

    // Filter by search query
    if (q) {
      console.log('Before search filter:', arr.length);
      arr = arr.filter(item => item.searchResult.matches);
      console.log('After search filter:', arr.length);
    }

    // Filter by category and subcategory
    if (category) arr = arr.filter((d) => d.data.category === category);
    if (sub) arr = arr.filter((d) => d.data.subCategory === sub);

    // Sort by date
    if (sort === 'date') {
      // Newest first (descending)
      arr = arr.sort((a, b) => new Date(b.data.date || '1970-01-01') - new Date(a.data.date || '1970-01-01'));
    } else if (sort === 'date-asc') {
      // Oldest first (ascending)
      arr = arr.sort((a, b) => new Date(a.data.date || '1970-01-01') - new Date(b.data.date || '1970-01-01'));
    }

    console.log('Final filtered length:', arr.length, 'sort:', sort);
    return arr;
  }, [items, q, category, sub, sort]);

  // Dispatch filter change event for client-side filtering
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('Dispatching deckFiltersChanged event with filtered length:', filtered.length, 'query:', q);
      window.dispatchEvent(new CustomEvent('deckFiltersChanged', {
        detail: { filtered, query: q }
      }));
    }
  }, [filtered, q]);

  // Derive unique categories/subs
  const categories = useMemo(() => Array.from(new Set(items.map((d) => d.data.category).filter(Boolean))), [items]);
  const subs = useMemo(
    () => Array.from(new Set(items.filter((d) => !category || d.data.category === category).map((d) => d.data.subCategory).filter(Boolean))),
    [items, category]
  );

  return (
    <div className="space-y-6">
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
                {getCategoryEmoji(c)} {c}
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
            onChange={(e) => {
              const selectedSub = e.target.value;
              setSub(selectedSub);

              // Auto-select category when subcategory is selected
              if (selectedSub) {
                const deckWithSub = items.find(d => d.data.subCategory === selectedSub);
                if (deckWithSub && deckWithSub.data.category) {
                  setCategory(deckWithSub.data.category);
                }
              }
            }}
          >
            <option value="">🎯 Tất cả phân nhóm</option>
            {subs.map((s) => (
              <option key={s} value={s}>
                {getSubCategoryEmoji(s)} {s}
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
            <option value="date-asc">📅 Cũ nhất</option>
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

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Gõ từ rời: 4000 co ban, tieng anh, toeic..."
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
          onChange={(e) => {
            console.log('Search input changed:', e.target.value);
            setQ(e.target.value);
          }}
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

      {/* No Results Suggestions */}
      {q && filtered.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-4">
          <div className="flex items-start gap-3">
            <svg className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div>
              <h3 className="text-sm font-medium text-yellow-800 mb-1">
                Không tìm thấy bộ thẻ nào phù hợp
              </h3>
              <p className="text-sm text-yellow-700 mb-2">
                Hãy thử các gợi ý sau để tìm kiếm tốt hơn:
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                <button
                  onClick={() => setQ('4000 từ cơ bản')}
                  className="text-xs bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-3 py-1 rounded-md transition-colors"
                >
                  "4000 từ cơ bản"
                </button>
                <button
                  onClick={() => setQ('tiếng anh')}
                  className="text-xs bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-3 py-1 rounded-md transition-colors"
                >
                  "tiếng anh"
                </button>
                <button
                  onClick={() => setQ('toeic')}
                  className="text-xs bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-3 py-1 rounded-md transition-colors"
                >
                  "toeic"
                </button>
                <button
                  onClick={() => setQ('jlpt')}
                  className="text-xs bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-3 py-1 rounded-md transition-colors"
                >
                  "jlpt"
                </button>
                <button
                  onClick={() => setQ('ngữ pháp')}
                  className="text-xs bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-3 py-1 rounded-md transition-colors"
                >
                  "ngữ pháp"
                </button>
              </div>
              <p className="text-sm text-yellow-700">
                💡 <strong>Mẹo:</strong> Chọn <strong>Chủ đề</strong> và <strong>Danh mục</strong> ở trên để lọc kết quả, hoặc thử tìm với từ khóa ngắn hơn.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
