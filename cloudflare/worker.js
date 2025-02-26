/**
 * Cloudflare Worker for Open WebUI
 * This worker proxies requests to the Mac Studio tunnel
 */

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const tunnelHostname = TUNNEL_HOSTNAME
  const url = new URL(request.url)
  
  // Forward the request to the Mac Studio tunnel
  const targetUrl = `https://${tunnelHostname}.amodel.org${url.pathname}${url.search}`
  
  // Clone the request with the new URL
  const modifiedRequest = new Request(targetUrl, {
    method: request.method,
    headers: request.headers,
    body: request.body,
    redirect: 'follow'
  })
  
  try {
    // Forward the request and return the response
    const response = await fetch(modifiedRequest)
    
    // Create a new response with the correct headers
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers
    })
  } catch (error) {
    // Return an error if the request fails
    return new Response(`Error connecting to backend: ${error.message}`, {
      status: 502,
      headers: { 'Content-Type': 'text/plain' }
    })
  }
}