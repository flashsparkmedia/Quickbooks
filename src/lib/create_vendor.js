function createVendor(options) {
    return new Promise(async (resolve, reject) => {
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
    
            resolve(response.Vendor)
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

module.exports = createVendor