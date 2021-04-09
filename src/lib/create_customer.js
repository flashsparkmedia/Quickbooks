async function createCustomer(options) {
    if (!options) {
        throw new Error('createCustomer options not provided.')
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
        return response.Customer
    } catch(e) {
        const errorsArray = e.Fault.Error
        const errors = errorsArray.map(error => error.Message).join(' ')
        throw new Error(errors)
    }
}

module.exports = createCustomer