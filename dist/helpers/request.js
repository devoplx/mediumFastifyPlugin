'use strict';

var https = require('https');
var url = require('url');
var createError = require('@fastify/error');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var https__default = /*#__PURE__*/_interopDefault(https);
var createError__default = /*#__PURE__*/_interopDefault(createError);

const ERR_BAD_REQUEST = createError__default.default("ERR_INT_ERROR", "Error: %s", 500);
const request = (path, method = "GET", headers = {}) => {
  return new Promise((resolve, reject) => {
    headers = {
      ...headers,
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
    };
    let options = { method, headers };
    if (path.startsWith("/v1")) {
      options = { hostname: "api.medium.com", path, ...options };
    } else {
      const parsedUrl = new url.URL(path);
      options = {
        hostname: parsedUrl.hostname,
        path: `${parsedUrl.pathname}${parsedUrl.search}`,
        ...options
      };
    }
    const req = https__default.default.request(options, async (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        try {
          const data = await request(
            res.headers.location,
            method,
            headers
          );
          if (data instanceof Error)
            throw data;
          resolve(data);
        } catch (error) {
          reject(ERR_BAD_REQUEST(error));
        }
      } else {
        let data = "";
        let response = {
          statusCode: res.statusCode,
          data: {}
        };
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          try {
            const dataParsed = JSON.parse(data);
            response.data = dataParsed.data;
            resolve(response);
          } catch {
            response.data = data;
            resolve(response);
          }
        });
      }
    });
    req.on("error", (error) => {
      reject(ERR_BAD_REQUEST(error));
    });
    req.end();
  });
};

exports.request = request;
