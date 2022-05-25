var express = require('express');
const axios = require("axios");
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {

    await Promise.all([
    axios.get(`/slider/all`,{headers:{"Accept-Language": req.cookies.lng ? req.cookies.lng : "" }}),
    axios.get(`/about/general`,{headers:{"Accept-Language": req.cookies.lng ? req.cookies.lng : "" }}),
    axios.get('/options/get'),
    axios.get('/options/website-statics',{headers:{"Accept-Language": req.cookies.lng ? req.cookies.lng : "" }})
]).then(resp => {
    const {logo, title} = resp[2].data.result;
    res.render('index', { sliders: resp[0].data.result, general: resp[1].data.result, logo, title, staticList: resp[3].data });
})
});

module.exports = router;
