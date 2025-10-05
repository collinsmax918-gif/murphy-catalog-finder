const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

Deno.serve(async (req: Request) => {
  const url = new URL(req.url);

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const target = url.searchParams.get("url");
  if (!target) {
    return new Response("Missing url parameter", { status: 400, headers: corsHeaders });
  }

  try {
    const upstream = await fetch(target, {
      redirect: "follow",
      headers: {
        // Some hosts block hotlinking based on Referer; set none
        "Referer": "",
        // A common UA to avoid simplistic bot blocks
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept": "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
      },
    });

    if (!upstream.ok || !upstream.body) {
      return new Response("Failed to fetch image", {
        status: 502,
        headers: { ...corsHeaders, "Cache-Control": "no-store" },
      });
    }

    const contentType = upstream.headers.get("content-type") ?? "image/jpeg";

    const headers = new Headers({
      ...corsHeaders,
      "Content-Type": contentType,
      // Cache at the edge/CDN for a day
      "Cache-Control": "public, s-maxage=86400, max-age=3600, stale-while-revalidate=86400",
    });

    return new Response(upstream.body, { headers });
  } catch (_err) {
    return new Response("Error proxying image", {
      status: 500,
      headers: { ...corsHeaders, "Cache-Control": "no-store" },
    });
  }
});
