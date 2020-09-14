const { writeChoices } = require('../../src/api/googleSheetsAPI');
const { InternService } = require('../../src/service/InternService');

var internService;

test('Should connect to googleSheets', async () => {
    internService = await InternService.build();
})

test('Should fetch all stags', async () => {
    const interns = await internService.getInterns();
    expect(interns.length).toBeGreaterThan(0);
    const props = ['id', 'name', 'photo_url'];
    interns.forEach(intern => {
        props.forEach(prop => {
            expect(intern).toHaveProperty(prop);
        });
    });
})

test('Should fetch first intern', async () => {
    const intern = await internService.getInternById(0);
    const props = ['id', 'name', 'username', 'nickname', 'photo_url',
                        'knows', 'wants', 'languages', 'bio', 'age'];
    props.forEach(prop => {
        expect(intern).toHaveProperty(prop);
    });
})

test('Should write choices to first intern', async () => {
    jest.setTimeout(10000);
    var intern = (await internService.getInterns())[0];
    const past_choices = intern.choices;
    const new_choices = ['1','2','3','4'];
    const choices = await internService.writeInternChoices(0, new_choices);
    expect(choices).toEqual(new_choices);
    await internService.writeInternChoices(0, past_choices);
    intern = (await internService.getInterns())[0];
    expect(intern.choices).toEqual(past_choices);
})