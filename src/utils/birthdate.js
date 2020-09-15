const moment = require('moment');

const getAgeFromBirthdate = birthdate => {
    const bd = moment(birthdate, "MM/DD/YYYY");
    const today = moment();
    return today.diff(bd, 'years');
}

module.exports = getAgeFromBirthdate;