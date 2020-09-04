const stags = [
    {
        id: 0,
        name: 'Caio Issa',
        email: 'caio.issa@dextra-sw.com',
        nickname: '',
        photo_url: 'sample_url.jpg',
        knows: [
            'HTML5',
            'Javascript',
            'Python'
        ],
        wants: [
            'React',
            'Node'
        ],
        languages: [
            'English',
            'French',
            'Portuguese'
        ]
    },
    {
        id: 1,
        name: 'Fabio Rocha',
        email: 'fabio.rocha@dextra-sw.com',
        nickname: 'The Rock',
        photo_url: 'sample_url2.jpg',
        knows: [
            'HTML5',
            'Node'
        ],
        wants: [
            'VueJS'
        ],
        languages: [
            'German',
            'Portuguese'
        ]
    }
]

const teams = [
    {
        id: 0,
        nome: 'eq 1',
        ammount: 2,
        technologies: [
            'React',
            '.NET'
        ],
        choices: [
            'caio.issa',
            'fabio.rocha'
        ],
        languages: [
            'English',
            'Spanish',
            'Portuguese'
        ]
    }
]

module.exports = { stags, teams }