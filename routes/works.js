var express = require('express');
const axios = require("axios");
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
    await Promise.all([
        axios.get(`/work/get-works-with-images`),
        axios.get(`/slider/all`),
        axios.get(`/about/general`),
        axios.get('/options/get'),
        axios.get('/options/website-statics',{headers:{"Accept-Language": req.cookies.lng ? req.cookies.lng : "" }})

    ]).then(resp => {
        const {title, logo} = resp[3].data.result;
        res.render('works', { works: resp[0].data.result, sliders: resp[1].data.result, general: resp[2].data.result, logo, title, staticList: resp[4].data });
    })
});

module.exports = router;