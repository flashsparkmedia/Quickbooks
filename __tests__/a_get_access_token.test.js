const qb = require('../app')

it('returns an access token as a string', async () => {
    access_token = await qb.getAccessToken()
    expect(access_token).toBeDefined()
    expect(typeof(access_token)).toBe('string')
})
