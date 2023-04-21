const { readFile } = require('fs');
const {createServer} = require('http');
const { queryFormatter } = require('./utils');

const server = createServer((req, res) => {
    const path = req.url.substring(5)

    if (path === 'books' || path === 'authors') fetchAll(path, packager, res);
    if (/(authors|books)\/[0-9]+$/.test(path)) fetchAnItem(path, packager, res);
    if (/(authors|books)\/[0-9]+\/author$/.test(path)) fetchAnItem(path, packager, res);
    if (/\?/.test(path)) fetchByQuery(path, packager, res);
});


const packager = (err, data, res) => {
    if (err) console.log(err);
    else {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.write(data);
        res.end();
    }
};

const fetchAll = (endpoint, callback, res) => {
    readFile(`${__dirname}/data/${endpoint}.json`, (err, json) => {
        err ? callback(err) : callback(null, json, res)
    })
};

const fetchAnItem = (endpoint, callback, res) => {
    const [bookReq, id, authReq] = endpoint.split('/');
    fetchAll((bookReq), (err, json) => {
        if (err) callback(err);
        else {
            const parsedBooks = JSON.parse(json);
            const [idName] = queryFormatter(bookReq);
            let target = parsedBooks.filter((i) => i[idName] === parseInt(id))
            
            if (authReq) {
                const authorId = target[0].authorId;
                return fetchAll(('authors'), (err, json) => {
                    if (err) callback(err);
                    else {
                        const parsedAuthors = JSON.parse(json);
                        let target = parsedAuthors.filter((a) => a.authorId === authorId)
                        callback(null, JSON.stringify(target), res)
                    }
                })
            }
            callback(null, JSON.stringify(target), res);
        }
    })
};

const fetchByQuery = (url, callback, res) => {
    const [endpoint, query, queryValue] = url.split(/=|\?/)
    fetchAll((endpoint), (err, data) => {
        if (err) callback(err);
        const parsed = JSON.parse(data);
        const [filtQ, filtVal] = queryFormatter(query, queryValue);
        const results = parsed.filter((book) => book[filtQ] === filtVal);
        packager(null, JSON.stringify(results), res);
    });
};

server.listen(5000, console.log('Listening!'));

