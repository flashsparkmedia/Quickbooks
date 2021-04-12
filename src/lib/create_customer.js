// async function createCustomer(options) {
//     if (!options) {
//         throw new Error('createCustomer options not provided.')
//     }

//     try {
//         const response = await this.makeRequest({
//             url: `${this.BASE_URL_WEB}/v3/company/${this.realm_id}/customer?minorversion=57`,
//             method: 'POST',
//             data: {
//                 DisplayName: options.displayName,
//                 FamilyName: options.familyName,
//                 GivenName: options.givenName,
//                 PrimaryEmailAddr: {
//                     Address: options.email
//                 }
//             }
//         })
//         return response.Customer
//     } catch(e) {
//         if (e.Fault) {
//             const errorsArray = e.Fault.Error
//             const errors = errorsArray.map(error => error.Message).join(' ')
//             throw new Error(errors)
//         } else {
//             throw new Error(e)
//         }
//     }
// }

function createCustomer(options) {
    return new Promise(async (resolve, reject) => {
        if (!options) {
            reject('createCustomer options not provided.')
        }

        try {
            const response = await this.makeRequest({
                url: `${this.BASE_URL_WEB}/v3/company/${this.realm_id}/customer?minorversion=57`,
                method: 'POST',
                data: {
                    DisplayName: options.displayName,
                    FamilyName: options.familyName,
                    GivenName: options.givenName,
                    PrimaryEmailAddr: {
                        Address: options.email
                    }
                }
            })
            resolve(response.Customer)
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

module.exports = createCustomer