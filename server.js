const { readFile } = require('node:fs/promises');
const http = require('node:http');

const server = http.createServer((req, res) => {
    const {url, method} = req;
    if (method === 'GET') {
        if (url === '/api') sendResponse(res, 'Hello world!', 'msg')
        if (url.startsWith('/api/books')) fetchAllItems(req, res);
        if (url.startsWith('/api/authors')) fetchAllItems(req, res); 
    }
});



const sendResponse = (res, parsedObj, title) => {
    res.setHeader('Content-Type', 'application/json');
    res.status = 200
    res.write(JSON.stringify({[title]: parsedObj}));
    res.end();
};

const filterItem = (res, parsedArr, id, header) => {
    const idName = header === 'authors' ? 'authorId' : 'bookId';
    const targetItem = parsedArr.filter((i) => i[idName] === parseInt(id));
    sendResponse(res, targetItem, header);
}

const fetchAllItems = (req, res) => {
    const splitUrl = req.url.split('/');
    readFile(`${__dirname}/data/${splitUrl[2]}.json`, 'utf8')
        .then((content) => {
            if (splitUrl.length === 3) {
                sendResponse(res, JSON.parse(content), splitUrl[2])
            } else if (splitUrl.length === 4) {
                filterItem(res, JSON.parse(content), splitUrl[3], `${splitUrl[2]}`)
            }
        })
        .catch((err) => console.log(err))
};

server.listen(8000, (err) => {
    console.log(err ? err : 'Listening for requests...')
});
