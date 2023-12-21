const { User, Profile, Room, Status, Transaction } = require("../models");
const { Op } = require("sequelize");
const user = require("../models/user");
const admin = require("../routers/admin");
const bcryptjs = require("bcryptjs");
const Helper = require("../helpers/helper");

class Controller{

  static async maintenance(req, res) {
    try {
      res.render("./index/maintenance");
    } catch (error) {
      res.send(error.message);
    }
  }

  static async home(req, res){
    try {
      let result = await Room.findAll()
      res.render('landingPage', {result})
    } catch (error) {
      res.send(error.message)
    }
  }
    
    static async register(req, res) {
        // add user
        try {
        let errors = Helper.getErrors(req.query);
          res.render("registForm", {errors});
        } catch (error) {
          res.send(error);
        }
      }
    
      static async registerPost(req, res) {
        // post add
        try {

          let { email, password, role } = req.body;
          console.log(req.body);
          // let users = await User.findOne({
          //   where: {
          //     email: email,
          //   },
          // });

          let users = await User.findOne();
          console.log(users);
          // if (users) {
          //   throw { name: "validation", errors: ["Email Already Registered"] };
          // }

          let user = await User.create({
            email,
            password,
            role
          });

          console.log(user);
    
          await Profile.create({
            name: req.body.name,
            age: req.body.age,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            UserId: user.id,
          });

          // const transporter = nodemailer.createTransport({
          //   service: 'gmail',
          //   auth: {
          //     // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          //     user: "maulana27fandi@gmail.com",
          //     pass: "osjk ngak kkep ikfl"
          //   },
          // });
    
        // send mail with defined transport object
        // await transporter.sendMail({
        //   from: '"Foo Foo 👻" <maulana27fandi@gmail.com>', // sender address
        //   to: "muhammadsubhantarmedi@gmail.com", // list of receivers
        //   subject: "Hello ✔", // Subject line
        //   text: "Hello world?", // plain text body
        // })

          res.redirect("/login");
        } catch (error) {
          console.log(error);
          res.send(error);
        }
      }
}

module.exports = Controller