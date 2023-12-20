const { User, Profile, Room, Status, Transaction } = require("../models");
const { Op } = require("sequelize");
const user = require("../models/user");
const admin = require("../routers/admin");
const bcryptjs = require("bcryptjs");
const rupiah = require("../helpers/helper");

class Controller{
    
    static async register(req, res) {
        // add user
        try {
          res.render("registForm");
        } catch (error) {
          console.log(error);
          res.send(error);
        }
      }
    
      static async registerPost(req, res) {
        // post add
        try {
          let user = await User.create({
            username: req.body.username,
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
          res.redirect("/login");
        } catch (error) {
          console.log(error);
          res.send(error);
        }
      }
}

module.exports = Controller