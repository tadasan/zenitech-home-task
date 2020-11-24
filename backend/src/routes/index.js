const router = require('express').Router()
const photos = require('./photoRouter')
const logger = require('../logger')

router.use('/health', function (req, res) {
	res.sendStatus(204)
})

router.use('/photos', photos)

router.use(function (err, req, res, next) {
	if (err.message === 'ValidationError') {
		logger.warn(err.message, { error: err.data, status: 400 })
		return res.status(400).json({
			message: 'ValidationError',
			data: err.data,
		})
	}

	logger.error(err.message, { error: err, status: 500 })
	res.sendStatus(500)
})


module.exports = router
