const axios = require('axios')
const path = require('path');

const lib = path.join(path.dirname(require.resolve('axios')),'lib/adapters/http');
const http = require(lib);

async function getAccessToken() {
    const data = `${this.client_id}:${this.client_secret}`
    const buff = Buffer.from(data, "utf-8")
    const base64data = buff.toString('base64')

    const params = new URLSearchParams()
    params.append('grant_type', 'refresh_token')
    params.append('refresh_token', this.refresh_token)

    const config = {
        adapter: http,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': `Basic ${base64data}`
        }
    }
    
    try {
        const response = await axios.post(this.OAUTH_API_URL, params, config)
        return response.data.access_token
    } catch(e) {
        console.log(e.response.data)
        throw new Error(`Error generating new access token: ${e.response.data.error}`)
    }
}

module.exports = getAccessToken