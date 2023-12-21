const { User, Profile, Room, Status, Transaction } = require("../models");
const { Op } = require("sequelize");
const user = require("../models/user");
const admin = require("../routers/admin");
const bcryptjs = require("bcryptjs");
const Helper = require("../helpers/helper");
const nodemailer = require('nodemailer');

class Controller {
 static async maintenance(req, res) {
    try {
      res.render("./index/maintenance");
    } catch (error) {
      res.send(error.message);
    }
 }

 static async home(req, res) {
    try {
      let result = await Room.findAll()
      res.render('landingPage', {result})
    } catch (error) {
      res.send(error.message);
    }
 }

 static async register(req, res) {
    try {
      let errors = Helper.getErrors(req.query)
      res.render("registForm", {errors});
    } catch (error) {
      res.send(error.message);
    }
 }

 static async registerPost(req, res) {
    try {
      let { email, password, role } = req.body;

      let user = await User.create({
        email,
        password,
        role
      });

      await Profile.create({
        name: req.body.name,
        age: req.body.age,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        UserId: user.id,
      });

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: "maulana27fandi@gmail.com",
          pass: "osjk ngak kkep ikfl"
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      let peran = ''
      if(role==='1'){
        peran+='Admin'
      } else{
        peran+='User'
      }

      await transporter.sendMail({
        from: '"Selamat bergabung!!" <maulana27fandi@gmail.com>',
        to: `${email}`,
        subject: 'Message from Transylvania Hotel',
        text: `Terima kasih ${name} dari ${address} sudah bergabung menjadi ${peran} jadi keluarga besar Transylvania Hotel!`,
      });

      console.log('Email sent successfully');

      res.redirect("/login");
    } catch (error) {
      Helper.setErrors(res, error, "/register");
    }
 }

 static async logout(req, res) {
    try {
      req.session.destroy(function (err) {});
      res.redirect("/");
    } catch (error) {
      Helper.setErrors(res, error, "/login");
    }
 }
}

module.exports = Controller;