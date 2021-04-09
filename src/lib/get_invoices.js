
async function getInvoices(options) {

    if (!selectStatement) {
        return console.log('getInvoices select statement not provided')
    }

    try {
        const response = await this.makeRequest({
            url: `/v3/company/${this.realmId}/query?query=${query}&minorversion=57`,
            method: 'GET'
        })

        return response.data
    } catch (e) {
        const errorsArray = e.response.data.Fault.Error
        const errors = errorsArray.map(error => error.Message).join(' ')
        throw new Error(errors)
    }
}

module.exports = getInvoices