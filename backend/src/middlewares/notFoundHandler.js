function notFoundHandler(req, res, next) {
    res.status(404).send({ error: 'Not Found' })
}

module.exports = notFoundHandler
