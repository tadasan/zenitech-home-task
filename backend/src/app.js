const express = require('express')
const api = require('./routes')
const app = express()
const cors = require('cors')
const { siteUrl } = require('../config')

app.use(cors({ credentials: true, origin: siteUrl }))
app.use(express.json({}))
app.use('/api', api)

module.exports = app
