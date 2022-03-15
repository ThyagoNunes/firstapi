const http = require('http');
const { URL } = require('url');

const routes = require('./routes');
const bodyParser = require('./helpers/bodyParser');

const app = http.createServer((request, response) => {
  const parsedUrl = new URL(`http://localhost:3333${request.url}`);
  console.log(`Request Method: ${request.method} | Endpoint: ${request.url}`);
  console.log(parsedUrl);

  let { pathname } = parsedUrl;
  let id = null;

  const splitEndPoint = pathname.split('/').filter(Boolean);
  if (splitEndPoint.length > 1) {
    pathname = `/${splitEndPoint[0]}/:id`;
    id = splitEndPoint[1];
  }

  const route = routes.find((routeObj) => (
    routeObj.endpoint === pathname && routeObj.method === request.method
  ));

  if (route) {
    request.params = { id };
    request.query = Object.fromEntries(parsedUrl.searchParams);
    response.send = (statusCode, body) => {
      response.writeHead(statusCode, { 'content-type': 'application/json' });
      response.end(JSON.stringify(body));
    };

    if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
      bodyParser(request, () => route.handler(request, response));
    } else {
      route.handler(request, response);
    }
  } else {
    response.writeHead(404, { 'content-type': 'text/html' });
    response.end(`Cannot ${request.method} ${request.url}`);
  }
});

app.listen(3333, () => console.log('🔥🖥  Server starter at http://localhost:3333 🖥 🔥 '));
