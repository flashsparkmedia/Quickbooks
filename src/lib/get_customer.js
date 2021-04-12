
function getCustomer(query) {
    return new Promise(async (resolve, reject) => {
        if (!query) {
            reject('getCustomer select statement not provided')
        }

        try {
            const response = await this.makeRequest({
                url: `${this.BASE_URL_WEB}/v3/company/${this.realm_id}/query?query=${query}&minorversion=57`,
                method: 'GET'
            })
            resolve(response.QueryResponse.Customer)
        } catch (e) {
            const errorsArray = e.Fault.Error
            const errors = errorsArray.map(error => error.Message).join(' ')
            reject(errors)
        }
    })
}
    
module.exports = getCustomer