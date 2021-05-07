const getAccessToken = require('./src/lib/get_access_token')
const createCustomer = require('./src/lib/create_customer')
const getCustomer = require('./src/lib/get_customer')
const createVendor = require('./src/lib/create_vendor')
const getVendor = require('./src/lib/get_vendor')
const getService = require('./src/lib/get_service')
const createItem = require('./src/lib/create_item')
const createInvoice = require('./src/lib/create_invoice')
const createBill = require('./src/lib/create_bill')
const getInvoices = require('./src/lib/get_invoices')
const createCard = require('./src/lib/create_card')
const deleteCard = require('./src/lib/delete_card')
const getCards = require('./src/lib/get_cards')
const getCard = require('./src/lib/get_card')
const createAccount = require('./src/lib/create_account')
const getAccount = require('./src/lib/get_account')
const makeRequest = require('./src/lib/make_request')
const createCharge = require('./src/lib/create_charge')
const createACH = require('./src/lib/create_ach')
const createPayment = require('./src/lib/create_payment')


let instance

class Quickbooks {
    constructor(options) {
        this.client_id = options.client_id
        this.client_secret = options.client_secret
        this.refresh_token = options.refresh_token
        this.realm_id = options.realm_id
        this.accessToken = null
       
        this.PROD = Boolean(options.prod)
        this.BASE_URL_WEB = this.PROD ? 'https://quickbooks.api.intuit.com' : 'https://sandbox-quickbooks.api.intuit.com'
        this.BASE_URL_PAYMENTS = this.PROD ? 'https://api.intuit.com' : 'https://sandbox.api.intuit.com'
        this.OAUTH_API_URL = 'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer'

        this.init()
    }

    init = async () => {
      this.accessToken = await this.getAccessToken()
      setInterval(() => {
        this.accessToken = await this.getAccessToken()
      }, 30 * 1000 * 1000)
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

module.exports = {
  getInstance(options) {
    if (!instance) {
      // only the first call to getInstance will use these options to create an instance
      instance = new Quickbooks(options);
    } 
    return instance;
  }
}