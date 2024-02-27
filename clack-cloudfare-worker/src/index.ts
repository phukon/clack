/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {

  clackkv: KVNamespace;
	SECURITY_KEY: string;
  API_HOST: string;
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
	//
	// Example binding to a Queue. Learn more at https://developers.cloudflare.com/queues/javascript-apis/
	// MY_QUEUE: Queue;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {

    if (!isAuthorized(request, env)) {
      return new Response('Unauthorized', { status: 401 });
    }

    
		const reqUrl = new URL(request.url);
		const key = reqUrl.searchParams.get('key');
		const getAllFromUser = reqUrl.searchParams.get('getAllFromUser');

		if (getAllFromUser) {
			return await getAllKeys(env, getAllFromUser);
		}

		if (!key) {
			return new Response('No key provided', { status: 400 });
		}

		switch (request.method) {
			case 'PUT':
				return await handlePut(request, env, key);
			case 'DELETE':
				return await handleDelete(env, key);
			default:
				return await handleGet(env, key);
		}
	},
};

// Auth
function isAuthorized(request: Request, env: Env): boolean {
	return request.headers.get('X-Custom-Auth-Key') === env.SECURITY_KEY;
}

// CRUD
// key signature = <userEmail: string>-<userId: string>

async function getAllKeys(env: Env, prefix: string): Promise<Response> {
	const keys = await env.clackkv.list({ prefix: prefix + '-' });
	const keyValuePairs: Record<string, string | null> = {};
	for (const key of keys.keys) {
		keyValuePairs[key.name] = await env.clackkv.get(key.name);
	}
	return new Response(JSON.stringify(keyValuePairs));
}

async function handlePut(request: Request, env: Env, key: string): Promise<Response> {
	const body = await request.text();
	await env.clackkv.put(key, body);
	return new Response('OK');
}

async function handleDelete(env: Env, key: string): Promise<Response> {
	const data = await env.clackkv.get(key);
	if (!data) {
		return new Response('Not found', { status: 404 });
	}
	await env.clackkv.put('archived-' + key, data);
	await env.clackkv.delete(key);
	return new Response('OK');
}

async function handleGet(env: Env, key: string): Promise<Response> {
	const data = await env.clackkv.get(key);
	if (!data) {
		return new Response('Not found', { status: 404 });
	}
	return new Response(data);
}