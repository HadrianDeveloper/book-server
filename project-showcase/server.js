const {createServer} = require('node:http');
const { fetchAll } = require('./controllers');

const server = createServer((req, res) => {
    const {url, method} = req;
    const splitUrl = url.split('/')

    if (splitUrl.length === 3)fetchAll(req, res);

});


server.listen(8000, err => {
    console.log(err ? err : 'Listening...')
});