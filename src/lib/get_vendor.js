
async function getVendor(query) {

    if (!query) {
        throw new Error('getVendor select statement not provided')
    }

    try {
        const response = await this.makeRequest({
            url: `${this.BASE_URL_WEB}/v3/company/${this.realm_id}/query?query=${query}&minorversion=57`,
            method: 'GET'
        })

    return response.QueryResponse.Vendor
    } catch (e) {
        const errorsArray = e.Fault.Error
        const errors = errorsArray.map(error => error.Message).join(' ')
        throw new Error(errors)
    }
}

module.exports = getVendor