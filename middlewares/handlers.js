function invalidRouteHandler(req, res, next) {
    res.status(404).json({
        status: 'failed',
        message: '無此路由'
    });
}

function serverErrorHandler(err, req, res, next) {
    res.status(500).json({
        status: 'error',
        message: err.message
    });
}

module.exports = {invalidRouteHandler, serverErrorHandler};
