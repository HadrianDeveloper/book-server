const { readFile } = require("fs/promises")


exports.selectAll = (url) => {
    const [, , path] = url.split('/')
    return readFile(`${__dirname}/data/${path}.json`, 'utf8')
        .then((allItems) => JSON.parse(allItems))
        .catch((err) => console.log(err))
};