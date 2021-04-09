const axios = require('axios')
const path = require('path');

const lib = path.join(path.dirname(require.resolve('axios')),'lib/adapters/http');
const http = require(lib);

async function make_request(request) {
    return new Promise(async (resolve, reject) => {

        request.adapter = http

        request.headers = {
            'Content-Type' : 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + await this.getAccessToken(),
            ...request.headers,
        }
        
        try {
            const response = await axios(request)
            resolve(response.data)
        } catch (e) {
            reject(e.response.data)
        }
    })
}

module.exports = make_request