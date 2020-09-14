const { toArray } = require('../../utils/array');
const { getUserFromEmail } = require('../../utils/username');

const parser = (row, i) => ({
    id: i,
    name: row['Nome completo'],
    username: getUserFromEmail(row['Email Address']),
    nickname: row['Apelido'],
    photo_url: row['Foto de perfil'],
    knows: toArray(row['Tecnologias que tem experiência']),
    wants: toArray(row['Tecnologias que quer aprender']),
    choices: toArray(row['Escolhas']),
    languages: toArray(row['Idiomas'])
})

module.exports = { parser };