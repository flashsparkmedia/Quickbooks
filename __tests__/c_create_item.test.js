const qb = require('../app')
const faker = require('faker');

it ('creates an item', async () => {

    const AcctNum = Math.ceil(Math.random() * 100)
    
    const accountOptions = {
        Name: `Test Account ${AcctNum}`,
        AcctNum,
        AccountType: 'Income'
    }

    const account = await qb.createAccount(accountOptions)

    const itemOptions = {
        Name: faker.commerce.productName(),
        Type: 'Service',
        IncomeAccountRef: {
            name: "Sales of Product Income",
            value: account.Id
        }
    }

    const item = await qb.createItem(itemOptions)
    expect(item.Id).toBeDefined()
})