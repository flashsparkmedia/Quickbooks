const qb = require('../app')


it('retrieves all cards associated with a customer', async () => {
    const familyName = faker.name.lastName()
    const givenName = faker.name.firstName()
    const displayName = `${givenName} ${familyName}`

    const customer = await qb.createCustomer({
        displayName,
        familyName,
        givenName,
        email: faker.internet.email()
    })
    
    await qb.createCard({
        number: faker.finance.creditCardNumber(),
        expMonth: '03',
        expYear: '2030',
        ccv: faker.finance.creditCardCVV(),
        name: displayName,
        default: true,
        customerId: customer.Id
    })

    await qb.createCard({
        number: faker.finance.creditCardNumber(),
        expMonth: '03',
        expYear: '2030',
        ccv: faker.finance.creditCardCVV(),
        name: displayName,
        default: true,
        customerId: customer.Id
    })

    await qb.createCard({
        number: faker.finance.creditCardNumber(),
        expMonth: '03',
        expYear: '2030',
        ccv: faker.finance.creditCardCVV(),
        name: displayName,
        default: true,
        customerId: customer.Id
    })

    const cards = await qb.getCards({
        customerId: customer.Id
    })

    expect(Array.isArray(cards)).toBe(true)
})