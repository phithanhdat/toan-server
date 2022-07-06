
const http = require('http');

const app = require('./app');

const server = http.createServer(app);
const port = 5001;
server.listen(port);

console.debug('Server listening on port ' + port);