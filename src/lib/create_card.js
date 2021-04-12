const { v4: uuidv4 } = require('uuid')

function createCard(options) {
    return new Promise(async (resolve, reject) => {
        
        if (!options) {
            reject('createCard options not provided.')
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
            resolve(card)
        } catch (e) {
            if (e.errors) {
                const errorsArray = e.errors
                const errors = errorsArray.map(error => error.message).join(' ')
                reject(errors)
            } else {
                reject(e)
            }
        }
    })
}

module.exports = createCard