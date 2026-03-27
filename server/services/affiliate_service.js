exports.generateAmazonLink = (title) => {
    const keyword = title.replace(/ /g, '+');
    return `https://www.amazon.in/s?k=${keyword}&tag=dealbridge0d-21`;
};