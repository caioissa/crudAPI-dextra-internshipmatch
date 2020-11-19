const checkIfDextraEmail = email => {
    try {
        const domain = email.split('@')[1].split('.')[0];
        return domain === 'gmail';
    } catch (e) {
        console.error("Error trying to parse email domain", e.message);
        return false;
    }
}

module.exports = { checkIfDextraEmail };