async function getAccount(query) {

    if (!query) {
        return console.log('getAccount query not provided')
    }

    try {
        const response = await this.makeRequest({
            url: `${this.BASE_URL_WEB}/v3/company/${this.realm_id}/query?query=${query}`,
            method: 'GET'
        })
        return response.QueryResponse.Account
    } catch (e) {
        const errorsArray = e.response.data.Fault.Error
        const errors = errorsArray.map(error => error.Message).join(' ')
        throw new Error(errors)
    }
}

module.exports = getAccount
