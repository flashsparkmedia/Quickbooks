require('dotenv').config()
const quickbooks = require('./src/Quickbooks')

const options = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    refresh_token: process.env.REFRESH_TOKEN,
    realm_id: process.env.REALM_ID,
    prod: false
}

const qb = quickbooks(options)

module.exports = qb

