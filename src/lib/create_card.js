const { v4: uuidv4 } = require('uuid');

async function createCard(options) {

    if (!options) {
       throw new Error('createCard options not provided.')
    }

    try {
        const card = await this.makeRequest({
            url: `${this.BASE_URL_PAYMENTS}/quickbooks/v4/customers/${options.customerId}/cards`,
            method: 'POST',
            headers: {
                "request-Id": uuidv4()
            },
            data: {
                number: options.number,
                expMonth: options.expMonth,
                expYear: options.expYear,
                cvc: options.cvc,
                name: options.name,
                default: options.default
            }
        })
        return card
    } catch (e) {
        const errorsArray = e.errors
        const errors = errorsArray.map(error => error.message).join(' ')
        throw new Error(errors)
    }
}

module.exports = createCard