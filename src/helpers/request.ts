import https, { RequestOptions } from 'https';
import { URL } from 'url';

const request = (path: string, method: string = "GET", headers: { [key: string]: string } = {}): Promise<string> | Error => {
  return new Promise((resolve, reject) => {
    headers = { ...headers, "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36" };

    let options: RequestOptions = { method, headers };

    if (path.startsWith("/v1")) {
      options = { hostname: 'api.medium.com', path, ...options };
    } else {
      const parsedUrl = new URL(path);
      options = { hostname: parsedUrl.hostname, path: `${parsedUrl.pathname}${parsedUrl.search}`, ...options };
    }

    const req = https.request(options, async (res: any) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        try {
          resolve(await request(res.headers.location, method, headers) as string);
        } catch (error) {
          reject(error as Error);
        }
      } else {
        let data = "";
        res.on("data", (chunk: any) => {
          data += chunk;
        });
        res.on("end", () => {
          resolve(data);
        });
      }
    });

    req.on("error", (err) => {
      reject(err);
    });

    req.end();
  });
};

export { request };