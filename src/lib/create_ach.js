const { v4: uuidv4 } = require('uuid');

async function createACH(options) {

    if (!options) {
        throw new Error('createCharge options not provided.')
    }

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

        const token = tokenResponse.value

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

        return achResponse

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

module.exports = createACH