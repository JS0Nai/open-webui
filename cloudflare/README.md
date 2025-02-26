# Open WebUI Cloudflare Workers Setup

This directory contains the Cloudflare Workers setup to proxy requests to your MacStudio Cloudflare tunnel.

## Structure

- `worker.js`: The main worker script that proxies requests to the MacStudio tunnel
- `dist/`: Static assets that are served by the worker
- `README.md`: This file

## Configuration

The worker is configured in the `wrangler.toml` file in the root directory. The following environment variables are used:

- `TUNNEL_HOSTNAME`: The hostname of the Cloudflare tunnel (MacStudio)
- `APP_DOMAIN`: The domain name for the app (openwebui.amodel.org)

## Deployment

The worker is deployed using GitHub Actions. The workflow is defined in `.github/workflows/deploy-cloudflare.yml`. It deploys the worker to Cloudflare Workers whenever changes are pushed to the main branch.

### Required Secrets

To deploy the worker, you need to set the following secrets in your GitHub repository:

- `CF_API_TOKEN`: Cloudflare API token with Workers access
- `CF_ACCOUNT_ID`: Cloudflare account ID

## Local Development

To test the worker locally, you can use the Wrangler CLI:

```bash
npm install -g wrangler
wrangler dev
```

## How It Works

The worker forwards all requests to your MacStudio Cloudflare tunnel. This allows you to run the Open WebUI server on your Mac Studio while exposing it to the internet through Cloudflare Workers.