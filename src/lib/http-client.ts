import https from 'node:https';
import zlib from 'node:zlib';

export interface HttpRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: string | Buffer;
  connectTimeoutMs?: number;
  totalTimeoutMs?: number;
}

export async function safeHttpsRequest(url: string, options: HttpRequestOptions = {}): Promise<{ status: number; body: Buffer; headers: Record<string, string> }> {
  const parsed = new URL(url);
  const method = options.method || 'GET';
  const headers = {
    'User-Agent': 'AvitaryAnime/1.0 (Layero Hosting)',
    'Accept-Encoding': 'gzip, deflate, br',
    ...options.headers,
  };

  const connectTimeoutMs = options.connectTimeoutMs || 2200;
  const totalTimeoutMs = options.totalTimeoutMs || 4200;

  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: parsed.hostname,
        port: parsed.port || 443,
        path: parsed.pathname + parsed.search,
        method,
        headers,
        timeout: totalTimeoutMs,
      },
      (res) => {
        const chunks: Buffer[] = [];
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () => {
          const body = Buffer.concat(chunks);
          let finalBody = body;
          const encoding = res.headers['content-encoding'];
          if (encoding === 'gzip') {
            finalBody = zlib.gunzipSync(body);
          } else if (encoding === 'deflate') {
            finalBody = zlib.inflateSync(body);
          } else if (encoding === 'br') {
            // Fallback if brotli not available, or use zlib if node supports it
            try {
              finalBody = zlib.brotliDecompressSync(body);
            } catch (e) {
              // ignore
            }
          }
          resolve({ status: res.statusCode!, body: finalBody, headers: res.headers as Record<string, string> });
        });
      }
    );

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy(new Error('Request timeout'));
      reject(new Error('Request timeout'));
    });

    // Connect timeout
    const connectTimer = setTimeout(() => {
      req.destroy(new Error('Connect timeout'));
      reject(new Error('Connect timeout'));
    }, connectTimeoutMs);

    req.on('connect', () => clearTimeout(connectTimer));

    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
}
