function getService(query) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await this.makeRequest({
                url: `${this.baseUrl}/v3/company/${this.realmId}/query?query=${query}`,
                method: 'GET'
            })
    
            resolve(esponse.data)
        } catch(e) {
            if (e.response.data.Fault) {
                const errorsArray = e.response.data.Fault.Error
                const errors = errorsArray.map(error => error.Message).join(' ')
                reject(errors)
            } else {
                reject(e)
            }
        }
    })
}

module.exports = getService