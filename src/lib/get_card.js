async function getCard(options) {

    if (!options) {
        return console.log('getCard options not provided.')
    }

    try {
        return await this.makeRequest({
            url: `${this.BASE_URL_PAYMENTS}/quickbooks/v4/customers/${options.customerId}/cards/${options.cardId}`,
            method: 'GET'
        })
    } catch (e) {
        console.log(e)
        const errorsArray = e.response.data.Fault.Error
        const errors = errorsArray.map(error => error.Message).join(' ')
        throw new Error(errors)
    }
}

module.exports = getCard
