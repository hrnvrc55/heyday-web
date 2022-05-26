var express = require('express');
const axios = require("axios");
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
    await Promise.all([
        axios.get(`/work/get-works-with-images`,{headers:{"Accept-Language": req.cookies.lng ? req.cookies.lng : "" }}),
        axios.get(`/slider/all`,{headers:{"Accept-Language": req.cookies.lng ? req.cookies.lng : "" }}),
        axios.get(`/about/general`,{headers:{"Accept-Language": req.cookies.lng ? req.cookies.lng : "" }}),
        axios.get('/options/get'),
        axios.get('/options/website-statics',{headers:{"Accept-Language": req.cookies.lng ? req.cookies.lng : "" }}),
        axios.get('/meta-options/get')

    ]).then(resp => {
        const {title, logo} = resp[3].data.result;
        const metaDescription = resp[5].data.result ? resp[5].data.result.worksMetaDescription : ''

        res.render('works', {metaDescription, works: resp[0].data.result, sliders: resp[1].data.result, general: resp[2].data.result, logo, title, staticList: resp[4].data });
    })
});

module.exports = router;