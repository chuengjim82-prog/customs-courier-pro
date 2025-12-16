import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const API_BASE_URL = "http://8.134.102.174:8002/api";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const pageIndex = url.searchParams.get('pageIndex') || '1';
    const pageSize = url.searchParams.get('pageSize') || '10';

    console.log(`Fetching orders: pageIndex=${pageIndex}, pageSize=${pageSize}`);

    const response = await fetch(
      `${API_BASE_URL}/dynamic/order-base-info?pageIndex=${pageIndex}&pageSize=${pageSize}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache',
        },
      }
    );

    if (!response.ok) {
      console.error(`API error: ${response.status} ${response.statusText}`);
      throw new Error(`API请求失败: ${response.status}`);
    }

    const data = await response.json();
    console.log(`Fetched ${data.data?.items?.length || 0} orders`);

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in order-proxy function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
