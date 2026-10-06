const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');

process.env.PORT = '0';
const app = require('./index');

async function request(path, options = {}) {
  return new Promise((resolve, reject) => {
    const server = app.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      const req = http.request({
        hostname: '127.0.0.1',
        port,
        path,
        ...options
      }, (res) => {
        let body = '';
        res.setEncoding('utf8');
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          server.close();
          resolve({ status: res.statusCode, body });
        });
      });

      req.on('error', (error) => {
        server.close();
        reject(error);
      });

      if (options.body) req.write(options.body);
      req.end();
    });
  });
}

test('GET /api/projects returns a project array', async () => {
  const response = await request('/api/projects');

  assert.equal(response.status, 200);
  const projects = JSON.parse(response.body);
  assert.ok(Array.isArray(projects));
  assert.ok(projects.length > 0);
  assert.equal(typeof projects[0].title, 'string');
  assert.equal(typeof projects[0].image, 'string');
});
