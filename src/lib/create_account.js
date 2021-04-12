// async function createAccount(options) {
//     if (!options) {
//         throw new Error('createAccount options not provided.')
//     }

//     try {
//         const response = await this.makeRequest({
//             url: `${this.BASE_URL_WEB}/v3/company/${this.realm_id}/account?minorversion=57`,
//             method: 'POST',
//             data: options
//         })
//         return response.Account
//     } catch(e) {
//         const errorsArray = e.Fault.Error
//         const errors = errorsArray.map(error => error.Message).join(' ')
//         throw new Error(errors)
//     }
// }

// module.exports = createAccount

async function createAccount(options) {
    return new Promise((resolve, reject) => {

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
            const errorsArray = e.Fault.Error
            const errors = errorsArray.map(error => error.Message).join(' ')
            reject(errors)
        }
        
    })
}

module.exports = createAccount