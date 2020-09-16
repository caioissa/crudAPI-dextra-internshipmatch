const teamParser = require('../../src/service/parser/teamParser');
const SheetsService = require('../../src/service/SheetsService');

var teamService;

test('Should connect to googleSheets', async () => {
    jest.setTimeout(10000);
    teamService = await SheetsService.build(
        '1OhISMkqyP1sgs1adu-jh5go1PgcQerzQeTjbcyEhx3M', teamParser);
    expect(teamService).not.toBeNull();
})

test('Should fetch all teams', async () => {
    const teams = await teamService.getAll();
    expect(teams.length).toBeGreaterThan(0);
    const props = ['id', 'name', 'photo_url'];
    teams.forEach(team => {
        props.forEach(prop => {
            expect(team).toHaveProperty(prop);
        });
    });
})

test('Should fetch first team', async () => {
    const team = await teamService.getById(0);
    const props = ['id', 'name', 'email', 'photo_url', 'spots', 
                        'technologies', 'clients', 'languages', 'bio'];
    props.forEach(prop => {
        expect(team).toHaveProperty(prop);
    });
})

test('Should write choices to team by email', async () => {
    jest.setTimeout(10000);
    var team = await teamService.getById(0);
    const email = team.email;
    const past_choices = team.choices;
    const new_choices = ['1','2','3','4'];
    const choices = await teamService.writeChoicesByEmail(email, new_choices);
    expect(choices).toEqual(new_choices);
    await teamService.writeChoicesByEmail(email, past_choices);
    team = await teamService.getById(0);
    expect(team.choices).toEqual(past_choices);
})

test('Should get an error trying to fetch a team for a non existing row', async () => {
    const team = await teamService.getById(300);
    expect(team).toBeNull();
})

test('Should get an error trying to write to a non existing row by email', async () => {
    const choices = await teamService.writeChoicesByEmail('dummy', ['1', '2', '3', '4']);
    expect(choices).toBeNull();
})