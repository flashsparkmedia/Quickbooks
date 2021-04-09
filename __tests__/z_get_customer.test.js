const qb = require('../app')

it('returns customers', async () => {
    const query = "select * from Customer"
    const customers = await qb.getCustomer(query)
    expect(Array.isArray(customers)).toBe(true)
})