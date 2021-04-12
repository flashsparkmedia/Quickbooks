function getCard(options) {
    return new Promise(async (resolve, reject) => {
        if (!options) {
            reject('getCard options not provided.')
        }
    
        try {
            const response = await this.makeRequest({
                url: `${this.BASE_URL_PAYMENTS}/quickbooks/v4/customers/${options.customerId}/cards/${options.cardId}`,
                method: 'GET'
            })
            resolve(response)
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

module.exports = getCard
