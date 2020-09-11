const {
    getStagById,
    getStags,
    writeStagChoices,
    getStagChoices
} = require('../src/apis/googleSheetsAPI')

test('Should fetch all stags', async () => {
    const stags = await getStags();
    expect(stags.length).toBeGreaterThan(0);
    const props = ['id', 'name', 'photo_url'];
    stags.forEach(stag => {
        props.forEach(prop => {
            expect(stag).toHaveProperty(prop);
        })
    })
})

test('Should fetch first stag', async () => {
    const stag = await getStagById(0);
    const props = ['id', 'name', 'email', 'nickname', 'photo_url',
                        'knows', 'wants', 'languages'];
    props.forEach(prop => {
        expect(stag).toHaveProperty(prop);
    })

})

test('Should write choices to first stag', async () => {
    jest.setTimeout(10000);
    var stag = (await getStagChoices())[0];
    const past_choices = stag.choices;
    const new_choices = ['1','2','3','4'];
    const choices = await writeStagChoices(0, new_choices);
    expect(choices).toEqual(new_choices);
    await writeStagChoices(0, past_choices);
    stag = (await getStagChoices())[0];
    expect(stag.choices).toEqual(past_choices);
})
