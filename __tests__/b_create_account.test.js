const qb = require('../app')

it ('creates an account', async () => {

    const AcctNum = Math.ceil(Math.random() * 10000)
    
    const options = {
        Name: `Test Account ${AcctNum}`,
        AcctNum,
        AccountType: 'Income'
    }

    const account = await qb.createAccount(options)
    expect(account.Id).toBeDefined()
})