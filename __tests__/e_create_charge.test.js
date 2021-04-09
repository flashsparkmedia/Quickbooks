const qb = require('../app')

it('returns a charge', async () => {
    
    const charge = await qb.createCharge({
        number: '4151500000000008',
        expMonth: '03',
        expYear: '2030',
        cvc: '737',
        name: 'Test User',
        amount: 100,
        description: 'Hawkins.png'
    })

    expect(charge.id).toBeDefined()
})