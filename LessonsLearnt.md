

### Sending data from JSON
#### data conversion
Can be sent raw without any conversions or after JSON.stringify()
Cannot be sent after JSON.parse() - TYPEERROR
Can be sent after .toString() but object contents are converted into "objectObject"

    `const server = createServer((req, res) => {
        readFile(filePath, 'utf8')
            .then((data) => {
                res.setHeader('Content-Type', 'text/html');
                res.statusCode = 200;
                res.write(data);
                res.end();
            })
            .catch((err) => console.log('whoops?!'))
    });`

#### encoding
Default encoding value = null - returns a 'buffer' object
No need to encode if sending data _raw_ to client - ie can be excluded from above example

    `readFile(filePath, 'utf8)`


#### Splitting a string by multiple delimiters
.split accepts a standard regex:

    const [endpoint, query, queryValue] = url.split(/=|\?/) 
