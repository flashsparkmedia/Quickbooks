function deleteCard(options) {
    return new Promise(async (resolve, reject) => {
        if (!options) {
            reject('deleteCard options not provided.')
        }

        try {
            const response = await this.makeRequest({
                url: `${this.BASE_URL_PAYMENTS}/quickbooks/v4/customers/${options.customerId}/cards/${options.cardId}`,
                method: 'DELETE',
                headers: {
                    "request-Id": uuidv4()
                }
            })
    
            resolve(response.data)
        } catch (e) {
            if (e.response.data.Fault) {
                const errorsArray = e.response.data.Fault.Error
                const errors = errorsArray.map(error => error.Message).join(' ')
                reject(errors)
            } else {
                reject(e)
            }
        }
    })
}

module.exports = deleteCard