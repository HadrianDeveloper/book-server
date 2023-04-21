

exports.queryFormatter = (query, value) => {
    const legend = {
        fiction: 'isFiction',
        true: true,
        false: false
    };
    return [legend[query], legend[value]];
}