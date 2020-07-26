const express = require('express')
const expressApp = express()

expressApp.use(express.static('./public'))
expressApp.listen(8081, 'test.localhost.com', () => {
    console.log('express third party server started on 8081')
})
