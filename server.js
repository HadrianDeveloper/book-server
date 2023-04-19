const { readFile } = require('node:fs/promises');
const http = require('node:http');

const server = http.createServer((req, res) => {
    const {url, method} = req;
    if (method === 'GET') {
        if (url === '/api') sendResponse(res, 'Hello world!', 'msg')
        if (url === '/api/books') fetchAll(req, res);
        if (url === '/api/authors') fetchAll(req, res); 
    }
});

const fetchAll = (req, res) => {
    const { url } = req; // =/api/books
    return readFile(`${__dirname}/data/${url.slice(5)}.json`, 'utf8')
        .then((content) => sendResponse(res, JSON.parse(content), url.slice(5)))
        .catch((err) => console.log(err))
};

const sendResponse = (res, parsedObj, title) => {
    res.setHeader('Content-Type', 'application/json');
    res.status = 200
    res.write(JSON.stringify({[title]: parsedObj}));
    res.end();
}

server.listen(8000, (err) => {
    console.log(err ? err : 'Listening for requests...')
});
