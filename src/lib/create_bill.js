function createBill(options) {
    return new Promise(async (resolve, reject) => {
        if (!options) {
            reject('createInvoice options not provided.')
        }

        try {
            const response = await this.makeRequest({
                url: `${this.BASE_URL_WEB}/v3/company/${this.realm_id}/bill?minorversion=1`,
                method: 'POST',
                data: {
                    Line: [
                        {
                            DetailType: "AccountBasedExpenseLineDetail",
                            Amount: options.amount,
                            AccountBasedExpenseLineDetail: {
                                AccountRef: {
                                    value: options.accountId
                                }
                            },
                            // Description: ``
                        }
                    ],
                    VendorRef: {
                        value: options.vendorId
                    }
                }
            })
    
            resolve(response.Bill)
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

module.exports = createBill