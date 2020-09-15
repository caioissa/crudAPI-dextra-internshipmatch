const toArray = str => {
    try {
        return str.split(';');
    } catch (e) {
        return null;
    }
}

module.exports = { toArray };