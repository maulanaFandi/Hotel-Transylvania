const { User, Profile, Room, Status, Transaction } = require("../models");
const { Op } = require("sequelize");
const user = require("../models/user");
const admin = require("../routers/admin");
const bcryptjs = require("bcryptjs");
const Helper = require("../helpers/helper");

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
        // add user
        try {
          let { errors } = req.query;
          if (!errors) {
            errors = [];
          } else {
            errors = errors.split(",");
          }
          
              res.render("registForm", {errors});
        } catch (error) {
          res.send(error);
        }
      }
    
      static async registerPost(req, res) {
        // post add
        try {

          // let { email, password, role } = req.body;

          // let users = await User.findOne({
          //   where: {
          //     email: email,
          //   },
          // });

      // if (users) {
      //   throw { name: "validation", errors: ["Email Already Registered"] };
      // }

          let user = await User.create({
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
          });
    
          await Profile.create({
            name: req.body.name,
            age: req.body.age,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            UserProfileId: user.dataValues.id,
          });

        //   const transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //       // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        //       user: "maulana27fandi@gmail.com",
        //       pass: "osjk ngak kkep ikfl"
        //     },
        //   });
    
        // // send mail with defined transport object
        // await transporter.sendMail({
        //   from: '"Foo Foo 👻" <maulana27fandi@gmail.com>', // sender address
        //   to: "muhammadsubhantarmedi@gmail.com", // list of receivers
        //   subject: "Hello ✔", // Subject line
        //   text: "Hello world?", // plain text body
        // })

      res.redirect("/login");
    } catch (error) {
      if (error?.name === "SequelizeValidationError") {
        error = error.errors.map((item) => {
          return item.message;
        });
        res.redirect(`/register?errors=${error}`);
      } else {
        res.send(error);
      }
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
