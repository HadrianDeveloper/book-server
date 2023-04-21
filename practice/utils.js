

exports.queryFormatter = (query, value) => {
    const legend = {
        fiction: 'isFiction',
        books: 'bookId',
        authors: 'authorId',
        true: true,
        false: false
    };
    return [legend[query], legend[value]];
};

function makeUID(arr, keyName) {
    const allIds = arr
        .map((i) => i[keyName])
        .sort((a, b) => a - b)
        .reverse()
    return ++allIds[0];
}

exports.createBookObj = (newObj, currArr) => {
    return { bookId: makeUID(currArr, 'bookId'), ...newObj }
};