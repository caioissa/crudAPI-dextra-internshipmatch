const { toArray } = require('../../utils/array');
const { getUserFromEmail,
        getAgeFromBirthdate,
        srcFromGDriveUrl } = require ('../../utils/user');

const parser = (row, i) => ({
    id: i,
    name: row['Nome completo'],
    username: getUserFromEmail(row['Email Address']),
    nickname: row['Apelido'],
    photo_url: srcFromGDriveUrl(row['Foto de perfil']),
    knows: toArray(row['Tecnologias que tem experiência']),
    wants: toArray(row['Tecnologias que quer aprender']),
    choices: toArray(row['Escolhas']),
    languages: toArray(row['Idiomas']),
    bio: row['Descreva você'],
    age: getAgeFromBirthdate(row['Data de Nascimento'])
})

module.exports = parser;