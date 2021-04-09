async function deleteCard(options) {

    if (!options) {
        throw new Error('deleteCard options not provided.')
    }

    try {
        const response = await this.makeRequest({
            url: `${this.BASE_URL_PAYMENTS}/quickbooks/v4/customers/${options.customerId}/cards/${options.cardId}`,
            method: 'DELETE',
            headers: {
                "request-Id": uuidv4()
            }
        })

        return response.data
    } catch (e) {
        const errorsArray = e.response.data.Fault.Error
        const errors = errorsArray.map(error => error.Message).join(' ')
        throw new Error(errors)
    }
}

module.exports = deleteCard