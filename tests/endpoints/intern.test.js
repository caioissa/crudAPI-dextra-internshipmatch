const request = require('supertest')

const { app, setup } = require('../../src/app')

beforeAll(async () => {
    await setup();
});

test('Should fetch all interns', async () => {
    const response = await request(app)
        .get('/interns')
        .expect(200)
    const interns = response.body
    expect(interns.length).toBeGreaterThan(0);
    const props = ['id', 'name', 'photo_url'];
    interns.forEach(intern => {
        props.forEach(prop => {
            expect(intern).toHaveProperty(prop);
        });
    });
})

test('Should fetch intern with id 0', async () => {
    const response = await request(app)
        .get('/interns/0')
        .expect(200)
    intern = response.body
    const props = ['id', 'name', 'username', 'email', 'nickname', 'photo_url',
        'knows', 'wants', 'languages', 'bio', 'age'];
    props.forEach(prop => {
        expect(intern).toHaveProperty(prop);
    });
})

test('Should get a 404 with invalid id 1234', async () => {
    await request(app)
        .get('/interns/1234')
        .expect(404)
})

test('Should get a 400 for non integer id', async () => {
    await request(app)
        .get('/interns/dummy')
        .expect(400)
})