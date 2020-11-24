class ValidationError extends Error {
	constructor(data) {
		super()
		this.data = data
		this.message = 'ValidationError'
	}
}

module.exports = { ValidationError }
