var express = require('express');
const axios = require("axios");
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
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

    await Promise.all([
    axios.get(`/slider/all`),
    axios.get(`/about/general`),
    axios.get('/options/get'),
    axios.get('/options/website-statics',{headers:{"Accept-Language": req.cookies.lng ? req.cookies.lng : "" }})
]).then(resp => {
    const {logo, title} = resp[2].data.result;
    res.render('index', { sliders: resp[0].data.result, general: resp[1].data.result, logo, title, staticList: resp[3].data });
})
});

module.exports = router;
