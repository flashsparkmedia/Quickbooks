
function getVendor(query) {
    console.log('running')
    console.log(query)

    return new Promise(async (resolve, reject) => {
        if (!query) {
            reject('getVendor select statement not provided')
        }
    
        try {
            const response = await this.makeRequest({
                url: `${this.BASE_URL_WEB}/v3/company/${this.realm_id}/query?query=${query}&minorversion=57`,
                method: 'GET'
            })

            console.log(response)
        
            resolve(response.QueryResponse.Vendor)
        
        } catch (e) {
            if (e.Fault) {
                const errorsArray = e.Fault.Error
                const errors = errorsArray.map(error => error.Message).join(' ')
                console.log(errors)
                reject(errors)
            } else {
                console.log(e.message)
                reject(e)
            }
        }
    })
}

module.exports = getVendor