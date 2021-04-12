function createPayment(options) {
    return new Promise(async (resolve, reject) => {
        if (!options) {
            reject('createPayment options not provided.')
        } 

        try {
            const response = await this.makeRequest({
                url: `${this.BASE_URL_WEB}/v3/company/${this.realm_id}/payment?minorversion=57`,
                method: 'POST',
                data: {
                    TotalAmt: options.amount,
                    CustomerRef: {
                        name: options.customerDisplayName,
                        value: options.customerId
                    },
                    PrivateNote: options.note,
                    DepositToAccountRef: {
                        value: options.accountId
                    },
                    Line: [
                        {
                            Amount: options.amount,
                            LinkedTxn: [
                                {
                                    TxnId: options.transactionId, // invoice id
                                    TxnType: "Invoice"
                                }
                            ],
                            Description: options.description // Hawkins.png Month Year
                        }
                    ]
                }
            })
            resolve(response.Payment)
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

module.exports = createPayment