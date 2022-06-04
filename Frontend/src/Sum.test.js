const sum = require ('./Sum');

test('properly add', () => {
    expect(
        sum(1, 2)
    ).toBe(3);
})