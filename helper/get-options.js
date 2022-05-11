const axios = require('axios')

async function getOptions(){
    await axios.get('/options/get').then(resp => {
        return resp.data.result
    })
}

module.exports = {
    getOptions
}