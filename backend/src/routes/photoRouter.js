const router = require('express').Router()
const wrap = require('express-async-wrap')
const flickrAPI = require('../api/flickrAPI')
const { getPhotosMeta, getPhotos } = require('../services/photoService')
const { ValidationError } = require('../errors')

router.get('/:method', wrap(async function (req, res) {
    const method = flickrAPI.METHODS[req.params.method]

    console.log(method)
    if (!method) {
        throw new ValidationError('NotSupportedFlickrMethod')
    }

    const page = req.query.page || 0
    const size = req.query.size || 100
    const filter = req.query.filter || ''

    const photosMeta = await getPhotosMeta({ method, page, size, filter })

    if (photosMeta.code === 100) {
        throw new Error('InvalidFlickrApiKey')
    }
    
    const photos = await getPhotos(photosMeta)

    res.json(photos)
}))

module.exports = router
