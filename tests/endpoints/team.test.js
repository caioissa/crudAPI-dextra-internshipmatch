const request = require('supertest')

const { app, setup } = require('../../src/app')

beforeAll(async () => {
    await setup();
});

test('Should set choices correctly', async () => {
    body = {
        choices: [
            'caio.issa', 'fabio.rocha', 'thomas.passos', 'brian.benko'
        ]
    }

    const response = await request(app)
        .post('/teams/choices/caioissa96@gmail.com')
        .send(body)
        .expect(200)

    expect(response.body.message).toBe('OK')
})

test('Should set choices for incorrect email abc@gmail.net', async () => {
    body = {
        choices: [
            'caio.issa', 'fabio.rocha', 'thomas.passos', 'brian.benko'
        ]
    }

    await request(app)
        .post('/teams/choices/abc@gmail.net')
        .send(body)
        .expect(404)
})

test('Should set choices with invalid body', async () => {
    body = {}

    await request(app)
        .post('/teams/choices/caioissa96@gmail.com')
        .send(body)
        .expect(400)
})

test('Should fetch all teams with choices', async () => {
    const response = await request(app)
        .get('/teams/choices')
        .expect(200)

    const teams = response.body
    expect(teams.length).toBeGreaterThan(0);
    const props = ['id', 'name', 'spots', 'technologies', 
                    'languages', 'choices'];
    teams.forEach(intern => {
        props.forEach(prop => {
            expect(intern).toHaveProperty(prop);
        });
    });
})

