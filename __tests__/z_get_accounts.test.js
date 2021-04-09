const qb = require('../app')

it('returns accounts', async () => {
    const query = "select * from Account"
    const accounts = await qb.getAccount(query)
    expect(Array.isArray(accounts)).toBe(true)
})