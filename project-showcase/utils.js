

exports.sendResponse = (res, results, status) => {
    res.setHeader('Content-Type', 'application/json');
    res.status = status || 200;   
    res.write(JSON.stringify(results))
    res.end()
};
