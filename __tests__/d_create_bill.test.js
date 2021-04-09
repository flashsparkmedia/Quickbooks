const qb = require('../app')
const faker = require('faker');

it ('creates a bill', async () => {

    const familyName = faker.name.lastName()
    const givenName = faker.name.firstName()
    const AcctNum = Math.ceil(Math.random() * 100)
    
    const vendor = await qb.createVendor({
        displayName: `${givenName} ${familyName}`,
        familyName,
        givenName,
        email: faker.internet.email(),
    })

    // THIS WILL BE A CONSTANT IN PRODUCTION
    const account = await qb.createAccount(accountOptions = {
        Name: `Test Account ${AcctNum}`,
        AcctNum,
        AccountType: 'Expense'
    })


    const bill = await qb.createBill({
        amount: 100,
        vendorId: vendor.Id,
        accountId: account.Id
    })

    expect(bill.Id).toBeDefined()
})