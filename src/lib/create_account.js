function createAccount(options) {
    return new Promise(async (resolve, reject) => {

        if (!options) {
            reject('createAccount options not provided.')
        }

        try {
            const response = await this.makeRequest({
                url: `${this.BASE_URL_WEB}/v3/company/${this.realm_id}/account?minorversion=57`,
                method: 'POST',
                data: options
            })
    
            resolve(response.Account)
        } catch(e) {
            if (e.Fault) {
                const errorsArray = e.Fault.Error
                const errors = errorsArray.map(error => error.Message).join(' ')
                reject(errors)
            } else {
                reject(e)
            }
        }
    })
}

module.exports = createAccount