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
      console.log(req.session.role);
      let result = await Room.findAll()
      res.render('landingPage', { result })
    } catch (error) {
      res.send(error.message)
    }
  }

  static async register(req, res) {
    // add user
    try {
      let errors = Helper.getErrors(req.query);
      res.render("registForm", { errors });
    } catch (error) {
      res.send(error);
    }
  }

  static async registerPost(req, res) {
    // post add
    try {

      let { email, password, name, address, role } = req.body;
      console.log(req.body);
      // let users = await User.findOne({
      //   where: {
      //     email: email,
      //   },
      // });

      let users = await User.findOne();
      console.log(req.body);
      // if (users) {
      //   throw { name: "validation", errors: ["Email Already Registered"] };
      // }

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

      async function sendEmail() {
        try {
          await transporter.sendMail({
            from: '"Selamat bergabung!!" <maulana27fandi@gmail.com>',
            // to: 'curvy_emo41@yahoo.com',
            to: `${email}`,
            subject: 'Message from Transylvania Hotel',
            text: `Terima kasih ${name} dari ${address} sudah bergabung menjadi ${peran} jadi keluarga besar Transylvania Hotel!`,
          });
          console.log('Email sent successfully');
        } catch (error) {
          console.error('Error sending email:', error);
        }
      }
sendEmail();

      res.redirect("/login");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}

module.exports = Controller