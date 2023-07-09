'use strict';

var https = require('https');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var https__default = /*#__PURE__*/_interopDefault(https);

const request = (path, method = "GET", headers = {}) => {
  return new Promise((resolve, reject) => {
    headers = { ...headers, "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36" };
    console.log("headers", headers);
    const options = {
      hostname: "api.medium.com",
      path,
      method,
      headers
    };
    const handleResponse = (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const redirectUrl = res.headers.location;
        request(redirectUrl, method, headers).then(console.log).catch(console.error);
      } else {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          console.log(data);
          resolve(data);
        });
      }
    };
    const req = https__default.default.request(options, (res) => {
      console.log(res.statusCode);
      handleResponse(res);
    });
    req.on("error", (err) => {
      reject(err);
    });
    req.end();
  });
};

exports.request = request;
