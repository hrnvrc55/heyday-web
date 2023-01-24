var express = require('express');
const axios = require("axios");
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {

    await Promise.all([
    axios.get(`/slider/all`,{headers:{"Accept-Language": req.cookies.lng ? req.cookies.lng : "" }}),
    axios.get(`/about/general`,{headers:{"Accept-Language": req.cookies.lng ? req.cookies.lng : "" }}),
    axios.get('/options/get'),
    axios.get('/options/website-statics',{headers:{"Accept-Language": req.cookies.lng ? req.cookies.lng : "" }}),
    axios.get('/meta-options/get')
]).then(resp => {
    const {logo, title, loadingText} = resp[2].data.result;
    const metaDescription = resp[4].data.result ? resp[4].data.result.mainMetaDescription : ''
    const pinterestCode = resp[4].data.result ? resp[4].data.result.pinterestCode : ''
    res.render('index', {lng: req.cookies.lng,metaDescription, pinterestCode, sliders: resp[0].data.result, general: resp[1].data.result, logo, title,loadingText, staticList: resp[3].data });
})
});

module.exports = router;
