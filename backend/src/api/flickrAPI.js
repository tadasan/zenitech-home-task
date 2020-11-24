const request = require('request-promise')

const { apiHost, apiKey  } = require('../../config').flickr
const { buildQuery } = require('../util')

const flickrAPI = {}

flickrAPI.METHODS = {
    recent: 'flickr.photos.getRecent',
    search: 'flickr.photos.search',
}

flickrAPI.getRecentPhotos = async function ({ page = 0, size = 100 }) {

    const url = `${apiHost}/services/rest/?${buildQuery({ 
        method: this.METHODS.recent,
        page,
        per_page: size,
        api_key: apiKey,
        format: 'json',
        nojsoncallback: 1,
    })}`

    const requestOptions = {
        url,
        method: 'GET',
        json: true,
    }

    return request(requestOptions)
}

flickrAPI.getSearchPhotos = async function ({ page = 0, size = 100, filter = '' }) {

    const url = `${apiHost}/services/rest/?${buildQuery({ 
        method: this.METHODS.search,
        page,
        text: filter,
        per_page: size,
        api_key: apiKey,
        format: 'json',
        nojsoncallback: 1,
    })}`

    const requestOptions = {
        url,
        method: 'GET',
        json: true,
    }

    return request(requestOptions)
}

module.exports = flickrAPI