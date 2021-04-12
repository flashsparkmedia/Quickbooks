// async function createVendor(options) {
//     if (!options) {
//         throw new Error('createVendor options not provided.')
//     }

//     try {
//         const response = await this.makeRequest({
//             url: `${this.BASE_URL_WEB}/v3/company/${this.realm_id}/vendor?minorversion=57`,
//             method: 'POST',
//             data: {
//                 DisplayName: options.displayName,
//                 FamilyName: options.familyName,
//                 GivenName: options.givenName,
//                 Vendor1099: true,
//                 PrimaryEmailAddr: {
//                     Address: options.email
//                 }
//             }
//         })

//         return response.Vendor
//     } catch(e) {
//         const errorsArray = e.Fault.Error
//         const errors = errorsArray.map(error => error.Message).join(' ')
//         throw new Error(errors)
//     }
// }

async function createVendor(options) {
    return new Promise((resolve, reject) => {
        if (!options) {
           reject('createVendor options not provided.')
        }

        try {
            const response = await this.makeRequest({
                url: `${this.BASE_URL_WEB}/v3/company/${this.realm_id}/vendor?minorversion=57`,
                method: 'POST',
                data: {
                    DisplayName: options.displayName,
                    FamilyName: options.familyName,
                    GivenName: options.givenName,
                    Vendor1099: true,
                    PrimaryEmailAddr: {
                        Address: options.email
                    }
                }
            })
    
            resolve(esponse.Vendor)
        } catch(e) {
            const errorsArray = e.Fault.Error
            const errors = errorsArray.map(error => error.Message).join(' ')
            reject(errors)
        }
    })
}

module.exports = createVendor