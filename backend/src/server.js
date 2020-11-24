require('dotenv').config()
const logger = require('./logger')
const app = require('./app')
const { port } = require('../config')

app.listen(port, () => logger.log({ level: 'info', message: `App is listening on port ${port}` }))
