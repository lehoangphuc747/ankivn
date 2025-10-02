import { useEffect, useMemo, useRef, useState } from 'react';

/**
 * Props:
 * - images?: {src:string, alt?:string}[]
 * - selector?: string (optional CSS selector to scan DOM for <img>)
 */
export default function ImageViewer({ images = [], selector }) {
  const [list, setList] = useState(images);
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const modalRef = useRef(null);
  const imgRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [drag, setDrag] = useState(null);

  // If selector is provided, scan on mount for images
  useEffect(() => {
    if (selector) {
      const nodes = Array.from(document.querySelectorAll(selector));
      const scanned = nodes
        .filter((el) => el instanceof HTMLImageElement)
        .map((img, i) => ({ src: img.src, alt: img.alt || `image-${i + 1}` }));
      if (scanned.length) setList(scanned);
    }
  }, [selector]);

  // Deep link via hash #image-i
  useEffect(() => {
    const hash = window.location.hash;
    const m = hash.match(/#image-(\d+)/);
    if (m) {
      const n = parseInt(m[1], 10) - 1;
      if (!Number.isNaN(n) && n >= 0 && n < list.length) {
        setIdx(n);
        setOpen(true);
      }
    }
  }, [list.length]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (!open) return;
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'ArrowRight') setIdx((i) => Math.min(i + 1, list.length - 1));
      if (e.key === 'ArrowLeft') setIdx((i) => Math.max(i - 1, 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, list.length]);

  // Zoom with wheel
  const onWheel = (e) => {
    e.preventDefault();
    const delta = -e.deltaY * 0.0015;
    setScale((s) => Math.max(0.5, Math.min(5, s + delta)));
  };

  // Drag to pan
  const onMouseDown = (e) => {
    setDrag({ x: e.clientX, y: e.clientY, start: { ...offset } });
  };
  const onMouseMove = (e) => {
    if (!drag) return;
    setOffset({ x: drag.start.x + (e.clientX - drag.x), y: drag.start.y + (e.clientY - drag.y) });
  };
  const onMouseUp = () => setDrag(null);

  useEffect(() => {
    if (!open) {
      setScale(1);
      setOffset({ x: 0, y: 0 });
    }
  }, [open]);

  const openAt = (i) => {
    setIdx(i);
    setOpen(true);
    const id = i + 1;
    history.replaceState(null, '', `#image-${id}`);
  };

  return (
    <div className="mt-8">
      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {list.map((img, i) => (
          <button 
            key={i} 
            className="group relative rounded-lg overflow-hidden bg-gray-100 aspect-video hover:shadow-lg transition-all duration-200" 
            onClick={() => openAt(i)}
          >
            <img 
              src={img.src} 
              alt={img.alt || ''} 
              loading="lazy" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" 
            />
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90 backdrop-blur-sm rounded-full p-3">
                <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Image counter badge */}
            <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
              {i + 1}
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      {open && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm text-white flex items-center justify-center"
          onClick={(e) => {
            if (e.target === modalRef.current) setOpen(false);
          }}
        >
          {/* Close Button */}
          <button 
            className="absolute top-4 right-4 z-10 p-2 hover:bg-white/10 rounded-full transition-colors" 
            onClick={() => setOpen(false)}
            aria-label="Đóng"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image Counter */}
          <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
            <span className="text-sm">{idx + 1} / {list.length}</span>
          </div>

          {/* Previous Button */}
          {list.length > 1 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 hover:bg-white/10 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setIdx((i) => Math.max(0, i - 1))}
              disabled={idx === 0}
              aria-label="Ảnh trước"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Image Container */}
          <div
            className="max-h-[90vh] max-w-[90vw] overflow-hidden cursor-grab active:cursor-grabbing"
            onWheel={onWheel}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
          >
            <img
              ref={imgRef}
              src={list[idx]?.src}
              alt={list[idx]?.alt || ''}
              style={{ 
                transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                transition: offset.x === 0 && offset.y === 0 ? 'transform 0.2s ease-out' : 'none'
              }}
              className="select-none pointer-events-none max-h-[90vh] max-w-[90vw] object-contain"
            />
          </div>

          {/* Zoom Controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-lg p-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setScale(s => Math.max(0.5, s - 0.2));
              }}
              className="p-2 hover:bg-white/10 rounded transition-colors disabled:opacity-50"
              disabled={scale <= 0.5}
              aria-label="Thu nhỏ"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            
            <span className="text-sm min-w-[3rem] text-center">
              {Math.round(scale * 100)}%
            </span>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                setScale(s => Math.min(3, s + 0.2));
              }}
              className="p-2 hover:bg-white/10 rounded transition-colors disabled:opacity-50"
              disabled={scale >= 3}
              aria-label="Phóng to"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
            
            <div className="w-px h-6 bg-gray-400 mx-1" />
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                setScale(1);
                setOffset({ x: 0, y: 0 });
              }}
              className="p-2 hover:bg-white/10 rounded transition-colors"
              aria-label="Khôi phục"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16v16H4z" />
              </svg>
            </button>
          </div>

          {/* Next Button */}
          {list.length > 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 hover:bg-white/10 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setIdx((i) => Math.min(list.length - 1, i + 1))}
              disabled={idx === list.length - 1}
              aria-label="Ảnh tiếp theo"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Thumbnail Strip */}
          {list.length > 1 && (
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2 max-w-[80vw] overflow-x-auto p-2 bg-black/30 backdrop-blur-sm rounded-lg">
              {list.map((img, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIdx(i);
                  }}
                  className={`flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-all ${
                    i === idx 
                      ? 'border-white shadow-lg' 
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img
                    src={img.src}
                    alt={`Thumbnail ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
