
function getInvoices(options) {
    return new Promise(async (resolve, reject) => {
        if (!selectStatement) {
           reject('getInvoices select statement not provided')
        }
    
        try {
            const response = await this.makeRequest({
                url: `/v3/company/${this.realmId}/query?query=${query}&minorversion=57`,
                method: 'GET'
            })
    
            resolve(response.data)
        } catch (e) {
            if (e.response.data.Fault) {
                const errorsArray = e.response.data.Fault.Error
                const errors = errorsArray.map(error => error.Message).join(' ')
                rejectr(errors)
            } else {
                reject(e)
            }
        }
    })
}

module.exports = getInvoices