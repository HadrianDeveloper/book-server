const { readFile, writeFile } = require('node:fs/promises');
const http = require('node:http');

const server = http.createServer((req, res) => {
    const {url, method} = req;
    if (method === 'GET') {
        if (url === '/api') sendResponse(res, 'Hello world!', 'msg');
        if (url.startsWith('/api/books')) fetchAllItems(req, res);
        if (url.startsWith('/api/authors')) fetchAllItems(req, res); 
    } else if (method === 'POST') {
        if (method === 'POST') {
            if (url === '/api/books') compileInput(req, res)
        }
    };
});

const sendResponse = (res, parsedObj, title) => {
    res.setHeader('Content-Type', 'application/json');
    res.status = 200
    res.write(JSON.stringify({[title]: parsedObj}));
    res.end();
};

const filterItem = (res, parsedArr, header, id, extraFilter) => {
    const idName = header === 'authors' ? 'authorId' : 'bookId';
    const targetItem = parsedArr.filter((i) => i[idName] === parseInt(id));
    if (!extraFilter) sendResponse(res, targetItem, header);
    else {
        readFile(`${__dirname}/data/authors.json`, 'utf8')
            .then((authorsObj) => {
                const authorId = targetItem[0].authorId;
                filterItem(res, JSON.parse(authorsObj), 'authors', authorId)
            })
            .catch((err) => console.log(err))
    }
};

const fetchAllItems = (req, res) => {
    const splitUrl = req.url.split('/');
    readFile(`${__dirname}/data/${splitUrl[2]}.json`, 'utf8')
        .then((content) => {
            if (splitUrl.length === 3) {
                sendResponse(res, JSON.parse(content), splitUrl[2])
            } else if (splitUrl.length === 4) {
                filterItem(res, JSON.parse(content), splitUrl[2], splitUrl[3])
            } else {
                filterItem(res, JSON.parse(content), splitUrl[2], splitUrl[3], splitUrl[4])
            }
        })
        .catch((err) => console.log(err))
};

const idCreator = (arr) => {
    const existingIds = arr
        .map((book) => book.bookId)
        .sort((a, b) => a - b).reverse()
    return (existingIds[0] + 1);
};

const handlePost = (input, res) => {
    readFile(`${__dirname}/data/books.json`, 'utf8')
        .then((books) => {
            let parsedList = JSON.parse(books)
            const newId = idCreator(parsedList)
            parsedList.push({bookId: newId, ...input})
            return writeFile(`${__dirname}/data/books.json`, JSON.stringify(parsedList, null, 2))
        })
        .then(() => {
            res.statusCode = 201
            res.write(JSON.stringify({ msg: 'Success!'}))
            res.end()
        })
        .catch((err) => console.log(err))
};


const compileInput = (req, res) => {
    let body = ''

    req.on('data', (chunk) => {
        body += chunk.toString()
    });
    req.on('end', () => {
        const parsedInput = JSON.parse(body);
        handlePost(parsedInput, res)
    });
    req.on('error', (err) => {
        console.log(err)
    });
}



server.listen(8000, (err) => {
    console.log(err ? err : 'Listening for requests...')
});
