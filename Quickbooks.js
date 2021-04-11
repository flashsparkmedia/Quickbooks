const getAccessToken = require('./lib/get_access_token')
const createCustomer = require('./lib/create_customer')
const getCustomer = require('./lib/get_customer')
const createVendor = require('./lib/create_vendor')
const getVendor = require('./lib/get_vendor')
const getService = require('./lib/get_service')
const createItem = require('./lib/create_item')
const createInvoice = require('./lib/create_invoice')
const createBill = require('./lib/create_bill')
const getInvoices = require('./lib/get_invoices')
const createCard = require('./lib/create_card')
const deleteCard = require('./lib/delete_card')
const getCards = require('./lib/get_cards')
const getCard = require('./lib/get_card')
const createAccount = require('./lib/create_account')
const getAccount = require('./lib/get_account')
const makeRequest = require('./lib/make_request')
const createCharge = require('./lib/create_charge')
const createACH = require('./lib/create_ach')
const createPayment = require('./lib/create_payment')


let instance

class Quickbooks {
    constructor(options) {
        this.client_id = options.client_id
        this.client_secret = options.client_secret
        this.refresh_token = options.refresh_token
        this.realm_id = options.realm_id
       
        this.PROD = Boolean(options.prod)
        this.BASE_URL_WEB = this.PROD ? 'https://quickbooks.api.intuit.com' : 'https://sandbox-quickbooks.api.intuit.com'
        this.BASE_URL_PAYMENTS = this.PROD ? 'https://api.intuit.com' : 'https://sandbox.api.intuit.com'
        this.OAUTH_API_URL = 'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer'
    }

    getAccessToken = getAccessToken.bind(this)
    createCustomer = createCustomer.bind(this)
    getCustomer = getCustomer.bind(this)
    createVendor = createVendor.bind(this)
    getVendor = getVendor.bind(this)
    getService = getService.bind(this)
    createItem = createItem.bind(this)
    createInvoice = createInvoice.bind(this)
    createBill = createBill.bind(this)
    getInvoices = getInvoices.bind(this)
    createCard = createCard.bind(this)
    deleteCard= deleteCard.bind(this)
    getCards = getCards.bind(this)
    getCard = getCard.bind(this)
    createCharge = createCharge.bind(this)
    createAccount = createAccount.bind(this)
    getAccount = getAccount.bind(this)
    createCharge = createCharge.bind(this)
    createACH = createACH.bind(this)
    createPayment = createPayment.bind(this)
    makeRequest = makeRequest.bind(this)
}

module.exports = options => {
    if (!instance) {
      instance = new Quickbooks(options);
    } 
    return instance;
  }
