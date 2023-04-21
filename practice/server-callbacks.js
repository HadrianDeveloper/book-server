const { readFile, writeFile } = require('fs');
const {createServer} = require('http');
const { queryFormatter, makeUID, createBookObj } = require('./utils');

const server = createServer((req, res) => {
    const path = req.url.substring(5)

    if (req.method === 'GET') {
        if (path === 'books' || path === 'authors') fetchAll(path, packager, res);
        if (/(authors|books)\/[0-9]+$/.test(path)) fetchAnItem(path, packager, res);
        if (/(authors|books)\/[0-9]+\/author$/.test(path)) fetchAnItem(path, packager, res);
        if (/\?/.test(path)) fetchByQuery(path, packager, res);
    } else {
        if (path === 'books') postABook(req, packager, res)
    }  
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
        let parsedArr = JSON.parse(json);
        const [idName] = queryFormatter(bookReq);
        let targetItem = parsedArr.filter((i) => i[idName] === parseInt(id))
        if (err) {
            callback(err);
        } else if (!authReq) {
            callback(null, JSON.stringify(targetItem), res);
        } else {
            const newEndpoint = `authors/${targetItem[0].authorId}`
            fetchAnItem(newEndpoint, callback, res)
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

const postABook = (req, cb, res) => {
    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString()
    });
    req.on('error', (err) => {
        cb(err)
    });
    req.on('end', () => {
        const parsedObj = JSON.parse(body);
        fetchAll(('books'), (err, json) => {
            const parsedArr = JSON.parse(json);
            const objToPush = createBookObj(parsedObj, parsedArr);
            parsedArr.push(objToPush)
            writeFile(`${__dirname}/data/books.json`, JSON.stringify(parsedArr, null, 2), (err) => {
                err ? cb(err) : cb(null, JSON.stringify({msg: 'Book saved!'}), res)
            })
        })
    });
};


server.listen(5000, console.log('Listening!'));

