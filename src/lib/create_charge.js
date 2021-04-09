const { v4: uuidv4 } = require('uuid');

async function createCharge(options) {

    if (!options) {
        throw new Error('createCharge options not provided.')
    }

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

        const token = tokenResponse.value

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

        return chargeResponse

        // IF SUCCESSFULL
        // {
        //     "status": "CAPTURED", 
        //     "created": "2014-11-03T16:41:42Z", 
        //     "authCode": "792668", 
        //     "token": "bFy3h7W3D2tmOfYxl2msnLbUirY=", 
        //     "currency": "USD", 
        //     "amount": "10.55", 
        //     "id": "EMU254189574"
        //   }

    } catch (e) {
        const errorsArray = e.errors
        console.log(errorsArray[0])
        const errors = errorsArray.map(error => error.message).join(' ')
        throw new Error(errors)
    }
}

module.exports = createCharge