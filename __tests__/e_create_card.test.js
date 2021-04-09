const qb = require('../app')
const faker = require('faker')

it('returns a card', async () => {

    const familyName = faker.name.lastName()
    const givenName = faker.name.firstName()

    const customer = await qb.createCustomer({
        displayName: `${givenName} ${familyName}`,
        familyName,
        givenName,
        email: faker.internet.email()
    })
    
    const options = {
        number: '4151500000000008',
        expMonth: '03',
        expYear: '2030',
        cvc: '737',
        name: 'Test User',
        default: true,
        customerId: customer.Id
    }

    const card = await qb.createCard(options)
    expect(card.id).toBeDefined()

    return
})