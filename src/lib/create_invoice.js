const moment = require('moment-timezone')

async function createInvoice(options) {
    return new Promise(async (resolve, reject) => {
        if (!options) {
            reject('createInvoice options not provided.')
        }

        try {
            const response = await this.makeRequest({
                url: `${this.BASE_URL_WEB}/v3/company/${this.realm_id}/invoice?minorversion=1`,
                method: 'POST',
                data: {
                    Line: [
                        {
                            DetailType: "SalesItemLineDetail",
                            Amount: options.amount,
                            SalesItemLineDetail: {
                                ItemRef: {
                                    name: options.name,
                                    value: options.value
                                }
                            },
                            Description: `${moment().month(options.month).format('MMMM')} ${options.year} Projects: ${options.projectNames}`,
                        }
                    ],
                    CustomerRef: {
                        value: options.customerId
                    }
                }
            })
    
            resolve(response.Invoice)
        } catch (e) {
            if (e.Fault) {
                const errorsArray = e.Fault.Error
                const errors = errorsArray.map(error => error.Message).join(' ')
                reject(errors)
            } else {
                reject(e)
            }
        }
    })
}

module.exports = createInvoice