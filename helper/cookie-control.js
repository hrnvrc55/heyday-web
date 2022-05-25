
module.exports = async(req, res, next) => {
    if(req.query.lng){
        var cookie = req.cookies.lng;
        if (cookie === undefined) {
            // no: set a new cookie
            res.cookie('lng',req.query.lng, { maxAge: 900000, httpOnly: true });
            console.log(req.query.lng, 'cookie created successfully');
        } else {
            // yes, cookie was already present
            if(cookie !== req.query.lng){
                res.cookie('lng',req.query.lng, { maxAge: 900000, httpOnly: true });
            }
            console.log(req.query.lng, 'cookie created successfully');
            console.log('cookie exists', cookie);
        }
    }
    next()
}