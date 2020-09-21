const internParser = require('../../src/service/parser/internParser');
const SheetsService = require('../../src/service/SheetsService');

var internService;

test('Should connect to googleSheets', async () => {
    jest.setTimeout(10000);
    internService = await SheetsService.build(
        process.env.INTERNS_SHEET_ID, internParser);
    expect(internService).not.toBeNull();
})

test('Should fetch all interns', async () => {
    const interns = await internService.getAll();
    expect(interns.length).toBeGreaterThan(0);
    const props = ['id', 'name', 'photo_url'];
    interns.forEach(intern => {
        props.forEach(prop => {
            expect(intern).toHaveProperty(prop);
        });
    });
})

test('Should fetch first intern', async () => {
    const intern = await internService.getById(0);
    const props = ['id', 'name', 'username', 'email', 'nickname', 'photo_url',
                        'knows', 'wants', 'languages', 'bio', 'age'];
    props.forEach(prop => {
        expect(intern).toHaveProperty(prop);
    });
})

test('Should write choices to intern by email', async () => {
    jest.setTimeout(10000);
    var intern = await internService.getById(0);
    const email = intern.email;
    const past_choices = intern.choices;
    const new_choices = ['1','2','3','4'];
    const choices = await internService.writeChoicesByEmail(email, new_choices);
    expect(choices).toEqual(new_choices);
    await internService.writeChoicesByEmail(email, past_choices);
    intern = await internService.getById(0);
    expect(intern.choices).toEqual(past_choices);
})

test('Should get an error trying to fetch an intern for a non existing row', async () => {
    const intern = await internService.getById(300);
    expect(intern).toBeNull();
})

test('Should get an error trying to write to a non existing row by email', async () => {
    const choices = await internService.writeChoicesByEmail('dummy', ['1', '2', '3', '4']);
    expect(choices).toBeNull();
})