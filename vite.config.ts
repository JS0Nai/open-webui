import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// /** @type {import('vite').Plugin} */
// const viteServerConfig = {
// 	name: 'log-request-middleware',
// 	configureServer(server) {
// 		server.middlewares.use((req, res, next) => {
// 			res.setHeader('Access-Control-Allow-Origin', '*');
// 			res.setHeader('Access-Control-Allow-Methods', 'GET');
// 			res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
// 			res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
// 			next();
// 		});
// 	}
// };

export default defineConfig({
	plugins: [sveltekit()],
	define: {
		APP_VERSION: JSON.stringify(process.env.npm_package_version),
		APP_BUILD_HASH: JSON.stringify(process.env.APP_BUILD_HASH || 'dev-build')
	},
	build: {
		sourcemap: true
	},
	worker: {
		format: 'es'
	},
	server: {
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:4568',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, '/api')
			},
			'/ws/socket.io': {
				target: 'http://127.0.0.1:4568',
				ws: true,  // This enables WebSocket proxying
				changeOrigin: true
			},
			'/ollama': {
				target: 'http://127.0.0.1:4568',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/ollama/, '/ollama')
			}
		},
	},
});
