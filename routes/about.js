var express = require('express');
var router = express.Router();
const axios = require('axios');
const moment = require('moment');

/* GET home page. */
router.get('/', async function(req, res, next) {

   await Promise.all([
       axios.get(`/about/general`),
       axios.get(`/about/owner`),
       axios.get(`/about/awards`),
       axios.get(`/slider/all`),
       axios.get('/options/get')

   ]).then(resp => {
       const {title, description, contactEmail, workTogetherEmail,phoneNumber,faxNumber,established,principal,locationLink,address,companyName} = resp[0].data.result;
       const ownerName = resp[1].data.result.name;
       const ownerDescription = resp[1].data.result.description;
       const awards = resp[2].data.result;
       const awardsList = awards.map(x => {
           x.dateText = moment(x.dateText).format('YYYY')
           return x
       });
       const sliders = resp[3].data.result;
       const logo = resp[4].data.result.logo;
       const webSiteTitle = resp[4].data.result.title
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
           logo
       }
       res.render('about', responseData);
    }).catch(err => {
        res.render('error',{message: err.message})
    })
});

module.exports = router;