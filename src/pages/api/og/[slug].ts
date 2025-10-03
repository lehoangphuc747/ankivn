import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const decks = await getCollection('decks');
  return decks.map((d) => ({ params: { slug: d.slug } }));
}

export const GET = async ({ params }: APIContext) => {
  const { slug } = params as { slug: string };
  
  try {
    // Get deck data
    const decks = await getCollection('decks');
    const deck = decks.find(d => d.slug === slug);
    
    const title = deck?.data.title || decodeURIComponent(slug || 'AnkiVN');
    const category = deck?.data.category || 'Deck';
    const subCategory = deck?.data.subCategory;
    
    // Truncate title if too long
    const displayTitle = title.length > 40 ? title.substring(0, 37) + '...' : title;
    
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='630' viewBox='0 0 1200 630'>
      <defs>
        <linearGradient id='bgGradient' x1='0%' y1='0%' x2='100%' y2='100%'>
          <stop offset='0%' style='stop-color:#3B82F6;stop-opacity:1' />
          <stop offset='100%' style='stop-color:#1E40AF;stop-opacity:1' />
        </linearGradient>
        <linearGradient id='cardGradient' x1='0%' y1='0%' x2='0%' y2='100%'>
          <stop offset='0%' style='stop-color:#FFFFFF;stop-opacity:0.95' />
          <stop offset='100%' style='stop-color:#F8FAFC;stop-opacity:0.95' />
        </linearGradient>
      </defs>
      
      <!-- Background -->
      <rect width='1200' height='630' fill='url(#bgGradient)' />
      
      <!-- Pattern overlay -->
      <defs>
        <pattern id='pattern' patternUnits='userSpaceOnUse' width='40' height='40'>
          <circle cx='20' cy='20' r='2' fill='white' opacity='0.1' />
        </pattern>
      </defs>
      <rect width='1200' height='630' fill='url(#pattern)' />
      
      <!-- Main card -->
      <rect x='80' y='80' width='1040' height='470' rx='20' fill='url(#cardGradient)' stroke='rgba(255,255,255,0.3)' stroke-width='2' />
      
      <!-- Logo and brand -->
      <g transform='translate(120, 120)'>
        <text x='0' y='30' font-family='system-ui, -apple-system, sans-serif' font-size='28' font-weight='700' fill='#1E293B'>AnkiVN</text>
      </g>
      
      <!-- Category badge -->
      <rect x='120' y='180' width='${Math.max(category.length * 12 + 40, 100)}' height='36' rx='18' fill='#EFF6FF' stroke='#3B82F6' stroke-width='1'/>
      <text x='140' y='202' font-family='system-ui, -apple-system, sans-serif' font-size='16' font-weight='600' fill='#1D4ED8'>${category}</text>
      
      ${subCategory ? `
      <rect x='${140 + Math.max(category.length * 12 + 40, 100)}' y='180' width='${subCategory.length * 12 + 40}' height='36' rx='18' fill='#F0FDF4' stroke='#22C55E' stroke-width='1'/>
      <text x='${160 + Math.max(category.length * 12 + 40, 100)}' y='202' font-family='system-ui, -apple-system, sans-serif' font-size='16' font-weight='600' fill='#15803D'>${subCategory}</text>
      ` : ''}
      
      <!-- Main title -->
      <text x='120' y='270' font-family='system-ui, -apple-system, sans-serif' font-size='48' font-weight='800' fill='#0F172A'>
        ${displayTitle}
      </text>
      
      <!-- Subtitle -->
      <text x='120' y='320' font-family='system-ui, -apple-system, sans-serif' font-size='24' font-weight='500' fill='#64748B'>
        Bộ thẻ Anki chất lượng cao
      </text>
      
      <!-- Stats -->
      <g transform='translate(120, 360)'>
        <!-- Download indicator -->
        <rect x='0' y='0' width='200' height='60' rx='12' fill='#ECFDF5' stroke='#22C55E' stroke-width='1'/>
        <text x='20' y='25' font-family='system-ui, -apple-system, sans-serif' font-size='14' font-weight='600' fill='#15803D'>MIỄN PHÍ</text>
        <text x='20' y='45' font-family='system-ui, -apple-system, sans-serif' font-size='16' font-weight='600' fill='#15803D'>Tải ngay</text>
      </g>
      
      <!-- Footer -->
      <text x='120' y='500' font-family='system-ui, -apple-system, sans-serif' font-size='18' font-weight='500' fill='#64748B'>
        ankivn.com • Chia sẻ deck Anki chất lượng
      </text>
    </svg>`;

    return new Response(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=86400',
      },
    });
    
  } catch (error) {
    console.error('Error generating OG image:', error);
    
    // Fallback to simple design
    const title = decodeURIComponent(slug || 'AnkiVN');
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='630'>
      <defs>
        <linearGradient id='g' x1='0' x2='1'>
          <stop stop-color='#0ea5e9' offset='0%'/>
          <stop stop-color='#22c55e' offset='100%'/>
        </linearGradient>
      </defs>
      <rect width='100%' height='100%' fill='url(#g)'/>
      <g transform='translate(60, 120)'>
        <text x='0' y='0' font-family='Inter,Segoe UI,Roboto,Arial,sans-serif' font-size='56' fill='#ffffff' font-weight='700'>AnkiVN</text>
        <text x='0' y='90' font-family='Inter,Segoe UI,Roboto,Arial,sans-serif' font-size='44' fill='#ffffff' font-weight='600'>${title}</text>
      </g>
    </svg>`;
    
    return new Response(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  }
};
