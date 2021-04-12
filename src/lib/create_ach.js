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

async function createACH(options) {
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
                    bankAccount: {
                        name: options.name,
                        accountNumber: options.accountNumber,
                        phone: options.phone,
                        accountType: options.accountType,
                        routingNumber: options.routingNumber
                    }
                }
            })
    
            token = tokenResponse.value
        } catch (e) {
            if (e.errors) {
                const errorsArray = e.errors
                const errors = errorsArray.map(error => error.message).join(' ')
                reject(errors)
            } else {
                reject(e)
            }
        }

        try {
            const achResponse = await this.makeRequest({
                url: `${this.BASE_URL_PAYMENTS}/quickbooks/v4/payments/echecks`,
                method: 'POST',
                headers: {
                    "request-Id": uuidv4()
                },
                data: {
                    token,
                    paymentMode: 'WEB',
                    amount: options.amount,
                    description: options.description
                }
            })
    
            resolve(achResponse)
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

module.exports = createACH