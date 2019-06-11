const express = require('express')
const _ = require('lodash')
var nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const router = express.Router()


const handlebarOptions = {
    viewEngine: {
        extName: '.hbs',
        partialsDir: './src/views/',
        layoutsDir: './src//views/',
        defaultLayout: 'voucher.hbs',
    },
    viewPath: './src//views/',
    extName: '.hbs',
};

var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "tp.sitiosvip",
        pass: "PaSSword123"
    }
});

smtpTransport.use('compile', hbs(handlebarOptions));

router.get('/:email', async (req, res) => {


    var mailOptions = {
        to: req.params.email,
        subject: "DESCUENTO SITIO VIP",
        text: "",
        template: "voucher"
    }
    
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            
            res.json(false);
        } else {
            
            res.json(true);
        }
    });

})

module.exports = router
