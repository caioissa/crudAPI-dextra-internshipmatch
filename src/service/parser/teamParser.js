const { toArray } = require('../../utils/array');
const { srcFromGDriveUrl } = require ('../../utils/user');

const teamParser = (row, i) => ({
    id: i,
    name: row['Nome da equipe'],
    email: row['Email Address'],
    photo_url: srcFromGDriveUrl(row['Foto da equipe']),
    spots: row['Quantidade de vagas'],
    technologies: toArray(row['Tecnologias utilizadas pela equipe']),
    clients: toArray(row['Clientes da equipe']),
    languages: toArray(row['Idiomas requisitados pela equipe']),
    bio: row['Descreva a equipe']
})

module.exports = teamParser;