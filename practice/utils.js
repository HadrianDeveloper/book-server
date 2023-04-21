

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

