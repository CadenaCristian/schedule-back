const express = require('express');
const mongoose = require('mongoose');
const Users = require('../../models/users/users');
const HttpResponse = require('../../models/enums/enums');
const router = express.Router();
const nodemailer = require('nodemailer');
const res = require('express/lib/response');
const { json } = require('express/lib/response');

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'cristilopezca@gmail.com',
        pass: 'zghztmpackzmnjbk'
    }
});

const sendEmail = (code, email) => {
    var mailOptions = {
        from: 'cristilopezca@gmail.com',
        to: `${email}`,
        subject: 'Codigo de inicio de sesión',
        text: `Con el siguiente codigo podra iniciar sesión: ${code}`
    };
    console.log(`${code}  ${email}`);
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(200).jsonp(req.body);
        }
    });
};

const randomCode = () => { return Math.round(Math.random() * 999999); }
const valUser = (email) => { return Users.findOne({ email: email }) }

router.post('/register', async (req, res) => {
    const { userName, email } = req.body;
    const exist = await valUser(email);
    if (exist == null) {
        const code = randomCode();
        const user = new Users({ userName, email, code });
        await user.save();
        sendEmail(code, email);
        res.status(200).json({ code: HttpResponse.HttpCode.CREATED, message: HttpResponse.HttpMessage.CREATED })
    } else {
        res.status(200).json({ code: HttpResponse.HttpCode.DUPLICATED, message: HttpResponse.HttpMessage.DUPLICATED })
    }
})

router.post('/getCode', async (req, res) => {
    console.log("REQ: ", req.body);
    res.json({ email: req.body, message: "Exito" })
    // console.log("entre a getCode");
    // const exist = valUser(req.body.email);
    // if (exist == null) {
    //     res.status(200).json({ code: HttpResponse.HttpCode.USER_NOT_FOUND, message: HttpResponse.HttpMessage.USER_NOT_FOUND })
    // } else {
    //     code = randomCode()
    //     await sendEmail(code, req.body.email);
    //     res.status(200).json({ code: HttpResponse.HttpCode.SUCCESS, message: HttpResponse.HttpMessage.EMAIL_WAS_SENDED })
    // }

})

router.post('/login', async (req, res) => {
    const { email, code } = req.body;
    const exist = await Users.findOne({ email: email, code: code });
    console.log("exist: ", exist);
    if (exist !== null) {
        res.status(200).json({ code: HttpResponse.HttpCode.SUCCESS, message: "Bienvenido!" })
    } else {
        res.status(200).json({ code: HttpResponse.HttpCode.UNAUTHORIZED, message: HttpResponse.HttpMessage.UNAUTHORIZED })
    }
})

module.exports = router;