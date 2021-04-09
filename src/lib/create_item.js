
async function createItem(options) {
    try {
        const response = await this.makeRequest({
            url: `${this.BASE_URL_WEB}/v3/company/${this.realm_id}/item?minorversion=57`,
            method: 'POST',
            data: options
        })
        return response.Item
    } catch(e) {
        const errorsArray = e.Fault.Error
        const errors = errorsArray.map(error => error.Message).join(' ')
        throw new Error(errors)
    }
}

module.exports = createItem