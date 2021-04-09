async function getService(query) {
    try {
        const response = await this.makeRequest({
            url: `${this.baseUrl}/v3/company/${this.realmId}/query?query=${query}`,
            method: 'GET'
        })

        return response.data
    } catch(e) {
        const errorsArray = e.response.data.Fault.Error
        const errors = errorsArray.map(error => error.Message).join(' ')
        throw new Error(errors)
    }
}

module.exports = getService