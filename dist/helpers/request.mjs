import https from 'https';
import { URL } from 'url';

const request = (path, method = "GET", headers = {}) => {
  return new Promise((resolve, reject) => {
    headers = { ...headers, "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36" };
    let options = { method, headers };
    if (path.startsWith("/v1")) {
      options = { hostname: "api.medium.com", path, ...options };
    } else {
      const parsedUrl = new URL(path);
      options = { hostname: parsedUrl.hostname, path: `${parsedUrl.pathname}${parsedUrl.search}`, ...options };
    }
    const req = https.request(options, async (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        try {
          resolve(await request(res.headers.location, method, headers));
        } catch (error) {
          reject(error);
        }
      } else {
        let data = "";
        res.on("data", (chunk) => {
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
