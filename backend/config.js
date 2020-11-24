module.exports = {
    port: process.env.PORT || 4000,
    siteUrl: process.env.siteUrl || 'http://localhost:8080',
    flickr: {
        apiKey: process.env.FLICKR_API_KEY || '',
        apiHost: 'https://www.flickr.com',
        imgPreviewBaseUrl: 'https://live.staticflickr.com',
    }
}
