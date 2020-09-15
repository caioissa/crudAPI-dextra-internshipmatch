const toString = array => {
    try {
        return array.join(';');
    } catch (e) {
        return null;
    }
}

module.exports = { toString };