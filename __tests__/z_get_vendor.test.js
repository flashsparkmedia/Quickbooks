const qb = require('../app')

it('returns vendors', async () => {
    const query = "select * from Vendor"
    const vendors = await qb.getVendor(query)
    expect(Array.isArray(vendors)).toBe(true)
})