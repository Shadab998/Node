const path = require('path');

const express = require('express');

const donateController = require('../controllers/donate');

const router = express.Router();

router.get('/add-charity', donateController.getAddCharity);

router.get('/charity', donateController.getIndex);

router.post('/charity', donateController.getIndex);

router.get('/charity-login', donateController.charityLogin);

router.get('/adminlogin', donateController.adminlogin)

router.get('/', donateController.getLoginPage);

router.get('/logout', donateController.logOutUser);

router.post('/post-add-charity', donateController.postAddCharity);

router.post('/donate', donateController.postAddDonation);

router.post('/adminlogin', donateController.adminlogin);

router.post('/charity-login', donateController.charityLogin);

router.post('/send-money', donateController.sendMoney);

router.get('/send-money', donateController.sendMoney);

router.get('/post-send-money', donateController.postSendMoney);

router.post('/post-send-money', donateController.postSendMoney);

router.post('/track-money', donateController.trackMoney);

router.get('/track-money', donateController.trackMoney);



module.exports = router;
