const getUserFromEmail = email => {
    try {
        return email.split('@')[0];
    } catch (e) {
        return null;
    }
}

module.exports = { getUserFromEmail };