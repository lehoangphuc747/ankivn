export default {
  async fetch(request, env) {
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      const url = new URL(request.url);
      const pathParts = url.pathname.split('/').filter(Boolean);

      const contentType = pathParts[0]; // 'decks' or 'blog'
      const slug = pathParts.slice(1).join('/'); // Handle slugs with multiple parts
      const isDownload = url.pathname.endsWith('/download');
      const fullSlug = `${contentType}/${slug}`;

      // Validate path structure: /decks/slug or /blog/slug (with optional /download for decks only)
      if (pathParts.length < 2 || !['decks', 'blog'].includes(contentType)) {
        return new Response(JSON.stringify({
          error: 'Invalid path. Expected format: /decks/{slug} or /blog/{slug} (with optional /download for decks)'
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Validate download endpoint: only allowed for decks
      if (isDownload && contentType !== 'decks') {
        return new Response(JSON.stringify({
          error: 'Download tracking is only available for decks'
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Sanitize slug (basic protection against malicious input)
      if (!/^[a-zA-Z0-9\-_\/]+$/.test(slug)) {
        return new Response(JSON.stringify({
          error: 'Invalid slug format'
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      if (request.method === 'GET') {
        // Get current view/download count without incrementing
        const kvKey = isDownload ? `${fullSlug}_downloads` : fullSlug;
        let count = 0;
        try {
          const storedCount = await env.VIEW_KV.get(kvKey);
          count = storedCount ? parseInt(storedCount) : 0;
        } catch (error) {
          console.error('KV read error:', error);
          return new Response(JSON.stringify({
            error: 'Database read error',
            slug: fullSlug,
            type: isDownload ? 'download' : 'view'
          }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        return new Response(JSON.stringify({
          views: count,
          slug: fullSlug,
          contentType,
          type: isDownload ? 'download' : 'view'
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

      } else if (request.method === 'POST') {
        // Increment view or download count
        const kvKey = isDownload ? `${fullSlug}_downloads` : fullSlug;
        let currentCount = 0;
        try {
          const storedCount = await env.VIEW_KV.get(kvKey);
          currentCount = storedCount ? parseInt(storedCount) : 0;
        } catch (error) {
          console.error('KV read error:', error);
          return new Response(JSON.stringify({
            error: 'Database read error',
            slug: fullSlug,
            type: isDownload ? 'download' : 'view'
          }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        const newCount = currentCount + 1;
        const countType = isDownload ? 'downloads' : 'views';

        console.log(`Attempting to increment ${countType} for ${fullSlug} (${contentType})`);
        try {
          await env.VIEW_KV.put(kvKey, newCount.toString());
          console.log(`Successfully wrote ${newCount} to ${kvKey}`);
        } catch (error) {
          console.error('KV write error:', error);
          return new Response(JSON.stringify({
            error: 'Database write error',
            slug: fullSlug,
            type: isDownload ? 'download' : 'view'
          }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        return new Response(JSON.stringify({
          views: newCount,
          slug: fullSlug,
          contentType,
          type: isDownload ? 'download' : 'view',
          incremented: true
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Method not allowed
      return new Response(JSON.stringify({
        error: 'Method not allowed. Use GET to retrieve views/downloads or POST to increment views (or downloads for decks only)'
      }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    } catch (error) {
      console.error('Unexpected error:', error);
      return new Response(JSON.stringify({
        error: 'Internal server error'
      }), {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }
  },
};