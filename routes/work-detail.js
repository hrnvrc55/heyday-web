var express = require('express');
const axios = require("axios");
const moment = require("moment");
var router = express.Router();
/* GET home page. */
router.get('/:slug', async function(req, res, next) {
    await Promise.all([
        axios.get(`/about/general`,{headers:{"Accept-Language": req.cookies.lng ? req.cookies.lng : "" }}),
        //axios.get(`/about/owner`),
        //axios.get(`/about/awards`),
        axios.get(`/slider/all`,{headers:{"Accept-Language": req.cookies.lng ? req.cookies.lng : "" }}),
        axios.get('/options/get'),
        axios.get(`/work/get-with-slug?slug=${req.params.slug}`,{headers:{"Accept-Language": req.cookies.lng ? req.cookies.lng : "" }}),
        axios.get('/options/website-statics',{headers:{"Accept-Language": req.cookies.lng ? req.cookies.lng : "" }}),
        axios.get(`/work/all`,{headers:{"Accept-Language": req.cookies.lng ? req.cookies.lng : "" }})
    ]).then(resp => {
        const {description, contactEmail, instagram, facebook, linkedin, workTogetherEmail,phoneNumber,faxNumber,established,principal,locationLink,address,companyName} = resp[0].data.result;
        //const ownerName = resp[1].data.result.name;
        //const ownerDescription = resp[1].data.result.description;
        //const awards = resp[2].data.result;
        //const awardsList = awards.map(x => {
        //    x.dateText = moment(x.dateText).format('YYYY')
        //    return x
        //});
        const sliders = resp[1].data.result;
        const logo = resp[2].data.result.logo;
        const loadingText  = resp[2].data.result.logoText;
        const webSiteTitle = resp[2].data.result.title
        const detail = resp[3].data.result;
        const staticList = resp[4].data;
        const works = resp[5].data.result;
        const url = req.originalUrl;
        var index = works.findIndex(obj => obj.slug==detail.slug);
        var thisPage = (works[index]);
        var nextPage = (works[index+1] ? works[index+1] : works[0] );
        const responseData = {
            description,
            contactEmail,
            workTogetherEmail,
            phoneNumber,
            faxNumber,
            established,
            principal,
            locationLink,
            address,
            companyName,
            //ownerName,
            //ownerDescription,
            //awardsList,
            sliders,
            webSiteTitle,
            logo,
            detail,
            staticList,
            instagram,
            facebook,
            linkedin,
            works,
            url,
            nextPage,
            thisPage,
            loadingText 
        }


        res.render('work-detail', responseData);

    }).catch(err => {
        res.render('error',{message: err.message})
    })

});

module.exports = router;