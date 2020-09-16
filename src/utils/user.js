const moment = require('moment');

const getAgeFromBirthdate = birthdate => {
    const bd = moment(birthdate, "MM/DD/YYYY");
    const today = moment();
    return today.diff(bd, 'years');
}

const srcFromGDriveUrl = url => {
    const [ id ] = url.split('=').slice(-1);
    return `https://drive.google.com/uc?export=view&id=${id}`
}

const getUserFromEmail = email => {
    try {
        return email.split('@')[0];
    } catch (e) {
        return null;
    }
}

const checkIfDextraEmail = email => {
    try {
        const domain = email.split('@')[1].split('.')[0];
        return domain === 'dextra-sw';
    } catch (e) {
        console.error("Error trying to parse email domain", e.message);
        return false;
    }
}

module.exports = { getAgeFromBirthdate, srcFromGDriveUrl, getUserFromEmail, checkIfDextraEmail };