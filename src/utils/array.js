const toArray = str => {
    try {
        return str.split(';');
    } catch (e) {
        return null;
    }
}

const toString = array => {
    try {
        return array.join(';');
    } catch (e) {
        return null;
    }
}

module.exports = { toArray, toString };