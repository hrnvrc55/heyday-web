var express = require('express');
var router = express.Router();
const axios = require('axios');
const moment = require('moment');

/* GET home page. */
router.get('/', async function(req, res, next) {

   await Promise.all([
       axios.get(`/about/general`,{headers:{"Accept-Language": req.cookies.lng ? req.cookies.lng : "" }}),
       axios.get(`/about/owner`,{headers:{"Accept-Language": req.cookies.lng ? req.cookies.lng : "" }}),
       axios.get(`/about/awards`),
       axios.get(`/slider/all`,{headers:{"Accept-Language": req.cookies.lng ? req.cookies.lng : "" }}),
       axios.get('/options/get'),
       axios.get('/options/website-statics',{headers:{"Accept-Language": req.cookies.lng ? req.cookies.lng : "" }}),
       axios.get('/meta-options/get')

   ]).then(resp => {
       const {title,instagram,facebook,linkedin, description, contactEmail, workTogetherEmail,phoneNumber,faxNumber,established,principal,locationLink,address,companyName} = resp[0].data.result;
       const ownerName = resp[1].data.result.name;
       const ownerDescription = resp[1].data.result.description;
       const awards = resp[2].data.result;
       const awardsList = awards.map(x => {
           x.dateText = moment(x.dateText).format('YYYY')
           return x
       });
       const sliders = resp[3].data.result;
       const logo = resp[4].data.result.logo;
       const webSiteTitle = resp[4].data.result.title;
       const staticList = resp[5].data;
       const metaDescription = resp[6].data.result ? resp[6].data.result.aboutMetaDescription : ''
       const pinterestCode = resp[6].data.result ? resp[6].data.result.pinterestCode : ''

       const responseData = {
           title,
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
           ownerName,
           ownerDescription,
           awardsList,
           sliders,
           webSiteTitle,
           logo,
           staticList,
           metaDescription,
           instagram,
           linkedin,
           facebook,
           pinterestCode
       }
       res.render('about', responseData);
    }).catch(err => {
        res.render('error',{message: err.message})
    })
});

module.exports = router;