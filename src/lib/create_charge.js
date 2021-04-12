const { v4: uuidv4 } = require('uuid');

// {
//     "status": "CAPTURED", 
//     "created": "2014-11-03T16:41:42Z", 
//     "authCode": "792668", 
//     "token": "bFy3h7W3D2tmOfYxl2msnLbUirY=", 
//     "currency": "USD", 
//     "amount": "10.55", 
//     "id": "EMU254189574"
//   }

function createCharge(options) {
    return new Promise(async (resolve, reject) => {
        if (!options) {
            reject('createCharge options not provided.')
        }

        let token

        try {
            const tokenResponse = await this.makeRequest({
                url: `${this.BASE_URL_PAYMENTS}/quickbooks/v4/payments/tokens`,
                method: 'POST',
                data: {
                    card: {
                        number: options.number,
                        expMonth: options.expMonth,
                        expYear: options.expYear,
                        cvc: options.cvc,
                        name: options.name
                    }
                }
            })
            token = tokenResponse.value
        } catch(e) {
            if (e.errors) {
                const errorsArray = e.errors
                const errors = errorsArray.map(error => error.message).join(' ')
                reject(errors)
            } else {
                reject(e)
            }
        }
    
        try {
            const chargeResponse = await this.makeRequest({
                url: `${this.BASE_URL_PAYMENTS}/quickbooks/v4/payments/charges`,
                method: 'POST',
                headers: {
                    "request-Id": uuidv4()
                },
                data: {
                    token,
                    currency: "USD",
                    amount: options.amount,
                    context: {
                        isEcommerce: true,
                        mobile: false
                    },
                    description: options.description
                }
            })
    
            resolve(chargeResponse)
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

module.exports = createCharge