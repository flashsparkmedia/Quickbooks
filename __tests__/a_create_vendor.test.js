const qb = require('../app')
const faker = require('faker');

it('returns a vendor', async () => {

    const familyName = faker.name.lastName()
    const givenName = faker.name.firstName()

    const options = {
        displayName: `${givenName} ${familyName}`,
        familyName,
        givenName,
        email: faker.internet.email()
    }

    const vendor = await qb.createVendor(options)
    expect(vendor.Id).toBeDefined()

    return
})