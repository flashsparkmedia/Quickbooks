function getAccount(query) {
    return new Promise(async (resolve, reject) => {
        if (!query) {
            reject('getAccount query not provided')
        }

        try {
            const response = await this.makeRequest({
                url: `${this.BASE_URL_WEB}/v3/company/${this.realm_id}/query?query=${query}`,
                method: 'GET'
            })
            resolve(response.QueryResponse.Account)
        } catch (e) {
            if (e.response.Fault) {
                const errorsArray = e.response.data.Fault.Error
                const errors = errorsArray.map(error => error.Message).join(' ')
                reject(errors)
            } else {
                reject(e)
            }
        }
    })
}

module.exports = getAccount
