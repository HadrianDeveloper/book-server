const { readFile } = require('node:fs/promises');
const http = require('node:http');

const server = http.createServer((req, res) => {
    const {url, method} = req;

    if (method === 'GET') {
        if (url === '/api') {
            res.setHeader('Content-Type', 'application/json');
            res.status = 200
            res.write(JSON.stringify({msg: 'Hello world!'}));
            res.end();
        }
        if (url === '/api/books') {
            fetchAll('data/books.json')
                .then((data) => {
                    res.setHeader('Content-Type', 'application/json');
                    res.status = 200
                    res.write(JSON.stringify({books: data}));
                    res.end();
                })
        }
        if (url === '/api/authors') {
            fetchAll('data/authors.json')
                .then((data) => {
                    res.setHeader('Content-Type', 'application/json');
                    res.status = 200
                    res.write(JSON.stringify({authors: data}));
                    res.end();
                })
        }
    }
});

const fetchAll= (dbPath) => {
    return readFile(`${__dirname}/${dbPath}`, 'utf8')
        .then((res) => JSON.parse(res))
        .catch((err) => console.log(err))
};


server.listen(8000, (err) => {
    console.log(err ? err : 'Listening for requests...')
});
