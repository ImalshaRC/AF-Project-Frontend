const noOfTruePreferences = require ('./CountPreferences');

test('properly counted user preferences', () => {
    expect(
        noOfTruePreferences(true, true, true)
    ).toBe(3);
})