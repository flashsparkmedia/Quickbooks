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
            console.log(response)
            resolve()
        } catch (e) {
            if (e.response && e.response.data)
                reject(e.response.data)
            else reject(e)
        }
    })
}

module.exports = make_request