const qb = require('../app')
const faker = require('faker')

// This operation cannot retrieve cards created via the QuickBooks Online interface.
it ('Retrieves a specified card object', async () => {
    
    const familyName = faker.name.lastName()
    const givenName = faker.name.firstName()
    const displayName = `${givenName} ${familyName}`

    const customer = await qb.createCustomer({
        displayName,
        familyName,
        givenName,
        email: faker.internet.email()
    })
    
    const newCard = await qb.createCard({
        number: '4151500000000008',
        expMonth: '03',
        expYear: '2030',
        cvc: '737',
        name: 'Test User',
        default: true,
        customerId: customer.Id
    })

    const card =  await qb.getCard({
        customerId: customer.Id,
        cardId: newCard.id
    })

    expect(card.id).toBeDefined()
})