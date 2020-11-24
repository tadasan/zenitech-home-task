const flickrAPI = require('../api/flickrAPI')
const { imgPreviewBaseUrl } = require('../../config').flickr

async function getPhotosMeta({ method, page, size, filter}) {
    if (method === flickrAPI.METHODS.recent) {
        return await flickrAPI.getRecentPhotos({ page, size })
    } else if (method === flickrAPI.METHODS.search) {
        return await flickrAPI.getSearchPhotos({ page, size, filter })
    }
}

const getFlickrImgPreviewLink = ({ serverId, photoId, secret }) => {
    return `${imgPreviewBaseUrl}/${serverId}/${photoId}_${secret}_q.jpg`
}

async function getPhotos(photosMeta) {
    if (photosMeta.stat === 'ok') {
        return photosMeta.photos && photosMeta.photos.photo.map(p => {
            return {
                photoUrl: getFlickrImgPreviewLink({
                    serverId: p.server,
                    photoId: p.id,
                    secret: p.secret
                }),
                title: p.title,
                id: `${p.id}-${p.server}`,
            }
        })
    } else {
        return []
    }
}


module.exports = {
    getPhotosMeta,
    getPhotos,
}