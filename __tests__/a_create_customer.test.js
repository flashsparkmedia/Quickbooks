const qb = require('../app')
const faker = require('faker');

it('returns a customer', async () => {

    const familyName = faker.name.lastName()
    const givenName = faker.name.firstName()

    const options = {
        displayName: `${givenName} ${familyName}`,
        familyName,
        givenName,
        email: faker.internet.email()
    }

    const customer = await qb.createCustomer(options)

    expect(customer.Id).toBeDefined()

    return
})