const { selectAll } = require("./models")
const { sendResponse } = require("./utils")

exports.fetchAll = (req, res) => {
    selectAll(req.url)
        .then((results) => sendResponse(res, results))
        .catch((err) => console.log(err))
};