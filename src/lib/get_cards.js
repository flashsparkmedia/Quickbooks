async function getCards(options) {

    if (!options) {
       throw new Error('getCards options not provided.')
    }

    try {
        return await this.makeRequest({
            url: `${this.BASE_URL_PAYMENTS}/quickbooks/v4/customers/${options.customerId}/cards/`,
            method: 'GET'
        })

    } catch (e) {
        const errorsArray = e.response.data.Fault.Error
        const errors = errorsArray.map(error => error.Message).join(' ')
        throw new Error(errors)
    }
}

module.exports = getCards