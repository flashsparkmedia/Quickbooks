const qb = require('../app')
const faker = require('faker');

it('creates a payment', async () => {

    const familyName = faker.name.lastName()
    const givenName = faker.name.firstName()
    const AcctNum = Math.ceil(Math.random() * 100)
    const serviceName = faker.commerce.productName()

    const customer = await qb.createCustomer({
        displayName: `${givenName} ${familyName}`,
        familyName,
        givenName,
        email: faker.internet.email()
    })

      // THIS WILL BE A CONSTANT IN PRODUCTION
    const account = await qb.createAccount(accountOptions = {
        Name: `Test Account ${AcctNum}`,
        AcctNum,
        AccountType: 'Bank'
    })

    // THIS WILL ALSO BE A CONSTANT IN PRODUCTION
    const item = await qb.createItem({
        Name: serviceName,
        Type: 'Service',
        IncomeAccountRef: {
            name: "Sales of Product Income",
            value: account.Id
        }
    })

    const invoice = await qb.createInvoice({
        amount: 100,
        name: serviceName,
        value: item.Id,
        customerId: customer.Id,
        month: 1,
        year: 2022,
        projectNames: "Project 1, Project 2"
    })


    const payment = await qb.createPayment({
        amount: 100,
        customerDisplayName: `${givenName} ${familyName}`,
        customerId: customer.Id,
        accountId: account.Id,
        transactionId: invoice.Id,
        descriptions: 'Test Description'
    })

    expect(payment.Id).toBeDefined()

    return
})