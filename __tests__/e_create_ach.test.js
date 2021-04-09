const qb = require('../app')
const faker = require('faker')

it('returns an ach payment', async () => {
    
    const ach = await qb.createACH({
        name: faker.finance.accountName(),
        accountNumber: faker.finance.account(),
        phone: faker.phone.phoneNumberFormat().replace(/-/g, ''),
        accountType: 'PERSONAL_CHECKING',
        routingNumber: faker.finance.routingNumber(),
        amount: '100.00',
        description: 'HawkinsPNG'
    })
    
    expect(ach.id).toBeDefined()
})