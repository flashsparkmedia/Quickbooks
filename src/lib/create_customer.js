function createCustomer(user) {
    return new Promise(async (resolve, reject) => {
        if (!user) {
            reject('createCustomer user not provided.')
        }

        try {
            const response = await this.makeRequest({
                url: `${this.BASE_URL_WEB}/v3/company/${this.realm_id}/customer?minorversion=57`,
                method: 'POST',
                data: {
                    DisplayName: user.displayName,
                    FamilyName: user.familyName,
                    GivenName: user.givenName,
                    PrimaryEmailAddr: {
                        Address: user.email
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